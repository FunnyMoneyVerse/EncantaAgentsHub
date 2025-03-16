from app.core.config import settings
from typing import Dict, Literal, Optional
import os
import uuid

# Define bucket types for type hinting
BucketType = Literal["BRAND_ASSETS", "CONTENT_MEDIA", "KNOWLEDGE_FILES"]

# Mapping between database naming (with underscores) and actual bucket names (with hyphens)
BUCKET_NAMES: Dict[BucketType, str] = {
    "BRAND_ASSETS": settings.BUCKET_BRAND_ASSETS,
    "CONTENT_MEDIA": settings.BUCKET_CONTENT_MEDIA,
    "KNOWLEDGE_FILES": settings.BUCKET_KNOWLEDGE_FILES
}

def get_bucket_name(bucket_type: BucketType) -> str:
    """
    Get the actual bucket name (with hyphens) from the bucket type (with underscores)
    
    Args:
        bucket_type: The bucket type using underscore naming in code
        
    Returns:
        The actual bucket name with hyphens
    """
    return BUCKET_NAMES[bucket_type]

def get_storage_path(bucket_type: BucketType, user_id: str, file_name: str, folder: Optional[str] = None) -> str:
    """
    Constructs a storage path using the correct bucket name with hyphens.
    
    Args:
        bucket_type: The bucket type (using underscore naming in code)
        user_id: The ID of the user who owns the file
        file_name: The name of the file
        folder: Optional subfolder within the user's directory
        
    Returns:
        A properly formatted storage path
    """
    bucket_name = get_bucket_name(bucket_type)
    
    if folder:
        return f"{bucket_name}/{user_id}/{folder}/{file_name}"
    else:
        return f"{bucket_name}/{user_id}/{file_name}"

def generate_unique_filename(original_filename: str) -> str:
    """
    Generate a unique filename by adding a UUID to prevent collisions
    
    Args:
        original_filename: The original filename
        
    Returns:
        A unique filename with UUID
    """
    file_extension = os.path.splitext(original_filename)[1]
    return f"{uuid.uuid4()}{file_extension}"

def validate_file_type(file_type: str, allowed_types: list) -> bool:
    """
    Validate if the file type is allowed
    
    Args:
        file_type: The MIME type of the file
        allowed_types: List of allowed MIME types
        
    Returns:
        True if the file type is allowed, False otherwise
    """
    return file_type in allowed_types

def validate_file_size(file_size: int, max_size: int) -> bool:
    """
    Validate if the file size is within the allowed limit
    
    Args:
        file_size: The size of the file in bytes
        max_size: The maximum allowed size in bytes
        
    Returns:
        True if the file size is within the limit, False otherwise
    """
    return file_size <= max_size 