from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase

from src.config import settings


class Base(DeclarativeBase):
    pass


engine = create_async_engine(
    url=settings.DB_URL, echo=(False if settings.MODE == "PROD" else True)
)

session_factory = async_sessionmaker(engine, expire_on_commit=False)
