from fastapi import APIRouter, Depends, status, HTTPException, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession

from ..schemas import CreateSupply, TakeIngridient
from ..repositories import ActionsCRUD
from ..db import get_db
from ..middlewares import check_token, off_product, add_product

ADD = "add"
OFF = "write-off"

router = APIRouter(prefix="/actions", tags=["Actions"])

@router.post("/supply")
async def create_supply(supply_data: CreateSupply, background_tasks: BackgroundTasks, db: AsyncSession = Depends(get_db), user_id: str = Depends(check_token)):
    background_tasks.add_task(add_product, supply_data)
    crud = ActionsCRUD(db)
    await crud.create_supply(supply_data, ADD)
    return status.HTTP_200_OK

@router.post("/write-off")
async def del_suply(supply_data: CreateSupply, background_tasks: BackgroundTasks, db: AsyncSession = Depends(get_db), user_id: str = Depends(check_token)):
    background_tasks.add_task(off_product, supply_data)
    crud = ActionsCRUD(db)
    await crud.create_supply(supply_data, OFF)
    return status.HTTP_200_OK

@router.post("/taken")
async def take_to_meal(ingridient_to_meal: TakeIngridient, db: AsyncSession = Depends(get_db), user_id: str = Depends(check_token)):
    pass