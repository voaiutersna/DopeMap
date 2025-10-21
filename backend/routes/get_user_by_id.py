from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..deps.dependencies import get_db, get_current_user
from ..models import User

router = APIRouter(tags=["User"])

@router.get("/users/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
