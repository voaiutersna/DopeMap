import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.deps.dependencies import get_db, get_current_user
from app.models import Roadmap, RoadmapHistory, User
from app.schemas import (
    RoadmapCreate,
    RoadmapUpdate,
    RoadmapResponse,
    APIResponse,
)

router = APIRouter(prefix="/roadmaps", tags=["Roadmaps"])


@router.post("/", response_model=APIResponse[RoadmapResponse], status_code=status.HTTP_201_CREATED)
def create_roadmap(
    payload: RoadmapCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    new_rm = Roadmap(
        owner_id=current_user.id,
        title=payload.title,
        description=payload.description,
        roadmap_data=payload.roadmap_data,
        is_public=payload.is_public or False,
    )

    db.add(new_rm)
    db.commit()
    db.refresh(new_rm)

    return APIResponse(success=True, data=new_rm)


@router.get("/", response_model=APIResponse[list[RoadmapResponse]], status_code=status.HTTP_200_OK)
def get_my_roadmaps(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    roadmaps = (
        db.query(Roadmap)
        .filter(Roadmap.owner_id == current_user.id)
        .all()
    )
    return APIResponse(success=True, data=roadmaps)

@router.get("/public", response_model=APIResponse[list[RoadmapResponse]], status_code=status.HTTP_200_OK)
def get_public_roadmaps(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    roadmaps = db.query(Roadmap).filter(Roadmap.is_public == True).all()

    return APIResponse(success=True, data=roadmaps)

@router.get("/{roadmap_id}", response_model=APIResponse[RoadmapResponse], status_code=status.HTTP_200_OK)
def get_roadmap(
    roadmap_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    roadmap = db.query(Roadmap).filter(Roadmap.id == roadmap_id).first()
    if not roadmap:
        raise HTTPException(status_code=404, detail="Roadmap not found")

    if roadmap.owner_id == current_user.id:
        return APIResponse(success=True, data=RoadmapResponse.from_orm(roadmap))

    history = (
        db.query(RoadmapHistory)
        .filter(
            RoadmapHistory.roadmap_id == roadmap_id,
            RoadmapHistory.user_id == current_user.id
        )
        .first()
    )

    if not history:
        raise HTTPException(status_code=403, detail="You do not have access to this roadmap")

    return APIResponse(success=True, data=RoadmapResponse.from_orm(roadmap))



@router.put("/{roadmap_id}", response_model=APIResponse[RoadmapResponse], status_code=status.HTTP_200_OK)
def update_roadmap(
    roadmap_id: uuid.UUID,
    payload: RoadmapUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    rm = (
        db.query(Roadmap)
        .filter(
            Roadmap.id == roadmap_id,
            Roadmap.owner_id == current_user.id
        )
        .first()
    )

    if not rm:
        return APIResponse(success=False, error="Roadmap not found")

    rm.title = payload.title
    rm.description = payload.description
    if payload.roadmap_data:
        rm.roadmap_data = payload.roadmap_data
    rm.is_public = payload.is_public

    db.commit()
    db.refresh(rm)

    return APIResponse(success=True, data=rm)


@router.delete("/{roadmap_id}", response_model=APIResponse[None], status_code=status.HTTP_200_OK)
def delete_roadmap(
    roadmap_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    rm = (
        db.query(Roadmap)
        .filter(
            Roadmap.id == roadmap_id,
            Roadmap.owner_id == current_user.id
        )
        .first()
    )

    if not rm:
        return APIResponse(success=False, error="Roadmap not found")

    db.delete(rm)
    db.commit()
    return APIResponse(success=True, data=None)
