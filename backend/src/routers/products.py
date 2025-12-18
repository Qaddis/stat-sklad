from fastapi import APIRouter, Depends
from sqlalchemy.orm import AsuncSession
from typing import Optional, Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession

from src.repositories.products import ProductsCRUD
from src.db.database import get_db

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("/")
async def get_products(
    page: int = 1,
    products_per_page: int = 25,
    q: Optional[str] = None,
    sorted: bool = False,
    db: AsyncSession = Depends(get_db) # Берем текущую сессию БД
) -> Dict[str, Any]:
    
    DB = ProductsCRUD(db)
    return await DB.get_pgall_products(q=q, products_per_page=products_per_page, page=page, sorted=sorted)
