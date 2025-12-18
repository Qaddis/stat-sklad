from fastapi import Header, status, HTTPException, Depends
from typing import Annotated, Optional
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jwt import PyJWTError

from ..models import UserModel
from src.services.auth import decode_jwt

# HEADER 1 - РОМА 0

security = HTTPBearer(auto_error=False)


async def check_token(
    token: Annotated[HTTPAuthorizationCredentials, Depends(security)],
) -> str:
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing authentication token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    try:
        payload = decode_jwt(token.credentials)
    except PyJWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid token: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if payload.get("type") != "access":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token type. Expected 'access' token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if "id" not in payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token payload missing required 'id' field",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return payload["id"]
