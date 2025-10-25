from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Generic, TypeVar, Union, Optional
from pydantic import BaseModel, EmailStr
from sqlalchemy import create_engine, text, Column, Integer, String, Float, DateTime,ForeignKey, JSON,Boolean
from sqlalchemy.orm import sessionmaker, Session, declarative_base, relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime, timedelta
import bcrypt
from jose import jwt, JWTError
from fastapi.middleware.cors import CORSMiddleware
from .database import SessionLocal, engine, Base, Session

# ORM class
class User(Base):
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)


    roadmaps = relationship("Roadmap", back_populates="owner", cascade="all, delete-orphan")
    roadmap_histories = relationship("RoadmapHistory", back_populates="user", cascade="all, delete-orphan")

class Roadmap(Base):
    __tablename__ = "roadmaps"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, index=True)
    owner_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    roadmap_data = Column(JSON, nullable=True)
    is_public = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="roadmaps")
    histories = relationship("RoadmapHistory", back_populates="roadmap", cascade="all, delete-orphan")


class RoadmapHistory(Base):
    __tablename__ = "roadmaps_history"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, index=True)
    roadmap_id = Column(UUID(as_uuid=True), ForeignKey("roadmaps.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    enrolled_at = Column(DateTime, default=datetime.utcnow)
    task_history = Column(JSON, nullable=True)

    roadmap = relationship("Roadmap", back_populates="histories")
    user = relationship("User", back_populates="roadmap_histories")