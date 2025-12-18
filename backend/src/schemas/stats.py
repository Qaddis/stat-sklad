from pydantic import BaseModel
from typing import List


class ProductsStatsPiece(BaseModel):
    name: str
    quantity: int


class ProductsStatsData(BaseModel):
    in_kilograms: List[ProductsStatsPiece]
    in_pieces: List[ProductsStatsPiece]


class SuppliesStatsPiece(BaseModel):
    month: int
    supplies_count: int


class SuppliesStatsData(BaseModel):
    content: List[SuppliesStatsPiece]
