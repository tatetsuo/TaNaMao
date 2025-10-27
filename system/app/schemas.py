# app/schemas.py

from enum import Enum
from pydantic import BaseModel
from typing import Optional    

class UserBase(BaseModel):
    name: str
    email: str
    password: str
    
class UserCreate(UserBase):
    ...
    
class UserUpdate(UserBase):
    name: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None
    
    