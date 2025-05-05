from fastapi import APIRouter, HTTPException
from schemas.user import UserCreate, UserOut, UserLogin
from models.user import create_user, authenticate_user
from db import db

router = APIRouter()

@router.post("/signup", response_model=UserOut)
async def signup(user: UserCreate):
    if await db.users.find_one({"user_email": user.user_email}):
        raise HTTPException(status_code=400, detail="Email already exists")
    return await create_user(user)

@router.post("/signin", response_model=UserOut)
async def signin(user: UserLogin):
    u = await authenticate_user(user.user_email, user.password)
    if not u:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return u