from pydantic import BaseModel, EmailStr

from ..models import users

class BaseUser(BaseModel):
    email: EmailStr
    first_name: str
    second_name: str
    role: users.RolesEnum
    
    
class RegisterUser(BaseUser):
    password: str