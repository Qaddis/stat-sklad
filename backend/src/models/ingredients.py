from __future__ import annotations

from typing import List
from enum import Enum as PyEnum

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import ENUM as PgEnum

from src.db import Base
from src.models.defaults import uuid


class UnitsEnum(PyEnum):
    PIECES = "PIECES"
    KILOGRAMS = "KILOGRAMS"


class IngredientModel(Base):
    __tablename__ = "ingredients"

    id: Mapped[uuid]

    name: Mapped[str]

    units: Mapped[UnitsEnum] = mapped_column(
        PgEnum(UnitsEnum, name="units_enum", create_type=False),
        nullable=False,
        default=UnitsEnum.PIECES,
    )

    supply_items: Mapped[List["SupplyItemModel"]] = relationship(
        back_populates="product", cascade="all, delete-orphan"
    )

    product: Mapped["ProductModel"] = relationship(
        back_populates="ingredient", cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Ingredient id={self.id} name={self.name}>"
