from sqlalchemy import select
from sqlalchemy.orm import joinedload
from sqlalchemy.ext.asyncio import AsyncSession

from ..models import ProductModel, IngredientModel, UnitsEnum
from ..schemas import ProductsStatsPiece, ProductsStatsData


class StatsCRUD:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_products_stats_data(self):
        kgs_stmt = (
            select(ProductModel)
            .join(ProductModel.ingredient)
            .where(IngredientModel.units == UnitsEnum.KILOGRAMS)
            .order_by(ProductModel.quantity.desc())
            .limit(10)
            .options(joinedload(ProductModel.ingredient))
        )

        pieces_stmt = (
            select(ProductModel)
            .join(ProductModel.ingredient)
            .where(IngredientModel.units == UnitsEnum.PIECES)
            .order_by(ProductModel.quantity.desc())
            .limit(10)
            .options(joinedload(ProductModel.ingredient))
        )

        kgs_result = await self.db.execute(kgs_stmt)
        pieces_result = await self.db.execute(pieces_stmt)

        kgs_data = [
            ProductsStatsPiece(name=item.ingredient.name, quantity=item.quantity)
            for item in kgs_result.scalars().all()
        ]

        pieces_data = [
            ProductsStatsPiece(name=item.ingredient.name, quantity=item.quantity)
            for item in pieces_result.scalars().all()
        ]

        return ProductsStatsData(in_kilograms=kgs_data, in_pieces=pieces_data)

    async def get_supplies_stats_data():
        pass
