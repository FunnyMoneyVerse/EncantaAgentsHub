from fastapi import APIRouter, Depends, HTTPException, Header, Query
from typing import List, Optional
from uuid import UUID
from app.api.models.workspace import WorkspaceCreate, WorkspaceUpdate, WorkspaceResponse
from app.api.models.common import StandardResponse
from app.utils.supabase_client import supabase, get_user_workspaces, get_workspace_by_id, check_user_workspace_access
from app.api.deps import get_current_user_id

router = APIRouter()

@router.get("/", response_model=List[WorkspaceResponse])
async def get_workspaces(
    current_user_id: str = Depends(get_current_user_id),
):
    """Get all workspaces for the current user"""
    workspaces = await get_user_workspaces(current_user_id)
    return workspaces

@router.post("/", response_model=WorkspaceResponse)
async def create_workspace(
    workspace: WorkspaceCreate,
    current_user_id: str = Depends(get_current_user_id),
):
    """Create a new workspace"""
    # Insert the workspace
    workspace_data = workspace.dict()
    response = supabase.table("workspaces").insert(workspace_data).execute()

    if not response.data or len(response.data) == 0:
        raise HTTPException(status_code=500, detail="Failed to create workspace")

    new_workspace = response.data[0]

    # Add the current user as admin
    member_data = {
        "workspace_id": new_workspace["id"],
        "user_id": current_user_id,
        "role": "admin"
    }

    supabase.table("workspace_members").insert(member_data).execute()

    return new_workspace

@router.get("/{workspace_id}", response_model=WorkspaceResponse)
async def get_workspace(
    workspace_id: UUID,
    current_user_id: str = Depends(get_current_user_id),
):
    """Get a specific workspace by ID"""
    # Check if user has access to this workspace
    has_access = await check_user_workspace_access(current_user_id, workspace_id)
    if not has_access:
        raise HTTPException(status_code=403, detail="You don't have access to this workspace")

    workspace = await get_workspace_by_id(workspace_id)
    if not workspace:
        raise HTTPException(status_code=404, detail="Workspace not found")

    return workspace

@router.put("/{workspace_id}", response_model=WorkspaceResponse)
async def update_workspace(
    workspace_id: UUID,
    workspace: WorkspaceUpdate,
    current_user_id: str = Depends(get_current_user_id),
):
    """Update a workspace"""
    # Check if user has admin access to this workspace
    has_access = await check_user_workspace_access(
        current_user_id,
        workspace_id,
        required_roles=["admin", "workspace_manager"]
    )

    if not has_access:
        raise HTTPException(
            status_code=403,
            detail="You don't have permission to update this workspace"
        )

    # Update the workspace
    update_data = {k: v for k, v in workspace.dict().items() if v is not None}
    update_data["updated_at"] = "NOW()"

    response = supabase.table("workspaces").update(update_data).eq("id", str(workspace_id)).execute()

    if not response.data or len(response.data) == 0:
        raise HTTPException(status_code=404, detail="Workspace not found")

    return response.data[0]

@router.delete("/{workspace_id}", response_model=StandardResponse)
async def delete_workspace(
    workspace_id: UUID,
    current_user_id: str = Depends(get_current_user_id),
):
    """Delete a workspace"""
    # Check if user has admin access to this workspace
    has_access = await check_user_workspace_access(
        current_user_id,
        workspace_id,
        required_roles=["admin"]
    )

    if not has_access:
        raise HTTPException(
            status_code=403,
            detail="Only workspace admins can delete workspaces"
        )

    # Delete the workspace
    response = supabase.table("workspaces").delete().eq("id", str(workspace_id)).execute()

    if not response.data or len(response.data) == 0:
        raise HTTPException(status_code=404, detail="Workspace not found")

    return {"success": True, "message": "Workspace deleted successfully"} 