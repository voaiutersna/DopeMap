from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session
from ..deps.dependencies import get_db

router = APIRouter(tags=["Health"])

@router.get("/ping-db")
def ping_db(db: Session = Depends(get_db)):
    try:
        db.execute(text("SELECT 1"))
        return {"status": "ok", "message": "✅ Database connected successfully"}
    except Exception as e:
        return {"status": "error", "message": f"❌ Connection failed: {str(e)}"}
