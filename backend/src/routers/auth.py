from fastapi import APIRouter, Depends
from typing import Annotated
from fastapi.security import HTTPBasic
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import timedelta

from ..schemas import RegisterUser, TokenInfo
from ..repositories import UserCRUD
from ..db import get_db
from ..config import settings
from src.services.auth import encode_jwt

TOKEN_TYPE_FIELD = 'type'
ACCESS_TYPE = 'access'
REFRESH_TYPE = 'refresh'

router = APIRouter(prefix="/auth", tags=["Auth"])

security = HTTPBasic()

@router.post("/sign_up", response_model=TokenInfo) 
async def sign_up(user_in: RegisterUser, db : AsyncSession = Depends(get_db)):
    user_data = user_in.model_dump()
    crud = UserCRUD(db) 
    result = await crud.create_user(user_data)
    
    jwt_payload = {
        "id": str(result.id),
        "email": result.email,
        "role": str(result.role),
        TOKEN_TYPE_FIELD: ACCESS_TYPE
    }
    
    access_token = encode_jwt(jwt_payload)
    
    refresh_token = encode_jwt(
        {'id': str(result.id),
        TOKEN_TYPE_FIELD: REFRESH_TYPE},
        expire_timedelta=timedelta(days=settings.auth_jwt.refresh_token_expire_days))
    
    return TokenInfo(
        access_token=access_token,
        refresh_token=refresh_token
    )