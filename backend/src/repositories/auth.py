from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, insert, update
from typing import Optional
from fastapi import HTTPException, status

from ..db import database
from src.services.auth import get_hash_password 
from ..models import UserModel
from ..schemas import RegisterUser, PatchUser

class UserCRUD:
    def __init__(self, db: AsyncSession):
        self.db  = db
    
    async def get_user_by_email(self, email: str) -> Optional[UserModel]:
        stmt = select(UserModel).where(UserModel.email == email)
        try:
            result = await self.db.execute(stmt)
            return result.scalar_one_or_none()
        except:
            return HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User not found")
                
    async def get_user_by_id(self, id: str) -> Optional[UserModel]:
        stmt = select(UserModel).where(UserModel.id == id)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()
    
    async def create_user(self, user_in: RegisterUser) -> Optional[UserModel]:      
        stmt = insert(UserModel).values(
        first_name=user_in['first_name'],
        second_name=user_in['second_name'],
        email=user_in['email'],
        password=get_hash_password(user_in['password']),
        role=user_in['role']
        )
        
        try:
            await self.db.execute(stmt)
        
            return (await self.db.execute(select(UserModel).where(UserModel.email == user_in['email']))).scalar()
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="user wasn't add to db")
        
    async def edit_user(self, new_data: PatchUser, user_id: str):
        values = new_data.model_dump()
        real_values = {}
        for value in values:
            if values[value] == None:
                pass
            elif value == "password":
                real_values.update({value: get_hash_password(values[value])})
            else:
                real_values.update({value: values[value]})
        stmt = update(UserModel).where(UserModel.id == user_id).values(real_values)
        await self.db.execute(stmt)