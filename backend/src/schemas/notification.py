from pydantic import BaseModel
from typing import List
from datetime import datetime
from uuid import UUID


class Notification(BaseModel):
    title: str
    description: str


class Notification_list(BaseModel):
    content: List[Notification]


class NotificationAnswer(BaseModel):
    id: UUID
    title: str
    description: str
    created_at: datetime


class NotificationAnswer_list(BaseModel):
    content: List[NotificationAnswer]
