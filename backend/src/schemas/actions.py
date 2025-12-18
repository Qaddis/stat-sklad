from pydantic import BaseModel
from typing import List, Dict, Union

class ProductsInSupply(BaseModel):
    ingredient_id: str
    quantity: int

class CreateSupply(BaseModel):
    supply_content: List[ProductsInSupply]
    
class TakeIngridient(BaseModel):
    content: List[ProductsInSupply]