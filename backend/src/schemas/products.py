from pydantic import BaseModel
from typing import List

from ..models import UnitsEnum


class Product(BaseModel):
    id: str
    name: str
    quantity: int
    units: UnitsEnum
    last_supply: str


class PaginatedProducts(BaseModel):
    items: List[Product]
    total: int
    page: int
    size: int
