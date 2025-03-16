import os
from pydantic_settings import BaseSettings
from typing import List, Optional
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Settings(BaseSettings):
    """Application settings"""
    
    # API settings
    API_PREFIX: str = "/api"
    DEBUG: bool = os.getenv("DEBUG", "False").lower() in ("true", "1", "t")
    
    # CORS settings
    CORS_ORIGINS: List[str] = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
    
    # Database settings
    DATABASE_URL: str = os.getenv("DATABASE_URL", "")
    
    # Supabase settings
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")
    
    # OpenAI settings
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    OPENAI_ORGANIZATION: str = os.getenv("OPENAI_ORGANIZATION", "")
    
    # Pinecone settings
    PINECONE_API_KEY: str = os.getenv("PINECONE_API_KEY", "")
    PINECONE_ENVIRONMENT: str = os.getenv("PINECONE_ENVIRONMENT", "")
    PINECONE_INDEX: str = os.getenv("PINECONE_INDEX", "encanta-knowledge")
    
    # Storage bucket names
    # Note: Bucket names use hyphens while database references use underscores
    BUCKET_BRAND_ASSETS: str = "brand-assets"
    BUCKET_CONTENT_MEDIA: str = "content-media"
    BUCKET_KNOWLEDGE_FILES: str = "knowledge-files"
    
    # Authentication
    CLERK_SECRET_KEY: str = os.getenv("CLERK_SECRET_KEY", "")
    CLERK_PUBLISHABLE_KEY: str = os.getenv("CLERK_PUBLISHABLE_KEY", "")

    # Stripe settings
    STRIPE_SECRET_KEY: str = os.getenv("STRIPE_SECRET_KEY", "")
    STRIPE_WEBHOOK_SECRET: str = os.getenv("STRIPE_WEBHOOK_SECRET", "")
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

# Create settings instance
settings = Settings() 