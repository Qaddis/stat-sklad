from pydantic import BaseModel, EmailStr

class GetUser(BaseModel):
    user_id: str
    first_name: str
    second_name: str
    email: EmailStr
    
class PatchUser(BaseModel):
    first_name: str | None = None
    second_name: str | None = None
    password: str | None = None