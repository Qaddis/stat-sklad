from pydantic import BaseModel
from typing import List, Dict, Union

from ..models import TypeEnum

class ProductsInSupply(BaseModel):
    ingredient_id: str
    quantity: int

class CreateSupply(BaseModel):
    supply_content: List[ProductsInSupply]
    action_type: TypeEnum
    
class DeleteSupply(BaseModel):
    supply_content: List[ProductsInSupply]
    action_type: TypeEnum = TypeEnum.WRITE_OFF
        
class TakeIngridient(BaseModel):
    content: List[ProductsInSupply]