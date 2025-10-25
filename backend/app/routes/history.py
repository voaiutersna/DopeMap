from typing import Optional
from uuid import UUID
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session,joinedload

from app.schemas import APIResponse, RoadmapHistoryOut, RoadmapHistoryCreate
from app.models import RoadmapHistory, User
from app.deps.dependencies import get_db, get_current_user

router = APIRouter(prefix="/history", tags=["Roadmap History"])


@router.post("/", response_model=APIResponse[RoadmapHistoryOut])
async def create_history(
    payload: RoadmapHistoryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Map schema to SQLAlchemy model
    new_history = RoadmapHistory(
        roadmap_id=payload.roadmap_id,
        user_id=current_user.id,
        task_history=payload.task_history or {},
        enrolled_at=datetime.utcnow()
    )
    db.add(new_history)
    db.commit()
    db.refresh(new_history)

    # Map model to schema for response
    history_out = RoadmapHistoryOut.from_orm(new_history)
    return APIResponse(success=True, data=history_out)


@router.get("/", response_model=APIResponse[list[RoadmapHistoryOut]])
async def get_all_histories(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    histories = db.query(RoadmapHistory)\
        .options(joinedload(RoadmapHistory.roadmap))\
        .filter(RoadmapHistory.user_id == current_user.id)\
        .all()

    # Include roadmap title/description in output
    histories_out = []
    for h in histories:
        h_out = RoadmapHistoryOut.from_orm(h)
        h_out.roadmap_title = h.roadmap.title
        h_out.roadmap_description = h.roadmap.description
        histories_out.append(h_out)

    return APIResponse(success=True, data=histories_out)


@router.get("/{history_id}", response_model=APIResponse[RoadmapHistoryOut])
async def get_history(
    history_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    history = db.query(RoadmapHistory)\
        .options(joinedload(RoadmapHistory.roadmap))\
        .filter(
            RoadmapHistory.id == history_id,
            RoadmapHistory.user_id == current_user.id
        ).first()

    if not history:
        raise HTTPException(status_code=404, detail="History not found")

    history_out = RoadmapHistoryOut.from_orm(history)
    history_out.roadmap_title = history.roadmap.title
    history_out.roadmap_description = history.roadmap.description
    return APIResponse(success=True, data=history_out)


@router.put("/{history_id}", response_model=APIResponse[RoadmapHistoryOut])
async def update_history(
    history_id: UUID,
    payload: RoadmapHistoryCreate,  # Could also use a RoadmapHistoryUpdate schema
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    history = db.query(RoadmapHistory).filter(
        RoadmapHistory.id == history_id,
        RoadmapHistory.user_id == current_user.id
    ).first()

    if not history:
        raise HTTPException(status_code=404, detail="History not found")

    # Map schema to model
    history.task_history = payload.task_history or history.task_history
    db.commit()
    db.refresh(history)

    history_out = RoadmapHistoryOut.from_orm(history)
    return APIResponse(success=True, data=history_out)


@router.delete("/{history_id}", response_model=APIResponse[None])
async def delete_history(
    history_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    history = db.query(RoadmapHistory).filter(
        RoadmapHistory.id == history_id,
        RoadmapHistory.user_id == current_user.id
    ).first()

    if not history:
        raise HTTPException(status_code=404, detail="History not found")

    db.delete(history)
    db.commit()
    return APIResponse(success=True, data=None)
