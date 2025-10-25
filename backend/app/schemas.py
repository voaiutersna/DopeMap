from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Any, Dict, Generic, TypeVar, Union, Optional
from pydantic import BaseModel, EmailStr
from sqlalchemy import create_engine, text, Column, Integer, String, Float, DateTime
from sqlalchemy.orm import sessionmaker, Session, declarative_base
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime, timedelta
import bcrypt
from jose import jwt, JWTError
from fastapi.middleware.cors import CORSMiddleware
from uuid import UUID

# Pydantic models

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: UUID
    name: str
    email: str
    created_at: datetime
    
    model_config = {
        "from_attributes": True
    }


class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse
    
T = TypeVar("T")  # Dynamic type placeholder

class APIResponse(BaseModel, Generic[T]):
    success: bool
    data: Optional[T] = None
    error: Optional[str] = None


class TaskStatus(BaseModel):
    isdone: bool = False
    isStar: bool = False

# ใช้ทุกอัน
class RoadmapHistoryBase(BaseModel):
    roadmap_id: UUID
    task_history: Dict[str, Dict[str, TaskStatus]] = {}

# ไว้สร้าง
class RoadmapHistoryCreate(RoadmapHistoryBase):
    pass

# ไว้ ีupdate
class RoadmapHistoryUpdate(BaseModel):
    task_history: Dict[str, Dict[str, TaskStatus]]

# ไว้ return
class RoadmapHistoryOut(RoadmapHistoryBase):
    id: UUID
    user_id: UUID
    enrolled_at: datetime
    roadmap_title: str = ""
    roadmap_description: str = ""

    model_config = {
        "from_attributes": True
    }


class RoadmapBase(BaseModel):
    title: str
    description: Optional[str] = None
    roadmap_data: Optional[Any] = None
    is_public: Optional[bool] = False


class RoadmapCreate(RoadmapBase):
    pass


class RoadmapUpdate(RoadmapBase):
    pass


class RoadmapResponse(RoadmapBase):
    id: UUID
    owner_id: UUID
    created_at: datetime

    class Config:
        from_attributes = True
