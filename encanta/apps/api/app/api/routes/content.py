from fastapi import APIRouter, Depends, HTTPException, Header, Query, BackgroundTasks
from typing import List, Optional, Dict, Any
from uuid import UUID, uuid4
from app.api.models.content import ContentCreate, ContentUpdate, ContentResponse, ContentType, ContentStatus
from app.api.models.common import StandardResponse
from app.utils.supabase_client import supabase, check_user_workspace_access
from app.api.deps import get_current_user_id
from app.workflows.content_workflow import run_content_generation

router = APIRouter()

@router.get("/workspace/{workspace_id}", response_model=List[ContentResponse])
async def get_workspace_content(
    workspace_id: UUID,
    content_type: Optional[ContentType] = None,
    status: Optional[ContentStatus] = None,
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    current_user_id: str = Depends(get_current_user_id),
):
    """Get content for a specific workspace with optional filtering"""
    # Check if user has access to this workspace
    has_access = await check_user_workspace_access(current_user_id, workspace_id)
    if not has_access:
        raise HTTPException(status_code=403, detail="You don't have access to this workspace")

    # Build the query
    query = supabase.table("content").select("*").eq("workspace_id", str(workspace_id))

    # Apply filters if provided
    if content_type:
        query = query.eq("content_type", content_type)

    if status:
        query = query.eq("status", status)

    # Apply pagination
    query = query.order("created_at", desc=True).range(offset, offset + limit - 1)

    # Execute the query
    response = query.execute()

    return response.data

@router.post("/", response_model=ContentResponse)
async def create_content(
    content: ContentCreate,
    current_user_id: str = Depends(get_current_user_id),
):
    """Create new content"""
    # Check if user has access to this workspace
    has_access = await check_user_workspace_access(
        current_user_id,
        content.workspace_id,
        required_roles=["admin", "content_manager", "content_creator"]
    )

    if not has_access:
        raise HTTPException(
            status_code=403,
            detail="You don't have permission to create content in this workspace"
        )

    # Prepare the content data
    content_data = content.dict()
    content_data["created_by"] = current_user_id

    # Insert the content
    response = supabase.table("content").insert(content_data).execute()

    if not response.data or len(response.data) == 0:
        raise HTTPException(status_code=500, detail="Failed to create content")

    return response.data[0]

@router.post("/generate", response_model=Dict[str, Any])
async def generate_content(
    request: Dict[str, Any],
    background_tasks: BackgroundTasks,
    current_user_id: str = Depends(get_current_user_id),
):
    """Generate content using AI"""
    workspace_id = request.get("workspace_id")

    if not workspace_id:
        raise HTTPException(status_code=400, detail="workspace_id is required")

    # Check if user has access to this workspace
    has_access = await check_user_workspace_access(
        current_user_id,
        workspace_id,
        required_roles=["admin", "content_manager", "content_creator"]
    )

    if not has_access:
        raise HTTPException(
            status_code=403,
            detail="You don't have permission to generate content in this workspace"
        )

    # Create a task record
    task_id = str(uuid4())
    task = {
        "id": task_id,
        "workspace_id": workspace_id,
        "task_type": "content_generation",
        "status": "pending",
        "input": request,
        "created_by": current_user_id
    }

    # Insert task into database
    supabase.table("ai_tasks").insert(task).execute()

    # Run content generation in background
    background_tasks.add_task(process_content_generation, task_id, request, current_user_id)

    return {"task_id": task_id, "status": "pending"}

@router.get("/task/{task_id}", response_model=Dict[str, Any])
async def get_task_status(
    task_id: UUID,
    current_user_id: str = Depends(get_current_user_id),
):
    """Get the status of a content generation task"""
    # Get task from database
    response = supabase.table("ai_tasks").select("*").eq("id", str(task_id)).single().execute()

    if not response.data:
        raise HTTPException(status_code=404, detail="Task not found")

    task = response.data

    # Check if user has access to this task's workspace
    has_access = await check_user_workspace_access(current_user_id, task["workspace_id"])
    if not has_access:
        raise HTTPException(status_code=403, detail="You don't have access to this task")

    return task

async def process_content_generation(task_id: str, request: Dict[str, Any], user_id: str):
    """Background task to process content generation"""
    try:
        # Update task status to processing
        supabase.table("ai_tasks").update({"status": "processing"}).eq("id", task_id).execute()

        # Get brand profile for the workspace if it exists
        brand_response = supabase.table("brand_profiles").select("*").eq("workspace_id", request["workspace_id"]).execute()
        brand_profile = brand_response.data[0] if brand_response.data else None

        # Run content generation workflow
        result = await run_content_generation({
            "topic": request.get("topic"),
            "content_type": request.get("content_type"),
            "tone": request.get("tone"),
            "target_audience": request.get("target_audience"),
            "key_points": request.get("key_points"),
            "brand_profile": brand_profile,
            "workspace_id": request.get("workspace_id")
        })

        if result["success"]:
            # Update task with success result
            supabase.table("ai_tasks").update({
                "status": "completed",
                "output": {
                    "content": result["content"],
                    "ideas": result.get("ideas"),
                    "research": result.get("research")
                }
            }).eq("id", task_id).execute()

            # Create content entry if requested
            if request.get("auto_save", False):
                content = {
                    "workspace_id": request["workspace_id"],
                    "title": request.get("title", "Generated Content"),
                    "content_type": request.get("content_type"),
                    "content": {
                        "text": result["content"],
                        "ideas": result.get("ideas"),
                        "research": result.get("research"),
                        "metadata": {
                            "topic": request.get("topic"),
                            "target_audience": request.get("target_audience"),
                            "tone": request.get("tone"),
                            "key_points": request.get("key_points")
                        }
                    },
                    "status": "draft",
                    "created_by": user_id
                }

                supabase.table("content").insert(content).execute()
        else:
            # Update task with error
            supabase.table("ai_tasks").update({
                "status": "failed",
                "error": result["error"]
            }).eq("id", task_id).execute()

    except Exception as e:
        # Update task with error
        supabase.table("ai_tasks").update({
            "status": "failed",
            "error": str(e)
        }).eq("id", task_id).execute() 