from pydantic import BaseModel, EmailStr
from datetime import datetime

class UserCreate(BaseModel):
    user_name: str
    user_email: EmailStr
    password: str

class UserOut(BaseModel):
    user_id: int
    user_name: str
    user_email: EmailStr
    created_on: datetime

class UserLogin(BaseModel):
    user_email: EmailStr
    password:   str