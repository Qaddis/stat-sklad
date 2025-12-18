from pydantic import BaseModel
from typing import List

from ..models import TypeEnum


class Operation(BaseModel):
    id: str
    type: TypeEnum
    products: List[str]
    created_at: str


class PaginatedOperations(BaseModel):
    items: List[Operation]
    total: int
    page: int
    size: int


class Operations(BaseModel):
    content: List[Operation]
