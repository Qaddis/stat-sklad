from sqlalchemy.orm import Session, joinedload
from sqlalchemy import asc, desc, func
from typing import Dict, Any, Optional
from uuid import UUID as PyUUID
import math
from datetime import datetime

from src.models.products import ProductModel
from src.models.ingredients import IngredientModel, UnitsEnum
from src.models.supplies import SupplyItemModel, SupplyModel


def get_all_products(db: Session, sorted: bool = False, page: int = 1, products_per_page: int = 25, q: str = None) -> Dict[str, Any]:
    query = db.query(ProductModel).options(
        joinedload(ProductModel.ingredient)
        .joinedload(IngredientModel.supply_items)
        .joinedload(SupplyItemModel.supply)
    ).join(IngredientModel)

    if q and q.strip():
        query = query.filter(IngredientModel.name.ilike(f"%{q.strip()}%"))

    if sorted:
        query = query.order_by(asc(IngredientModel.name))
    else:
        subquery = db.query(
            SupplyItemModel.product_id,
            func.max(SupplyModel.created_at).label('last_supply_date')
        ).join(
            SupplyModel, SupplyItemModel.supply_id == SupplyModel.id
        ).group_by(
            SupplyItemModel.product_id
        ).subquery()
        
        query = query.outerjoin(
            subquery, 
            IngredientModel.id == subquery.c.product_id
        ).order_by(
            desc(subquery.c.last_supply_date),  
            desc(IngredientModel.created_at)  
        )

    total = query.count()
    
    skip = (page - 1) * products_per_page
    
    if skip >= total:
        return []
    
    products = query.offset(skip).limit(products_per_page).all()
    
    products_list = []
    for product in products:
        last_supply_date = None
        if product.ingredient and product.ingredient.supply_items:
            for supply_item in product.ingredient.supply_items:
                if supply_item.supply and supply_item.supply.created_at:
                    if last_supply_date is None or supply_item.supply.created_at > last_supply_date:
                        last_supply_date = supply_item.supply.created_at

        units_value = ""
        if product.ingredient and product.ingredient.units:
            if isinstance(product.ingredient.units, UnitsEnum):
                units_value = product.ingredient.units.value
            else:
                units_value = str(product.ingredient.units)

        product_data = {
            "id": str(product.ingredient_id),
            "name": product.ingredient.name if product.ingredient else "",
            "quantity": product.quantity,
            "units": units_value,
            "last_supply": last_supply_date.isoformat() if last_supply_date else None
        }
        products_list.append(product_data)
    
    return products_list


def get_product_by_id(db: Session, product_id: str) -> Optional[Dict[str, Any]]:
    try:
        uuid_obj = PyUUID(product_id)
    except ValueError:
        return None
    
    product = db.query(ProductModel).options(
        joinedload(ProductModel.ingredient)
        .joinedload(IngredientModel.supply_items)
        .joinedload(SupplyItemModel.supply)
    ).filter(
        ProductModel.ingredient_id == uuid_obj
    ).first()
    date = None
    
    if not product or not product.ingredient:
        return None
    
    last_supply_date = None
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
    
    return {
        "id": str(product.ingredient_id),
        "name": product.ingredient.name,
        "quantity": int(product.quantity),
        "units": units_value,
        "last_supply": last_supply_date.isoformat() if last_supply_date else None
    }
