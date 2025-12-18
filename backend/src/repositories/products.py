from sqlalchemy import select, func, asc
from sqlalchemy.orm import joinedload
from sqlalchemy.ext.asyncio import AsyncSession

from ..models import ProductModel
from ..models import IngredientModel


class ProductsCRUD:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_products(self, page, size, q):
        stmt = (
            select(ProductModel)
            .options(joinedload(ProductModel.ingredient))
            .join(ProductModel.ingredient)
            .order_by(asc(IngredientModel.name))
        )

        if q:
            stmt = stmt.where(IngredientModel.name.ilike(f"%{q.strip()}%"))

        stmt = stmt.offset(page * size).limit(size)

        count_stmt = (
            select(func.count()).select_from(ProductModel).join(ProductModel.ingredient)
        )
        if q:
            count_stmt = count_stmt.where(IngredientModel.name.ilike(f"%{q.strip()}%"))

        result = await self.db.execute(stmt)
        products = result.scalars().all()

        total = await self.db.scalar(count_stmt)

        return products, total
