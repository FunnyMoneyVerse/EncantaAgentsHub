from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import os
from datetime import datetime

# Create FastAPI app
app = FastAPI(
    title="Encanta API",
    description="API for Encanta AI-powered content platform",
    version="0.1.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Welcome to Encanta API",
        "version": "0.1.0",
        "status": "operational",
        "timestamp": datetime.now().isoformat()
    }

# Health check endpoint
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat()
    }

# Mock workspaces endpoint
@app.get("/workspaces")
async def get_workspaces():
    return [
        {
            "id": "1",
            "name": "Marketing Team",
            "slug": "marketing-team",
            "createdAt": "2025-03-10T12:00:00Z",
            "updatedAt": "2025-03-15T14:30:00Z"
        },
        {
            "id": "2",
            "name": "Product Launch",
            "slug": "product-launch",
            "createdAt": "2025-03-12T09:00:00Z",
            "updatedAt": "2025-03-14T16:45:00Z"
        }
    ]

# Include routers from other modules
# from app.api.v1.router import router as api_router
# app.include_router(api_router, prefix="/api/v1")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3001) 