from pydantic import BaseModel
from typing import List
from uuid import UUID

class Notification(BaseModel):
  	title: str
  	description: str
   
class Notification_list(BaseModel):
    content: List[Notification]