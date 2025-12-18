from ..models import ProductModel, IngredientModel, SupplyItemModel, SupplyModel, UnitsEnum

from typing import Optional, List, Dict, Any
from fastapi import HTTPException, status
from sqlalchemy import select, func, or_
from sqlalchemy.orm import selectinload, joinedload
from sqlalchemy.ext.asyncio import AsyncSession

class ProductsCRUD:
    def __init__(self, db: AsyncSession):
        self.db = db
    
    async def get_all_products(
        self,
        page: int = 1,
        size: int = 10,
        q: Optional[str] = None,
        sorted_by_alphabet: bool = False
    ) -> List[Dict[str, Any]]:
        
        try:
            skip = (page - 1) * size
            
            stmt = (
                select(ProductModel)
                .join(IngredientModel, ProductModel.ingredient_id == IngredientModel.id)
                .options(
                    selectinload(ProductModel.ingredient)
                    .selectinload(IngredientModel.supply_items)
                    .selectinload(SupplyItemModel.supply)
                )
            )
            
            if q and q.strip():
                search_term = f"%{q.strip()}%"
                stmt = stmt.where(
                    IngredientModel.name.ilike(search_term)
                )
            
            if sorted_by_alphabet:
                stmt = stmt.order_by(IngredientModel.name.asc())
            else:
                subquery = (
                    select(
                        SupplyItemModel.product_id,
                        func.max(SupplyModel.created_at).label('last_supply_date')
                    )
                    .join(SupplyModel, SupplyItemModel.supply_id == SupplyModel.id)
                    .group_by(SupplyItemModel.product_id)
                    .subquery()
                )
                
                stmt = stmt.outerjoin(
                    subquery, IngredientModel.id == subquery.c.product_id
                ).order_by(
                    func.coalesce(subquery.c.last_supply_date, ProductModel.created_at).desc(),
                    IngredientModel.name.asc()  # Вторичная сортировка для стабильности
                )
            
            stmt = stmt.offset(skip).limit(size)
            
            result = await self.db.execute(stmt)
            products = result.scalars().all()
            
            products_list = []
            for product in products:
                if product.ingredient:
                    if product.ingredient.supply_items:
                        for supply_item in product.ingredient.supply_items:
                            if supply_item.supply and supply_item.supply.created_at:
                                if last_supply_date is None or supply_item.supply.created_at > last_supply_date:
                                    last_supply_date = supply_item.supply.created_at
                    
                    units_value = ""
                    if product.ingredient.units:
                        if isinstance(product.ingredient.units, UnitsEnum):
                            units_value = product.ingredient.units.value
                        else:
                            units_value = str(product.ingredient.units)
                    

                    product_data = {
                        "id": str(product.ingredient_id),
                        "name": product.ingredient.name,
                        "quantity": product.quantity,
                        "units": units_value,
                        "last_supply": last_supply_date.isoformat() if last_supply_date else None
                    }
                    products_list.append(product_data)
            
            return products_list
            
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Database error: {str(e)}"
            )
    
    