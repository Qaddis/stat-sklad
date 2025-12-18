from uuid import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey

from src.db import Base
from src.models.defaults import uuid, createdAt
from src.models import ProductModel

class NotificationModel(Base):
    __tablename__ = "notifications"
    
    id: Mapped[uuid]
    
    title: Mapped[str]
    
    description: Mapped[str]
    
    product_id: Mapped[UUID] = mapped_column(
        ForeignKey("products.ingredient_id", ondelete="CASCADE"))
    
    product: Mapped["ProductModel"] = relationship(back_populates="notification")
    
    created_at: Mapped[createdAt]
    
    def __repr__(self):
        return f"<Notification id={self.id} description={self.description}>"