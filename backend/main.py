from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Generic, TypeVar, Union, Optional
from pydantic import BaseModel, EmailStr
from sqlalchemy import create_engine, text, Column, Integer, String, Float, DateTime
from sqlalchemy.orm import sessionmaker, Session, declarative_base
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime, timedelta
import bcrypt
from jose import jwt, JWTError
from fastapi.middleware.cors import CORSMiddleware


from .database import SessionLocal, engine, Base, Session
from .schemas import UserLogin, UserRegister, UserResponse, APIResponse, Token
from .models import User

# import routers
from .routes.root import router as root_router
from .routes.ping_db import router as ping_router
from .routes.register import router as register_router
from .routes.login import router as login_router
from .routes.me import router as me_router
from .routes.protected import router as protected_router
from .routes.get_users import router as users_router
from .routes.get_user_by_id import router as user_router


# JWT Configuration
SECRET_KEY = "your-secret-key-change-this-in-production"  # ⚠️ เปลี่ยนใน production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Security
security = HTTPBearer()

# สร้างตารางในฐานข้อมูล
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["Authorization", "Content-Type", "*"],
)

# รวม routers ทั้งหมด
app.include_router(root_router)
app.include_router(ping_router)
app.include_router(register_router)
app.include_router(login_router)
app.include_router(me_router)
app.include_router(protected_router)
app.include_router(users_router)
app.include_router(user_router)