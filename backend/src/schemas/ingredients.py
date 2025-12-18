from pydantic import BaseModel
from typing import List
from uuid import UUID

from ..models import UnitsEnum

class Hint(BaseModel):
    id: UUID
    name: str
    
class HintObject(BaseModel):
    hint_content: List[Hint]
    
class AddIngredients(BaseModel):
    name: str
    units: UnitsEnum