from fastapi import APIRouter, HTTPException, status

from src.services.products import get_all_products, get_product_by_id


router = APIRouter(prefix="/products", tags=["Products"])


@router.get("/")
async def get_products():
    return get_all_products()


@router.get("/{product_id}")
async def get_product(product_id: int):
    product = get_product_by_id(product_id)

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Продукт с id = {product_id} не найден",
        )

    return product
