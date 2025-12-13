from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from ..schemas import CreateSupply
from ..repositories import ActionsCRUD
from ..db import get_db
from ..middlewares import check_token

router = APIRouter(prefix="/actions", tags=["Actions"])

@router.post("/supply")
async def create_supply(supply_data: CreateSupply, db: AsyncSession = Depends(get_db), user_id: str = Depends(check_token)):
    crud = ActionsCRUD(db)
    await crud.create_supply(supply_data)
    return status.HTTP_200_OK