from pydantic import BaseModel
from typing import List
from uuid import UUID
from datetime import datetime

from ..models.ingredients import UnitsEnum

class ProductResponse(BaseModel):
    id: UUID
    name: str
    quantity: int
    units: UnitsEnum
    last_supply: datetime | None

class ProductsListResponse(BaseModel):
    items: List[ProductResponse]
    
    class Config:
        from_attributes = True