from fastapi import APIRouter, Depends, HTTPException, status

from sqlalchemy.ext.asyncio import AsyncSession

from ..middlewares import check_token
from ..db import get_db
from ..repositories import HistoryCRUD
from ..schemas import PaginatedOperations

router = APIRouter(prefix="/actions/history", tags=["Actions", "History"])


@router.get("/")
async def get_history(
    page: int = 0,
    size: int = 25,
    date_from: str = "",
    date_to: str = "",
    db: AsyncSession = Depends(get_db),
    user_id: str = Depends(check_token),
) -> PaginatedOperations:
    crud = HistoryCRUD(db)

    if size > 50:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="page size too large"
        )

    return await crud.get_all_operations(page, size, date_from, date_to)


@router.get("/last")
async def get_latest(
    db: AsyncSession = Depends(get_db),
    user_id: str = Depends(check_token),
):
    pass


@router.get("/{action_id}")
async def get_action_details(
    action_id: str,
    db: AsyncSession = Depends(get_db),
    user_id: str = Depends(check_token),
):
    pass
