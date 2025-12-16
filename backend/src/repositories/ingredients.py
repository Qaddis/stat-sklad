from ..models import IngredientModel
from ..schemas import HintObject, Hint, AddIngredients

from typing import Optional
from fastapi import HTTPException, status
from sqlalchemy import select, insert
from sqlalchemy.ext.asyncio import AsyncSession

class IngredientsCRUD:
    def __init__(self, db: AsyncSession):
        self.db = db
    
    async def get_ingredient(self, search: str) -> Optional[HintObject]:
        stmt = select(IngredientModel).where(IngredientModel.name.contains(search))
        try:
            result = await self.db.execute(stmt)
            result = result.all()
            hints = []
            for row in result:
                ingredient_dict = row._asdict()
                ingredient_dict = ingredient_dict["IngredientModel"]
                answer = Hint(id=ingredient_dict.id,
                              name=ingredient_dict.name)
                hints.append(answer)
            all_hints = HintObject(hint_content=hints)
            return all_hints
        except:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    async def add_ingredient(self, ingredient_data: AddIngredients):
        ingredient_data = ingredient_data.model_dump()
        stmt = insert(IngredientModel).values(
            name=ingredient_data["name"],
            units=ingredient_data["units"]
        )
        await self.db.execute(stmt)