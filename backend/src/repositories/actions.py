from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import insert, select, update
from typing import Optional
from fastapi import status, HTTPException
import uuid

from ..schemas import CreateSupply
from ..models import ProductModel, SupplyModel, SupplyItemModel

class ActionsCRUD:
    def __init__(self, db: AsyncSession):
        self.db  = db
        
    async def get_product(self, id: str) -> Optional[ProductModel]:
        try:
            stmt = select(ProductModel).where(ProductModel.ingredient_id == id)
            result = await self.db.execute(stmt)
            return result.scalar_one_or_none()
        except:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="unexisted ingredient")
        
    async def create_supply(self, supply_content: CreateSupply):
        supply_content = supply_content.model_dump()
        supply_content = supply_content["suply_content"]
        
        stmt = insert(SupplyModel).values(id=uuid.uuid4())
        compiled = stmt.compile()
        await self.db.execute(stmt)
        supply_id = compiled.params["id"]
        
        for supply_item in supply_content:
            existed_product = await self.get_product(supply_item["ingredient_id"])
            if existed_product:
                supply_item["quantity"] = existed_product.quantity + supply_item["quantity"]
                stmt = update(ProductModel).where(
                    ProductModel.ingredient_id == supply_item["ingredient_id"]).values(supply_item)
                await self.db.execute(stmt)
            else:
                stmt = insert(ProductModel).values(supply_item)
                await self.db.execute(stmt)
            stmt = insert(SupplyItemModel).values(
                product_id=supply_item["ingredient_id"],
                supply_id=supply_id,
                quantity=supply_item["quantity"]
            )
            await self.db.execute(stmt)
            

        
        