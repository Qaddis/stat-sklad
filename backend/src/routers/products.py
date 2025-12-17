from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from typing import Optional, List

from src.services.products import get_all_products, get_product_by_id

from src.db.database import get_db

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("/", response_model=List[dict])
async def get_products(
    page: int = 1,
    products_per_page: int = 25,
    q: Optional[str] = None,
    db: Session = Depends(get_db) # Берем текущую сессию БД
) -> dict:
    return get_all_products(db=db, sorted=False, page=page, products_per_page=products_per_page, q=q) # Вывод странички по номеру в адресе

@router.get("/{product_id}")
async def get_product(product_id: str, db: Session = Depends(get_db)):
    product = get_product_by_id(db, product_id)
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Продукт с id = {product_id} не найден",
        )
    return product

@router.get("/alph")
async def get_products_alph(
    page: int = 1,
    products_per_page: int = 25,
    db: Session = Depends(get_db) # Берем текущую сессию БД
):
    return get_all_products(db=db, sorted=True, page=page, products_per_page=products_per_page, q=None)

@router.get("/alphsearched")
async def get_products_alphsearch(
    page: int = 1,
    products_per_page: int = 25,
    q: Optional[str] = None,
    db: Session = Depends(get_db) # Берем текущую сессию БД
):
    return get_all_products(db=db, sorted=True, page=page, products_per_page=products_per_page, q=q, sorted=True)

@router.get("/latest")
async def get_lates_productst(
    page: int = 1,
    products_per_page: int = 25,
    db: Session = Depends(get_db) # Берем текущую сессию БД
):
    return get_all_products(db=db, sorted=False, page=page, products_per_page=products_per_page, q=None, sorted=0)