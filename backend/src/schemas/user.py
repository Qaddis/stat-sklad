from pydantic import BaseModel, EmailStr

class GetUser(BaseModel):
    user_id: str
    first_name: str
    second_name: str
    email: EmailStr