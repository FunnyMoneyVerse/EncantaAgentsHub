import os
from supabase import create_client
from dotenv import load_dotenv
from typing import List, Dict, Any, Optional
from uuid import UUID

# Load environment variables
load_dotenv()

# Initialize Supabase client
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")
supabase = create_client(supabase_url, supabase_key)

async def get_user_workspaces(user_id: str) -> List[Dict[str, Any]]:
    """Get all workspaces for a user and their role in each workspace"""
    response = supabase.table("workspace_members").select(
        "workspace_id, role, workspaces(*)"
    ).eq("user_id", user_id).execute()

    if response.data:
        return [
            {
                "id": item["workspaces"]["id"],
                "name": item["workspaces"]["name"],
                "description": item["workspaces"]["description"],
                "industry": item["workspaces"]["industry"],
                "role": item["role"],
                "created_at": item["workspaces"]["created_at"]
            }
            for item in response.data
        ]

    return []

async def get_workspace_by_id(workspace_id: UUID) -> Optional[Dict[str, Any]]:
    """Get workspace details by ID"""
    response = supabase.table("workspaces").select("*").eq("id", str(workspace_id)).single().execute()
    return response.data

async def check_user_workspace_access(user_id: str, workspace_id: UUID, required_roles: List[str] = None) -> bool:
    """Check if user has access to the workspace with the required role"""
    query = supabase.table("workspace_members").select("role").eq("user_id", user_id).eq("workspace_id", str(workspace_id))

    response = query.execute()

    if not response.data:
        return False

    if required_roles is None:
        # If no specific roles required, just check if user is a member
        return True

    user_role = response.data[0]["role"]
    return user_role in required_roles 