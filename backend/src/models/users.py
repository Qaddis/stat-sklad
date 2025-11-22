from enum import Enum as PyEnum

from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import ENUM as PgEnum

from src.db import Base
from src.models.defaults import uuid, createdAt, updatedAt


class RolesEnum(PyEnum):
    ADMIN = "ADMIN"
    BOOKER = "BOOKER"
    COOK = "COOK"
    WAITER = "WAITER"
    CLIENT = "CLIENT"


class UserModel(Base):
    __tablename__ = "users"

    id: Mapped[uuid]

    first_name: Mapped[str]
    second_name: Mapped[str]

    email: Mapped[str]
    password: Mapped[str]

    role: Mapped[RolesEnum] = mapped_column(
        PgEnum(RolesEnum, name="roles_enum", create_type=False),
        nullable=False,
        default=RolesEnum.BOOKER,
    )

    created_at: Mapped[createdAt]
    updated_at: Mapped[updatedAt]
