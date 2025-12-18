from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.config import settings

from src.routers import (
    products_router,
    auth_router,
    user_router,
    actions_router,
    ingredients_router,
    notifications_router,
    history_router,
    stats_router,
)


app = FastAPI(
    title="StatSklad",
    description="Coursework for 1st year students of PetrSU Physical-Technical Institute",
    version="0.0.1",
)

origins = [settings.FRONTEND_URL]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products_router)
app.include_router(auth_router)
app.include_router(user_router)
app.include_router(actions_router)
app.include_router(ingredients_router)
app.include_router(notifications_router)
app.include_router(history_router)
app.include_router(stats_router)
