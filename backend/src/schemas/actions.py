from pydantic import BaseModel
from typing import List, Dict, Union

from ..models import TypeEnum


class ProductsInSupply(BaseModel):
    ingredient_id: str
    quantity: int


class CreateSupply(BaseModel):
    supply_content: List[ProductsInSupply]


class TakeIngredient(BaseModel):
    content: List[ProductsInSupply]
