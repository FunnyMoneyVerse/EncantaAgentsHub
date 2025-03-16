from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, BackgroundTasks
from typing import List, Optional, Dict, Any
from uuid import UUID, uuid4
from app.api.models.common import StandardResponse
from app.utils.supabase_client import supabase, check_user_workspace_access
from app.utils.storage import get_storage_path, generate_unique_filename, validate_file_type, validate_file_size
from app.api.deps import get_current_user_id
import json

router = APIRouter()

# Define allowed file types and size limits
ALLOWED_FILE_TYPES = [
    "application/pdf", 
    "application/msword", 
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain", 
    "text/csv", 
    "text/markdown"
]
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

@router.get("/workspace/{workspace_id}", response_model=List[Dict[str, Any]])
async def get_knowledge_files(
    workspace_id: UUID,
    current_user_id: str = Depends(get_current_user_id),
):
    """Get all knowledge files for a workspace"""
    # Check if user has access to this workspace
    has_access = await check_user_workspace_access(current_user_id, workspace_id)
    if not has_access:
        raise HTTPException(status_code=403, detail="You don't have access to this workspace")

    # Get knowledge files
    response = supabase.table("knowledge_files").select("*").eq("workspace_id", str(workspace_id)).execute()

    return response.data

@router.post("/upload", response_model=Dict[str, Any])
async def upload_knowledge_file(
    workspace_id: str = Form(...),
    name: str = Form(...),
    description: Optional[str] = Form(None),
    file: UploadFile = File(...),
    current_user_id: str = Depends(get_current_user_id),
    background_tasks: BackgroundTasks = None,
):
    """Upload a new knowledge file"""
    # Check if user has access to this workspace
    has_access = await check_user_workspace_access(
        current_user_id,
        workspace_id,
        required_roles=["admin", "content_manager", "knowledge_manager"]
    )

    if not has_access:
        raise HTTPException(
            status_code=403,
            detail="You don't have permission to upload knowledge files to this workspace"
        )

    # Validate file type
    if not validate_file_type(file.content_type, ALLOWED_FILE_TYPES):
        raise HTTPException(
            status_code=400,
            detail=f"File type not allowed. Allowed types: {', '.join(ALLOWED_FILE_TYPES)}"
        )

    # Read file content to validate size
    file_content = await file.read()
    await file.seek(0)  # Reset file position after reading

    # Validate file size
    if not validate_file_size(len(file_content), MAX_FILE_SIZE):
        raise HTTPException(
            status_code=400,
            detail=f"File size exceeds the limit of {MAX_FILE_SIZE / (1024 * 1024)}MB"
        )

    # Generate unique filename
    file_id = str(uuid4())
    original_filename = file.filename
    file_extension = original_filename.split(".")[-1] if "." in original_filename else ""
    unique_filename = f"{file_id}.{file_extension}"

    # Get storage path
    storage_path = get_storage_path("KNOWLEDGE_FILES", current_user_id, unique_filename)

    # Upload file to storage
    try:
        # Upload to Supabase Storage
        supabase.storage.from_("knowledge-files").upload(
            f"{current_user_id}/{unique_filename}",
            file_content,
            {"content-type": file.content_type}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to upload file: {str(e)}")

    # Create knowledge file record
    knowledge_file = {
        "id": file_id,
        "workspace_id": workspace_id,
        "name": name,
        "description": description,
        "original_filename": original_filename,
        "storage_path": storage_path,
        "file_type": file.content_type,
        "file_size": len(file_content),
        "is_processed": False,
        "created_by": current_user_id
    }

    # Insert into database
    response = supabase.table("knowledge_files").insert(knowledge_file).execute()

    if not response.data or len(response.data) == 0:
        raise HTTPException(status_code=500, detail="Failed to create knowledge file record")

    # Schedule background processing if background_tasks is provided
    if background_tasks:
        background_tasks.add_task(process_knowledge_file, file_id, workspace_id)

    return response.data[0]

@router.delete("/{file_id}", response_model=StandardResponse)
async def delete_knowledge_file(
    file_id: UUID,
    current_user_id: str = Depends(get_current_user_id),
):
    """Delete a knowledge file"""
    # Get the file to check workspace access
    response = supabase.table("knowledge_files").select("*").eq("id", str(file_id)).single().execute()

    if not response.data:
        raise HTTPException(status_code=404, detail="Knowledge file not found")

    file_data = response.data
    workspace_id = file_data["workspace_id"]

    # Check if user has access to this workspace
    has_access = await check_user_workspace_access(
        current_user_id,
        workspace_id,
        required_roles=["admin", "content_manager", "knowledge_manager"]
    )

    if not has_access:
        raise HTTPException(
            status_code=403,
            detail="You don't have permission to delete knowledge files from this workspace"
        )

    # Delete from storage
    try:
        # Extract filename from storage path
        storage_path = file_data["storage_path"]
        path_parts = storage_path.split("/")
        bucket = path_parts[0]
        path = "/".join(path_parts[1:])

        # Delete from Supabase Storage
        supabase.storage.from_(bucket).remove([path])
    except Exception as e:
        # Continue even if storage deletion fails
        print(f"Warning: Failed to delete file from storage: {str(e)}")

    # Delete from database
    delete_response = supabase.table("knowledge_files").delete().eq("id", str(file_id)).execute()

    if not delete_response.data or len(delete_response.data) == 0:
        raise HTTPException(status_code=500, detail="Failed to delete knowledge file record")

    return {"success": True, "message": "Knowledge file deleted successfully"}

async def process_knowledge_file(file_id: str, workspace_id: str):
    """Background task to process a knowledge file for vector storage"""
    # This is a placeholder for the actual processing logic
    # In a real implementation, this would:
    # 1. Download the file from storage
    # 2. Extract text content
    # 3. Split into chunks
    # 4. Generate embeddings
    # 5. Store in vector database
    # 6. Update the knowledge_file record with processing status

    # For now, just update the is_processed flag
    try:
        supabase.table("knowledge_files").update({"is_processed": True}).eq("id", file_id).execute()
    except Exception as e:
        print(f"Error processing knowledge file {file_id}: {str(e)}")
        # Update with error status
        supabase.table("knowledge_files").update({
            "is_processed": False,
            "processing_error": str(e)
        }).eq("id", file_id).execute() 