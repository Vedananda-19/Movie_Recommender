from fastapi import APIRouter,HTTPException,Depends
from models import Users
from database import db_dependency
from services.auth_service import get_current_user
from typing import Annotated

user_router = APIRouter(prefix="/user",tags=["user"])

user_dependency = Annotated[Users,get_current_user]

@user_router.get("/me")
def return_user(user:user_dependency):
    return user

# @user_router.get("/like-movie/{movie_id}")
# def like_movie(movie_id:int,user:user_dependency):
#     return 