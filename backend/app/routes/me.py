from fastapi import APIRouter, Depends
from app.deps.dependencies import get_current_user
from app.schemas import APIResponse, UserResponse
from app.models import User

router = APIRouter(tags=["Auth"])

@router.get("/me", response_model=APIResponse)
async def get_me(current_user: User = Depends(get_current_user)):
    return APIResponse[UserResponse](
        success=True,
        data=UserResponse(
            id=current_user.id,
            name=current_user.name,
            email=current_user.email,
            created_at=current_user.created_at,
        ),
    )
