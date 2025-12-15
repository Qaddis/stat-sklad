from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from ..db import get_db
from ..repositories import IngredientsCRUD

router = APIRouter(prefix="/ingredients", tags=["Ingredients"])

@router.get("/hints")
async def get_hint(q: str, db: AsyncSession = Depends(get_db)):
    crud = IngredientsCRUD(db)
    result = await crud.get_ingredient(q)
    return result