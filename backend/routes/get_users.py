from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..deps.dependencies import get_db, get_current_user
from ..models import User

router = APIRouter(tags=["User"])

@router.get("/users")
def get_all_users(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    users = db.query(User).all()
    return {"users": users}
