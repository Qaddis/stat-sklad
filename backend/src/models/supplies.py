from typing import List
from uuid import UUID

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.db import Base
from src.models.defaults import uuid, createdAt
from src.models import IngredientModel


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

    def __repr__(self):
        return f"<Supply id={self.id} date={self.created_at}>"
