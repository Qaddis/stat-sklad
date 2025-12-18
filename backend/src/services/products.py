from sqlalchemy.orm import Session
from sqlalchemy import asc, desc
from typing import Dict, Any, Optional
from uuid import UUID as PyUUID
import math

from src.models.products import ProductModel
from src.models.ingredients import IngredientModel



def get_all_products(db: Session,sorted: bool = False, page: int = 1, products_per_page: int = 25) -> Dict[str, Any]:
    query = db.query(ProductModel).join(IngredientModel)
    skip = (page - 1) * products_per_page # Элементы по номеру страницы
    
    if sorted: # Сортируем по алфавиту, если пользователь нажал соответствующую кнопку
        query = query.order_by(asc(IngredientModel.name))
    else:   # Иначе выводим по дате создания \ добавления
        query = query.order_by(desc(ProductModel.created_at))
    
    total = query.count() # Всего элементов
    skip = (page - 1) * products_per_page

    if skip >= total: # "Ошибка пользователя при запросе несуществующей страницы"
        return {
            "products": [], # "Список товаров закончился"
            "total": total,
            "page": page,
            "per_page": products_per_page,
            "total_pages": math.ceil(total / products_per_page) if products_per_page > 0 else 1,
            "has_next": False,   # Далее не идем по страницам
            "sorted": "alph" if sorted else "date"
        }
    
    paginated = query.offset(skip).limit(products_per_page).all() # Ввыводим кол - во элементов постранично(пагинация же да)
    productsLst = []
    for product in paginated:
        productsLst.append({
            "ingredient_id": str(product.ingredient_id),
            "ingredient_name": product.ingredient.name if product.ingredient else None,
            "ingredient_description": product.ingredient.description if product.ingredient else None,
            "quantity": product.quantity,
            "created_at": product.created_at.isoformat() if product.created_at else None,
            "ingredient_created_at": product.ingredient.created_at.isoformat() if product.ingredient and product.ingredient.created_at else None,
        })

    return {    # Вывод продуктов постранично, и данных о текущей странице, а так же расчет следующей
         "products": productsLst,
        "total": total,
        "page": page,
        "per_page": products_per_page,
        "total_pages": math.ceil(total / products_per_page) if products_per_page > 0 else 1,
        "has_next": (skip + products_per_page) < total,
        "sorted": "alphabet" if sorted else "date"
    }

def get_product(db: Session, ingredient_id: str) -> Optional[Dict[str, Any]]:
    try:
        uuid_obj = PyUUID(ingredient_id)
    except ValueError:
        return None
    
    product = db.query(ProductModel).join(IngredientModel).filter(
        ProductModel.ingredient_id == uuid_obj
    ).first()
    date = None
    
    if not product:
        return None
    
    return {
        "id": str(product.ingredient_id),
        "name": product.ingredient.name if product.ingredient else None,
        "quantity": product.quantity,
        "units": str(product.ingridient.units),
        "last_supply": str(date.isoformat())
    }
