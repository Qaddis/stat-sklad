from fastapi import APIRouter, Depends, HTTPException, status
from typing import Optional
from fastapi.security import HTTPBasic
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import timedelta

from ..schemas import RegisterUser, TokenInfo, AuthUser
from ..repositories import UserCRUD
from ..db import get_db
from ..config import settings
from src.services.auth import encode_jwt, decode_jwt, verify_password, get_hash_password

TOKEN_TYPE_FIELD = 'type'
ACCESS_TYPE = 'access'
REFRESH_TYPE = 'refresh'

router = APIRouter(prefix="/auth", tags=["Auth"])

security = HTTPBasic()

@router.post("/sign_up", response_model=TokenInfo) 
async def sign_up(user_in: RegisterUser, db : AsyncSession = Depends(get_db)):
    user_data = user_in.model_dump()
    crud = UserCRUD(db) 
    existed_user = await crud.get_user_by_email(user_data["email"])
    if existed_user.email == user_data["email"]:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="user already exist")
    else:
        result = await crud.create_user(user_data)

        jwt_payload = {
            "id": str(result.id),
            "email": result.email,
            TOKEN_TYPE_FIELD: ACCESS_TYPE
        }

        access_token = encode_jwt(jwt_payload)

        refresh_token = encode_jwt(
            {'id': str(result.id),
            TOKEN_TYPE_FIELD: REFRESH_TYPE},
            expire_timedelta=timedelta(days=settings.auth_jwt.refresh_token_expire_days))

        return TokenInfo(
            user_id=str(result.id),
            access_token=access_token,
            refresh_token=refresh_token
        )
    
    
@router.post("/sign_in", response_model=Optional[TokenInfo])
async def sign_in(auth_data: AuthUser, db: AsyncSession = Depends(get_db)):
    crud = UserCRUD(db)
    result = await crud.get_user_by_email(auth_data.email)

    if result:
        if verify_password(auth_data.password, result.password):
            jwt_payload = {
                "id": str(result.id),
                TOKEN_TYPE_FIELD: REFRESH_TYPE
            }
            refresh_token = encode_jwt(
                jwt_payload,
                expire_timedelta=timedelta(days=settings.auth_jwt.refresh_token_expire_days))
            
            jwt_payload.update({
                "id": str(result.id),
                "email": result.email,
                TOKEN_TYPE_FIELD: ACCESS_TYPE})
            access_token = encode_jwt(jwt_payload)
            
            return TokenInfo(
                user_id=str(result.id),
                access_token=access_token,
                refresh_token=refresh_token
            )
        else:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="wrong password")
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User not found")
    
    
@router.post("/refresh", response_model=Optional[TokenInfo])
async def refresh_token(refresh_token : str, db : AsyncSession = Depends(get_db)):
    payload = decode_jwt(refresh_token)
    
    crud = UserCRUD(db)
    result = await crud.get_user_by_id(payload['id'])
    if result:
        access_payload = {
            "id": str(result.id),
            "email": result.email,
            TOKEN_TYPE_FIELD: ACCESS_TYPE
        }
        access_token = encode_jwt(access_payload)
        
        refresh_payload = {
            "id": str(result.id),
            TOKEN_TYPE_FIELD: REFRESH_TYPE
        }
        new_refresh_token = encode_jwt(refresh_payload,
            expire_timedelta=timedelta(days=settings.auth_jwt.refresh_token_expire_days))
        
        return TokenInfo(
            user_id=str(result.id),
            access_token=access_token,
            refresh_token=new_refresh_token
        )
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User not found")
    