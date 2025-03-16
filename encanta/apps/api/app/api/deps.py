from fastapi import Depends, HTTPException, status, Header
from typing import Optional
import jwt
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Clerk webhook secret from environment variables
CLERK_SECRET_KEY = os.getenv("CLERK_SECRET_KEY")

def get_current_user_id(authorization: str = Header(...)) -> str:
    """Extract user ID from the authorization token"""
    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = authorization.replace("Bearer ", "")

    try:
        # For JWT tokens from Clerk
        decoded = jwt.decode(
            token,
            options={"verify_signature": False}  # We're not verifying the signature here
        )

        # Extract the user ID from the token
        # The actual path depends on your JWT structure from Clerk
        user_id = decoded.get("sub")

        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid user ID in token",
                headers={"WWW-Authenticate": "Bearer"},
            )

        return user_id

    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        ) 