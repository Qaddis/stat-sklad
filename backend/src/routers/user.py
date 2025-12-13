from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from ..db import get_db
from ..schemas import GetUser, PatchUser
from ..middlewares import check_token
from ..repositories import UserCRUD

router = APIRouter(prefix="/user",tags=["User"])

@router.get("/", response_model=GetUser)
async def get_user(db: AsyncSession = Depends(get_db), user_id: str = Depends(check_token)):
    crud = UserCRUD(db)
    user_data = await crud.get_user_by_id(user_id)
    
    return GetUser(
        user_id=str(user_data.id),
        first_name=user_data.first_name,
        second_name=user_data.second_name,
        email=str(user_data.email)
    )
    
@router.patch("/")
async def edit_user(new_user_data: PatchUser, db: AsyncSession = Depends(get_db), user_id: str = Depends(check_token)):
    crud = UserCRUD(db)
    await crud.edit_user(new_user_data, user_id)
    return status.HTTP_200_OK