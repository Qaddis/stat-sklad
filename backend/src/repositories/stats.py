from datetime import datetime, timezone

from sqlalchemy import select, func
from sqlalchemy.orm import joinedload
from sqlalchemy.ext.asyncio import AsyncSession

from ..models import ProductModel, IngredientModel, UnitsEnum, SupplyModel, TypeEnum
from ..schemas import (
    ProductsStatsPiece,
    ProductsStatsData,
    SuppliesStatsPiece,
    SuppliesStatsData,
)


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

    async def get_supplies_stats_data(self):
        current_year = datetime.now(timezone.utc).year

        stmt = (
            select(
                func.extract("month", SupplyModel.created_at).label("month"),
                func.count().label("supplies_count"),
            )
            .where(
                SupplyModel.action_type == TypeEnum.SUPPLY,
                func.extract("year", SupplyModel.created_at) == current_year,
            )
            .group_by(func.extract("month", SupplyModel.created_at))
            .order_by(func.extract("month", SupplyModel.created_at))
        )

        result = await self.db.execute(stmt)
        rows = result.all()

        stats = [
            SuppliesStatsPiece(month=item.month, supplies_count=item.supplies_count)
            for item in rows
        ]

        full_stats = []
        month_counts = {item.month: item.supplies_count for item in stats}

        for month in range(1, 13):
            full_stats.append(
                SuppliesStatsPiece(
                    month=month, supplies_count=month_counts.get(month, 0)
                )
            )

        return SuppliesStatsData(content=full_stats)
