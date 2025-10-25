from sqlalchemy import Column, String, DateTime, Boolean, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    roadmaps = relationship(
        "Roadmap",
        back_populates="owner",
        cascade="all, delete-orphan"
    )

    roadmap_histories = relationship(
        "RoadmapHistory",
        back_populates="user",
        cascade="all, delete-orphan"
    )


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

    histories = relationship(
        "RoadmapHistory",
        back_populates="roadmap",
        cascade="all, delete-orphan"
    )

class RoadmapHistory(Base):
    __tablename__ = "roadmaps_history"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, index=True)
    roadmap_id = Column(UUID(as_uuid=True), ForeignKey("roadmaps.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    enrolled_at = Column(DateTime, default=datetime.utcnow)
    task_history = Column(JSON, nullable=True)

    roadmap = relationship("Roadmap", back_populates="histories")
    user = relationship("User", back_populates="roadmap_histories")
