from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from ..db import get_db
from ..schemas import GetUser
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