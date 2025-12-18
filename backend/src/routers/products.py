from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional, List

from src.db.database import get_db
from src.repositories.products import ProductsCRUD

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("/")
async def get_products(
    page: int = Query(1, ge=1, description="Номер страницы"),
    size: int = Query(10, ge=1, le=100, description="Размер страницы"),
    q: Optional[str] = Query(None, description="Поиск по названию"),
    sorted_by_alphabet: bool = Query(False, description="Сортировка по алфавиту (иначе по дате последней поставки)"),
    db: AsyncSession = Depends(get_db)
) -> List[dict]:
    crud = ProductsCRUD(db)
    products = await crud.get_all_products(
        page=page,
        size=size,
        q=q,
        sorted_by_alphabet=sorted_by_alphabet
    )
    return products