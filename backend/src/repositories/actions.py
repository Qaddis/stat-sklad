from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import insert, select, update
from typing import Optional
from fastapi import status, HTTPException
from datetime import datetime, UTC
import uuid

from ..schemas import CreateSupply
from ..models import ProductModel, SupplyModel, SupplyItemModel, TypeEnum


class ActionsCRUD:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_product(self, id: str) -> Optional[ProductModel]:
        try:
            stmt = select(ProductModel).where(ProductModel.ingredient_id == id)
            result = await self.db.execute(stmt)
            return result.scalar_one_or_none()
        except:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="unexisted ingredient"
            )

    async def create_supply(self, supply_content: CreateSupply):
        # берем список продуктов в виде словаря
        supply_content = supply_content.model_dump()
        type_of_supply = supply_content["action_type"]
        supply_content = supply_content["supply_content"]

        # создаем supplie и берем его id
        stmt = insert(SupplyModel).values(id=uuid.uuid4())
        compiled = stmt.compile()
        await self.db.execute(stmt)
        supply_id = compiled.params["id"]

        # перебираем список продуктов и сохранияем кол-во продуктов в отдельную переменную
        for supply_item in supply_content:
            if type_of_supply == TypeEnum.WRITE_OFF:
                supply_item["quantity"] = -supply_item["quantity"]
            existed_product = await self.get_product(supply_item["ingredient_id"])
            if type_of_supply == TypeEnum.WRITE_OFF and (
                existed_product is None
                or existed_product.quantity < abs(supply_item["quantity"])
            ):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="there are not many products",
                )
            quantity_of_items = supply_item["quantity"]

            # изменяем значение кол-ва продукта
            if existed_product:
                supply_item["quantity"] = (
                    existed_product.quantity + supply_item["quantity"]
                )
                if type_of_supply == TypeEnum.SUPPLY:
                    supply_item["last_supply"] = datetime.now(UTC)
                    stmt = (
                        update(ProductModel)
                        .where(
                            ProductModel.ingredient_id == supply_item["ingredient_id"]
                        )
                        .values(supply_item)
                    )
                    await self.db.execute(stmt)
                else:
                    stmt = (
                        update(ProductModel)
                        .where(
                            ProductModel.ingredient_id == supply_item["ingredient_id"]
                        )
                        .values(supply_item)
                    )
                    await self.db.execute(stmt)

            # добавляем новый продукт
            else:
                supply_item["last_supply"] = datetime.now(UTC)
                stmt = insert(ProductModel).values(supply_item)
                await self.db.execute(stmt)

            stmt = insert(SupplyItemModel).values(
                product_id=supply_item["ingredient_id"],
                supply_id=supply_id,
                quantity=quantity_of_items,
            )
            await self.db.execute(stmt)
