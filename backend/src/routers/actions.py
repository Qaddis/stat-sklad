from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from ..schemas import CreateSupply, TakeIngridient
from ..repositories import ActionsCRUD
from ..db import get_db
from ..middlewares import check_token

ADD = "add"
OFF = "write-off"

router = APIRouter(prefix="/actions", tags=["Actions"])

@router.post("/supply")
async def create_supply(supply_data: CreateSupply, db: AsyncSession = Depends(get_db), user_id: str = Depends(check_token)):
    crud = ActionsCRUD(db)
    await crud.create_supply(supply_data, ADD)
    return status.HTTP_200_OK

@router.post("/write-off")
async def del_suply(supply_data: CreateSupply, db: AsyncSession = Depends(get_db), user_id: str = Depends(check_token)):
    crud = ActionsCRUD(db)
    await crud.create_supply(supply_data, OFF)
    return status.HTTP_200_OK

@router.post("/taken")
async def take_to_meal(ingridient_to_meal: TakeIngridient, db: AsyncSession = Depends(get_db), user_id: str = Depends(check_token)):
    pass