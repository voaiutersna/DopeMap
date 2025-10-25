from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.deps.dependencies import get_db, get_user_by_email
from app.utils.password_tools import get_password_hash
from app.utils.jwt_tools import create_access_token
from app.config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES, CORS_ORIGINS
from app.models import User
from app.schemas import UserRegister, APIResponse, Token

router = APIRouter(tags=["Auth"])

@router.post("/register", response_model=APIResponse, status_code=status.HTTP_201_CREATED)
def register(user_data: UserRegister, db: Session = Depends(get_db)):
    if get_user_by_email(db, email=user_data.email):
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed = get_password_hash(user_data.password)
    db_user = User(name=user_data.name, email=user_data.email, hashed_password=hashed)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    access_token = create_access_token(
        data={"sub": db_user.email},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
    )

    return APIResponse[Token](
        success=True,
        data=Token(access_token=access_token, token_type="bearer", user=db_user),
    )
