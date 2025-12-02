from fastapi import APIRouter, HTTPException, status, Query

from src.services.products import get_all_products, get_product_by_id


router = APIRouter(prefix="/products", tags=["Products"])


@router.get("/")
async def get_products(
    page: int = Query(1, ge=1, description="Номер страницы"),
    products_per_page: int = Query(25, ge=1, le=100, description="Записей на странице")
):
    return get_all_products(page=page, products_per_page=products_per_page) # Вывод странички по номеру в адресе

@router.get("/{product_id}")
async def get_product(product_id: int):
    product = get_product_by_id(product_id)

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Продукт с id = {product_id} не найден",
        )
    return product
