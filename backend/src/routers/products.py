from fastapi import APIRouter, HTTPException, status, Query, Depends
from sqlalchemy.orm import Session

from src.services.products import get_all_products, get_product_by_id

from src.db.database import get_db

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("/")
async def get_products(
    page: int = Query(1, ge=1, description="Номер страницы"),
    products_per_page: int = Query(25, ge=1, le=100, description="Записей на странице"),
    sorted: bool = Query(False, description="Вкл\Выкл(True\False) сортировку по алфавиту"),
    db: Session = Depends(get_db) # Берем текущую сессию БД
) -> dict:
    return get_all_products(db=db, sorted=sorted, page=page, products_per_page=products_per_page) # Вывод странички по номеру в адресе

@router.get("/{product_id}")
async def get_product(product_id: int):
    product = get_product_by_id(product_id)

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Продукт с id = {product_id} не найден",
        )
    return product

@router.get("/alph")
async def get_products_alph(
    page: int = Query(1, ge=1, description="Номер страницы"),
    products_per_page: int = Query(25, ge=1, le=100, description="Записей на странице"),
    db: Session = Depends(get_db) # Берем текущую сессию БД
):
    return get_all_products(db=db, sorted=True, page=page, products_per_page=products_per_page)

@router.get("/latest")
async def get_lates_productst(
    page: int = Query(1, ge=1, description="Номер страницы"),
    products_per_page: int = Query(25, ge=1, le=100, description="Записей на странице"),
    db: Session = Depends(get_db) # Берем текущую сессию БД
):
    return get_all_products(db=db, sorted=False, page=page, products_per_page=products_per_page)