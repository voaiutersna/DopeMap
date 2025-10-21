from fastapi import APIRouter, Depends
from ..deps.dependencies import get_current_user
from ..models import User

router = APIRouter(tags=["Auth"])

@router.get("/protected")
async def protected_route(current_user: User = Depends(get_current_user)):
    return {
        "message": f"Hello {current_user.name}! This is a protected route.",
        "user_email": current_user.email,
    }
