from datetime import datetime
from schemas.user import UserCreate
from db import db

async def create_user(data: UserCreate):
    # Auto-increment integer user_id
    last = await db.users.find_one(sort=[("user_id", -1)])
    next_id = (last["user_id"] + 1) if last else 1
    user = {
        "user_id": next_id,
        "user_name": data.user_name,
        "user_email": data.user_email,
        "password": data.password,  # plain-text (not secure)
        "created_on": datetime.utcnow(),
        "last_update": datetime.utcnow()
    }
    await db.users.insert_one(user)
    # Remove password before returning
    user.pop("password")
    return user

async def authenticate_user(email: str, password: str):
    user = await db.users.find_one({"user_email": email})
    if not user or user.get("password") != password:
        return None
    user.pop("password")
    return user