# backend/backend/settings.py
SECRET_KEY = "your-secret-key-change-this-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
CORS_ORIGINS = ["http://localhost:3000", "http://127.0.0.1:3000"]
