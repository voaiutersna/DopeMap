from fastapi import APIRouter

router = APIRouter(tags=["General"])

@router.get("/")
def read_root():
    return {
        "message": "FastAPI Auth System",
        "endpoints": {
            "register": "POST /register",
            "login": "POST /login",
            "me": "GET /me (requires auth)",
            "protected": "GET /protected (requires auth)",
            "users": "GET /users (requires auth)",
        },
    }
