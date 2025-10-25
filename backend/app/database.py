from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Generic, TypeVar, Union, Optional
from pydantic import BaseModel, EmailStr
from sqlalchemy import create_engine, text, Column, Integer, String, Float, DateTime
from sqlalchemy.orm import sessionmaker, Session, declarative_base
from datetime import datetime, timedelta
import bcrypt
from jose import jwt, JWTError
from fastapi.middleware.cors import CORSMiddleware
from app.config import DATABASE_URL



engine = create_engine(
    DATABASE_URL,
    connect_args={
        "sslmode": "require",
    },
    pool_pre_ping=True,
    pool_size=5,
    max_overflow=10,
    echo=False
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
Base.metadata.create_all(bind=engine)
