from typing import Annotated
from datetime import datetime, timezone
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
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    ),
]

updatedAt = Annotated[
    datetime,
    mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    ),
]
