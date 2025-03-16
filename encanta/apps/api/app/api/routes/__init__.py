from fastapi import APIRouter
from app.api.routes import workspaces, content, knowledge, stripe

api_router = APIRouter()

api_router.include_router(workspaces.router, prefix="/workspaces", tags=["workspaces"])
api_router.include_router(content.router, prefix="/content", tags=["content"])
api_router.include_router(knowledge.router, prefix="/knowledge", tags=["knowledge"])
api_router.include_router(stripe.router, prefix="/stripe", tags=["stripe"])
