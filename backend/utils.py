from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jwt import PyJWTError, decode
from models import user as user_model

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/signin")

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = decode(token, user_model.SECRET_KEY, algorithms=[user_model.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return email
    except PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
