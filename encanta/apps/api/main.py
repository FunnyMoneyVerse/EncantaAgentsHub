from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from dotenv import load_dotenv
import os

# Import our routes
from app.api.routes import api_router
from app.core.config import settings

# Load environment variables from .env file
load_dotenv()

# Create FastAPI app with metadata
app = FastAPI(
    title="Encanta API",
    description="API for Encanta AI content platform",
    version="1.0.0",
    docs_url="/docs",  # URL for automatic API documentation
    redoc_url="/redoc"  # Alternative documentation UI
)

# Configure CORS to allow requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Include API router
app.include_router(api_router, prefix=settings.API_PREFIX)

@app.get("/")
async def root():
    """Root endpoint that confirms the API is running"""
    return {
        "message": "Welcome to Encanta API",
        "docs": "/docs",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "ok",
        "version": "1.0.0"
    }

# Run the app when executing this file directly
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=3001, reload=True) 