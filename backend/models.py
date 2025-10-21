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

# ORM class
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)