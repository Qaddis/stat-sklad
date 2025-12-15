from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from ..db import get_db
from ..repositories import IngredientsCRUD
from ..schemas import AddIngredients

router = APIRouter(prefix="/ingredients", tags=["Ingredients"])

@router.get("/hints")
async def get_hint(q: str, db: AsyncSession = Depends(get_db)):
    crud = IngredientsCRUD(db)
    result = await crud.get_ingredient(q)
    return result

@router.post("/")
async def add_ingredients(ingredients_in: AddIngredients, db: AsyncSession = Depends(get_db)):
    try:    
        crud = IngredientsCRUD(db)
        result = await crud.add_ingredient(ingredients_in)
        return status.HTTP_200_OK
    except:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
    