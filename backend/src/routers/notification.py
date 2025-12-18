from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from ..repositories import NotificationCRUD
from ..db import get_db
from ..middlewares import check_token

router = APIRouter(prefix="/notifications", tags=["Notification"])

@router.get("/")
async def get_notifications(db: AsyncSession = Depends(get_db), user_id: str = Depends(check_token)):
    crud = NotificationCRUD(db)
    notifs = await crud.get_all_notifications()
    return notifs