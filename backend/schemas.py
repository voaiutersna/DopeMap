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

# Pydantic models

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse
    
T = TypeVar("T")  # Dynamic type placeholder

class APIResponse(BaseModel, Generic[T]):
    success: bool
    data: Optional[T] = None
    error: Optional[str] = None

