import os
from datetime import datetime, timedelta

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
from jose import jwt

from app.database import Base, engine
from app.routes.root import router as root_router
from app.routes.ping_db import router as ping_router
from app.routes.register import router as register_router
from app.routes.login import router as login_router
from app.routes.me import router as me_router
from app.routes.protected import router as protected_router
from app.routes.get_users import router as users_router
from app.routes.get_user_by_id import router as user_router
from app.routes.history import router as history_router
from app.config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES, CORS_ORIGINS

security = HTTPBearer()


app = FastAPI()

CORS_ORIGINS = os.getenv("CORS_ORIGINS", "").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(root_router)
app.include_router(ping_router)
app.include_router(register_router)
app.include_router(login_router)
app.include_router(me_router)
app.include_router(protected_router)
app.include_router(users_router)
app.include_router(user_router)
app.include_router(history_router)