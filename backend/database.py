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



# Step1 : Create a SQLAlchemy engine
DATABASE_URL = 'postgresql://neondb_owner:npg_3heOIs0NPLum@ep-super-smoke-a1v9ddnw-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require'

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


# Dependency function
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
