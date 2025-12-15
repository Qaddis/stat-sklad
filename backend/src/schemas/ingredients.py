from pydantic import BaseModel
from typing import List
from uuid import UUID

class Hint(BaseModel):
    id: UUID
    name: str
    
class HintObject(BaseModel):
    hint_content: List[Hint]