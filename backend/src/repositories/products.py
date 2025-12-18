from ..models import ProductModel, IngredientModel, SupplyItemModel, SupplyModel

from typing import Optional, List, Dict, Any
from fastapi import HTTPException, status
from sqlalchemy import select, func
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession

class ProductsCRUD:
    def __init__(self, db: AsyncSession):
        self.db = db
    async def get_products(
        self,
        *,
        skip: int = 0,
        limit: int = 100,
        search: Optional[str] = None,
        sort_by: str = "last_supply",
        sort_desc: bool = True
    ) -> List[Dict[str, Any]]:
        try:
            stmt = (
                select(ProductModel)
                .options(
                    selectinload(ProductModel.ingredient)
                    .selectinload(IngredientModel.supply_items)
                    .selectinload(SupplyItemModel.supply)
                )
                .join(IngredientModel)
            )
            if search and search.strip():
                stmt = stmt.where(
                    IngredientModel.name.ilike(f"%{search.strip()}%")
                )
            if sort_by == "name":
                order_column = IngredientModel.name
                stmt = stmt.order_by(
                    order_column.desc() if sort_desc else order_column.asc()
                )
            elif sort_by == "created_at":
                order_column = ProductModel.created_at
                stmt = stmt.order_by(
                    order_column.desc() if sort_desc else order_column.asc()
                )
            elif sort_by == "last_supply":
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
                    subquery.c.last_supply_date.desc() if sort_desc 
                    else subquery.c.last_supply_date.asc()
                )
            stmt = stmt.offset(skip).limit(limit)
            
            result = await self.db.execute(stmt)
            products = result.scalars().all()
            responses = []
            for product in products:
                if product.ingredient:
                    last_supply_date = await self._get_last_supply_date(product.ingredient_id)
                    
                    responses.append({
                        "id": str(product.ingredient_id),
                        "name": product.ingredient.name,
                        "quantity": product.quantity,
                        "units": product.ingredient.units.value if isinstance(product.ingredient.units, UnitsEnum) else str(product.ingredient.units),
                        "last_supply": last_supply_date.isoformat() if last_supply_date else None
                    })
            
            return responses
            
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Database error: {str(e)}"
            )
        

    async def get_pgall_products(
            self,
            page: int = 1,
            products_per_page: int = 25,
            q: Optional[str] = None,
            sorted: bool = False
    ) -> Dict[str, Any]:
        try:
            skip = (page - 1) * products_per_page
            products = await self.get_all_products(
                skip=skip,
                limit=products_per_page,
                search=q,
                sort_by="name" if sorted else "last_supply",
                sort_desc=not sorted
            )
            
            total = await self.count_products(q)
            total_pages = (total + products_per_page - 1) // products_per_page if products_per_page > 0 else 1
            
            return {
                "data": products,
                "pagination": {
                    "total": total,
                    "page": page,
                    "size": products_per_page,
                    "total_pages": total_pages,
                    "has_next": (skip + products_per_page) < total,
                    "has_previous": page > 1
                },
                "search": q,
                "sorted_by_alphabet": sorted
            }
            
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Database error: {str(e)}"
            )