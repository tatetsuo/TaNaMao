from fastapi import FastAPI, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from system.app import database, schemas
from typing import List
from system.app import models
from passlib.context import CryptContext
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

app = FastAPI()

users = []

@app.get("/")
async def root():
    return {"message": "API do Sistema Tá na Mão"}

@app.post("/users/")
def create_user(user:schemas.UserCreate):
    user_id = len(users)
    user_dict = user.model_dump()
    user_dict['id'] = user_id
    users.append(user_dict)
    return {"message": "User created successfully", "user": user_dict}

@app.get("/users/")
def read_users():
    return users

@app.get("/users/{user_id}")
def read_user(user_id: int):
    if user_id >= len(users) or user_id < 0:
        raise HTTPException(status_code=404, detail="User not found")
    return users[user_id]

@app.put("/users/{user_id}")
def update_user(user_id: int, user: schemas.UserUpdate):
    if user_id >= len(users) or user_id < 0:
        raise HTTPException(status_code=404, detail="User not found")

    if user.name:
        users[user_id]["name"] = user.name
    if user.email:
        users[user_id]["email"] = user.email

    return {"message": "User updated successfully", "user": users[user_id]}

@app.delete("/users/{user_id}")
def delete_user(user_id: int):
    if user_id >= len(users) or user_id < 0:
        raise HTTPException(status_code=404, detail="User not found")

    users.pop(user_id)
    return {"message": "User deleted successfully"}


