from uuid import UUID

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.db import Base
from src.models.defaults import uuid
from src.models import IngredientModel


class ProductModel(Base):
    __tablename__ = "products"

    ingredient_id: Mapped[UUID] = mapped_column(
        ForeignKey("ingredients.id", ondelete="CASCADE"), primary_key=True
    )
    ingredient: Mapped["IngredientModel"] = relationship(back_populates="product")

    quantity: Mapped[int]

    def __repr__(self):
        return f"<Product id={self.ingredient_id} quantity={self.quantity}>"
