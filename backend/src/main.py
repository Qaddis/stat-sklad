from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.config import settings

app = FastAPI(
    title="StatSklad",
    description="Coursework for 1st year students of PetrSU Physical-Technical Institute",
    version="0.0.1",
)

origins = [settings.FRONTEND_URL]

app.middleware(
    CORSMiddleware(
        app,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
)


@app.get("/")
async def root():
    return {"message": "Hello world!"}
