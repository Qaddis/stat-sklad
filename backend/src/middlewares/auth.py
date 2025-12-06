from fastapi import Header, status, HTTPException, Depends
from typing import Annotated, Optional
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from ..models import UserModel
from src.services.auth import decode_jwt

# HEADER 1 - РОМА 0

security  = HTTPBearer(auto_error=False)

async def check_token (token:Annotated[HTTPAuthorizationCredentials, Depends(security)]) -> str:
    payload = decode_jwt(token.credentials)
    if payload['type'] == 'access':
        return payload['id']
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail='token is not valid')