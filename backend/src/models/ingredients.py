from __future__ import annotations

from typing import List
from enum import Enum as PyEnum

from sqlalchemy import Table, Column, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import ENUM as PgEnum

from src.db import Base
from src.models.defaults import uuid, createdAt


ingredients_to_meals = Table(
    "ingredients_to_meals",
    Base.metadata,
    Column(
        "ingredient_id",
        ForeignKey("ingredients.id", ondelete="CASCADE"),
        primary_key=True,
    ),
    Column("meal_id", ForeignKey("meals.id", ondelete="CASCADE"), primary_key=True),
)


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

    meals: Mapped[List["MealModel"]] = relationship(
        secondary=ingredients_to_meals, back_populates="ingredients", lazy="selectin"
    )

    created_at: Mapped[createdAt] # Добавляем дату создания, как и вместе с products

    def __repr__(self):
        return f"<Ingredient id={self.id} name={self.name}>"


class MealModel(Base):
    __tablename__ = "meals"

    id: Mapped[uuid]

    name: Mapped[str]
    photo: Mapped[str]
    cost: Mapped[float]

    ingredients: Mapped[List["IngredientModel"]] = relationship(
        secondary=ingredients_to_meals, back_populates="meals", lazy="selectin"
    )

    def __repr__(self):
        return f"<Meal id={self.id} name={self.name}> cost={self.cost}"
