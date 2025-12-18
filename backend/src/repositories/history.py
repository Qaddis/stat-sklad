from datetime import datetime

from sqlalchemy import select, func
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession

from ..models import SupplyModel, SupplyItemModel
from ..schemas import Operation, PaginatedOperations


class HistoryCRUD:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_all_operations(
        self, page: int, size: int, date_from: str, date_to: str
    ):
        filters = []

        try:
            if date_from:
                date_from_dt = datetime.fromisoformat(date_from)
                filters.append(SupplyModel.created_at >= date_from_dt)

            if date_to:
                date_to_dt = datetime.fromisoformat(date_to)
                filters.append(SupplyModel.created_at <= date_to_dt)
        except:
            pass

        count_stmt = select(func.count()).select_from(SupplyModel)
        if len(filters) > 0:
            count_stmt = count_stmt.where(*filters)

        total = (await self.db.execute(count_stmt)).scalar() or 0

        stmt = (
            select(SupplyModel)
            .options(
                selectinload(SupplyModel.products).selectinload(SupplyItemModel.product)
            )
            .order_by(SupplyModel.created_at.desc())
            .offset(page * size)
            .limit(size)
        )

        if len(filters) > 0:
            stmt = stmt.where(*filters)

        result = await self.db.execute(stmt)
        operations = result.scalars().all()

        items = []
        for operation in operations:
            products = [
                item.product.name for item in operation.products if item.product
            ][:5]

            items.append(
                Operation(
                    id=str(operation.id),
                    type=operation.action_type,
                    products=products,
                    created_at=operation.created_at.isoformat(),
                )
            )

        return PaginatedOperations(
            items=items,
            total=total,
            page=page,
            size=size,
        )

    async def get_one_operation(self, action_id: str):
        pass

    async def get_latest_operations(self):
        pass
