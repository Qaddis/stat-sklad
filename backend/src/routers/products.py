from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from ..db import get_db
from ..middlewares import check_token
from ..repositories import ProductsCRUD
from ..schemas import Product, PaginatedProducts

router = APIRouter(prefix="/products", tags=["Products"])


@router.get("/")
async def get_products(
    page: int = 0,
    size: int = 25,
    q: str = "",
    db: AsyncSession = Depends(get_db),
    user_id: str = Depends(check_token),
):
    crud = ProductsCRUD(db)

    products, total = await crud.get_products(page, size, q)

    items = [
        Product(
            id=str(product.ingredient_id),
            name=product.ingredient.name,
            quantity=product.quantity,
            units=product.ingredient.units,
            last_supply=product.last_supply.isoformat(),
        )
        for product in products
    ]

    return PaginatedProducts(items=items, total=total, page=page, size=size)
