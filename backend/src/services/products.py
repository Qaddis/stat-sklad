from typing import List, Dict, Any, Optional
from sqlalchemy.ext.asyncio import AsyncSession

from src.repositories.products import ProductsCRUD

async def get_products_service(  # Сервисный слой для получения продуктов
    db: AsyncSession,
    page: int = 1,
    size: int = 10,
    q: Optional[str] = None,
    sorted_by_alphabet: bool = False
) -> List[Dict[str, Any]]:
    
    crud = ProductsCRUD(db)
    return await crud.get_all_products(
        page=page,
        size=size,
        q=q,
        sorted_by_alphabet=sorted_by_alphabet
    )