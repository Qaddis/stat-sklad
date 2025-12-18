from sqlalchemy.ext.asyncio import AsyncSession

from ..schemas import CreateSupply, Notification, Notification_list
from ..models import UnitsEnum, NotificationModel
from ..db import session_factory
from ..repositories import ActionsCRUD, NotificationCRUD

KILOGRAM_LIMIT = 30
PIECES_LIMIT = 12

async def off_product(supply: CreateSupply):
    async with session_factory() as db:
    
        not_crud = NotificationCRUD(db)
        supply = supply.model_dump()
        supply = supply["suply_content"]
        all_notifications = []
        for item in supply:
            existed_product = await not_crud.get_product(item["ingredient_id"])
            notification_obj = None

            if existed_product.ingredient.units == UnitsEnum.KILOGRAMS:
                if existed_product.quantity - item["quantity"] < KILOGRAM_LIMIT:
                    notification_obj = Notification(title=existed_product.ingredient.id,
                    description=f"Внимание! На складе осталось всего {existed_product.quantity - item["quantity"]} кг. товара {existed_product.ingredient.name}")

            else:
                if existed_product.quantity - item["quantity"] < PIECES_LIMIT:
                    notification_obj = Notification(title=existed_product.ingredient.name,
                    description=f"Внимание! На складе осталось всего {existed_product.quantity - item["quantity"]} шт. товара {existed_product.ingredient.name}")
            if notification_obj:
                all_notifications.append(notification_obj)
        
        if all_notifications != []:
            for notification in all_notifications:
                print(notification)
                await not_crud.save_notification(notification, item["ingredient_id"])
            await db.commit()