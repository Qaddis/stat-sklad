from typing import List
from uuid import UUID
from enum import Enum as PyEnum

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import ENUM as PgEnum


from src.db import Base
from src.models.defaults import uuid, createdAt
from src.models import IngredientModel

class TypeEnum(PyEnum):
    SUPPLY = "SUPPLY"
    WRITE_OFF = "WRITE_OFF"
    TAKEN = "TAKEN"
    
class SupplyItemModel(Base):
    __tablename__ = "supply_items"

    id: Mapped[uuid]

    product_id: Mapped[UUID] = mapped_column(
        ForeignKey("ingredients.id", ondelete="CASCADE")
    )
    product: Mapped["IngredientModel"] = relationship(back_populates="supply_items")

    supply_id: Mapped[UUID] = mapped_column(
        ForeignKey("supplies.id", ondelete="CASCADE")
    )
    supply: Mapped["SupplyModel"] = relationship(back_populates="products")

    quantity: Mapped[int]

    def __repr__(self):
        return f"<SupplyItem id={self.id}>"


class SupplyModel(Base):
    __tablename__ = "supplies"

    id: Mapped[uuid]

    products: Mapped[List["SupplyItemModel"]] = relationship(
        back_populates="supply", cascade="all, delete-orphan"
    )

    created_at: Mapped[createdAt]
    
    action_type: Mapped[TypeEnum] = mapped_column(
        PgEnum(TypeEnum, name="type_enum", create_type=False),
        nullable=False,
        default=TypeEnum.SUPPLY,
    )
    

    def __repr__(self):
        return f"<Supply id={self.id} date={self.created_at}>"
