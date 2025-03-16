from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
from uuid import UUID
from enum import Enum

class ContentType(str, Enum):
    blog = "blog"
    social_post = "social_post"
    email = "email"
    landing_page = "landing_page"
    video_script = "video_script"

class ContentStatus(str, Enum):
    draft = "draft"
    review = "review"
    published = "published"
    archived = "archived"

class ContentCreate(BaseModel):
    workspace_id: UUID
    title: str = Field(..., min_length=1, max_length=255)
    content_type: ContentType
    content: Dict[str, Any]
    status: ContentStatus = ContentStatus.draft

class ContentUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    content: Optional[Dict[str, Any]] = None
    status: Optional[ContentStatus] = None

class ContentResponse(BaseModel):
    id: UUID
    workspace_id: UUID
    title: str
    content_type: ContentType
    content: Dict[str, Any]
    status: ContentStatus
    created_by: str
    created_at: datetime
    updated_at: datetime 