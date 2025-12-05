from pydantic import BaseModel, EmailStr

from ..models import users

class BaseUser(BaseModel):
    email: EmailStr
    first_name: str
    second_name: str
    
    
class RegisterUser(BaseUser):
    password: str
    
class AuthUser(BaseModel):
    email: EmailStr
    password: str
    
class TokenInfo(BaseModel):
    user_id: str
    access_token: str
    refresh_token: str | None = None
    token_type: str = "Bearer"