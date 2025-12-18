from ..schemas import Notification, Notification_list, NotificationAnswer, NotificationAnswer_list
from ..models import NotificationModel, ProductModel

from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
from sqlalchemy.orm import joinedload
from sqlalchemy import select, insert, delete, update

class NotificationCRUD:
    def __init__(self, db: AsyncSession):
        self.db = db
    
    async def save_notification(self, data: Notification, product_id: str):
        data = data.model_dump()
        data["product_id"] = product_id
        stmt = insert(NotificationModel).values(data)
        await self.db.execute(stmt)
        
        
    async def get_product(self, ingredient_id: str) -> Optional[ProductModel]:
        stmt = select(ProductModel).options(
            joinedload(ProductModel.ingredient)).where(ProductModel.ingredient_id == ingredient_id)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()
    
    async def del_notification(self, product_id: str):
        stmt = delete(NotificationModel).where(NotificationModel.product_id == product_id)
        await self.db.execute(stmt)
        
    async def del_notification_id(self, notif_id: str):
        stmt = delete(NotificationModel).where(NotificationModel.id == notif_id)
        await self.db.execute(stmt)
        
    async def edit_notification(self, description: str, product_id: str):
            stmt = update(NotificationModel).where(NotificationModel.product_id == product_id).values(description=description)
            await self.db.execute(stmt)
        
    async def get_notification(self, product_id: str):
        stmt = select(NotificationModel).where(NotificationModel.product_id == product_id)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()
    
    async def get_all_notifications(self):
        stmt = select(NotificationModel)
        result = await self.db.execute(stmt)
        notifs = result.all()
        all_notifications = []
        for item in notifs:
            item = item._asdict()
            item = item["NotificationModel"]
            answer = NotificationAnswer(id=item.id,
            title=item.title,
  	        description=item.description,
  	        created_at=item.created_at)
            all_notifications.append(answer)
        all_notifications = NotificationAnswer_list(content=all_notifications)
        return all_notifications