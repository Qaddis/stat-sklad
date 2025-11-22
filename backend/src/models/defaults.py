from typing import Annotated
from datetime import datetime, UTC
from uuid import UUID as PyUUID

from sqlalchemy import text, DateTime
from sqlalchemy.orm import mapped_column
from sqlalchemy.dialects.postgresql import UUID as PgUUID


uuid = Annotated[
    PyUUID,
    mapped_column(
        PgUUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()")
    ),
]

createdAt = Annotated[
    datetime,
    mapped_column(
        DateTime, server_default=text("TIMEZONE('utc', now())"), nullable=False
    ),
]

updatedAt = Annotated[
    datetime,
    mapped_column(
        DateTime,
        server_default=text("TIMEZONE('utc', now())"),
        onupdate=datetime.now(UTC),
    ),
]
