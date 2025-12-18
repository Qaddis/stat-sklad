from fastapi import APIRouter, Depends

from sqlalchemy.ext.asyncio import AsyncSession

from ..db import get_db
from ..middlewares import check_token
from ..schemas import ProductsStatsData, SuppliesStatsData
from ..repositories import StatsCRUD

router = APIRouter(prefix="/stats", tags=["Statistics"])


@router.get("/products")
async def get_products_stats(
    db: AsyncSession = Depends(get_db), user_id: str = Depends(check_token)
) -> ProductsStatsData:
    crud = StatsCRUD(db)

    return await crud.get_products_stats_data()


@router.get("/supplies")
async def get_supplies_stats(
    db: AsyncSession = Depends(get_db), user_id: str = Depends(check_token)
) -> SuppliesStatsData:
    crud = StatsCRUD(db)

    return await crud.get_supplies_stats_data()
