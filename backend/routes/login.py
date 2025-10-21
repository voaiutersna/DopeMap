from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..deps.dependencies import get_db, get_user_by_email
from ..utils.password_tools import verify_password
from ..utils.jwt_tools import create_access_token
from ..settings import ACCESS_TOKEN_EXPIRE_MINUTES
from ..schemas import UserLogin

router = APIRouter(tags=["Auth"])

@router.post("/login")
def login(user_credentials: UserLogin, db: Session = Depends(get_db)):
    user = get_user_by_email(db, email=user_credentials.email)
    if not user or not verify_password(user_credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = create_access_token(
        data={"sub": user.email},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
    )
    return {"access_token": token, "token_type": "bearer", "user": user}
