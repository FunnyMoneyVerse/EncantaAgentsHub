from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from uuid import UUID, uuid4

class WorkspaceCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    industry: Optional[str] = None

class WorkspaceUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = None
    industry: Optional[str] = None

class WorkspaceResponse(BaseModel):
    id: UUID
    name: str
    description: Optional[str] = None
    industry: Optional[str] = None
    created_at: datetime
    updated_at: datetime 