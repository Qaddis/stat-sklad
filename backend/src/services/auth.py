import jwt
import bcrypt

from datetime import datetime, timedelta

from ..models import users
from ..config import settings

def encode_jwt(
    payload : dict,
    private_key : str = settings.auth_jwt.private_key_path.read_text(),
    algorithm : str = settings.auth_jwt.algorihm,
    expire_minutes: int = settings.auth_jwt.access_token_expire_minutes,
    expire_timedelta: timedelta | None = None,
):
    to_encode = payload.copy()
    now = datetime.utcnow()
    to_encode.update(iat=now)
    if expire_timedelta:
        expire = now + expire_timedelta
    else:
        expire = now + timedelta(minutes=expire_minutes)
    to_encode.update(exp=expire)
    
    encoded = jwt.encode(to_encode, private_key, algorithm=algorithm)
    return encoded

def decode_jwt(
    payload : str | bytes,
    public_key : str = settings.auth_jwt.public_key_path.read_text(),
    algorithm : str = settings.auth_jwt.algorihm 
):
    decoded = jwt.encode(token, public_key, algorithm=algorithm)
    return decoded

def get_hash_password(password: str) -> bytes:
    bytes = password.encode('utf-8')
    hashed = bcrypt.hashpw(bytes, bcrypt.gensalt())
    return hashed.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    password_bytes = plain_password.encode('utf-8')
    hashed_password_bytes = hashed_password.encode('utf-8')
    is_verufy = bcrypt.checkpw(password_bytes, hashed_password_bytes)
    return is_verufy

