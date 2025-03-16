from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
from uuid import UUID, uuid4

# Common response model
class StandardResponse(BaseModel):
    success: bool
    message: Optional[str] = None

# Error response model
class ErrorResponse(StandardResponse):
    success: bool = False
    error: str
    details: Optional[Dict[str, Any]] = None

# Pagination parameters
class PaginationParams(BaseModel):
    page: int = Field(1, ge=1, description="Page number, starting from 1")
    page_size: int = Field(10, ge=1, le=100, description="Number of items per page") 