from fastapi import APIRouter,HTTPException,Depends
from models import Users
from database import db_dependency
from services.auth_service import get_current_user
from services import user_service
from typing import Annotated

user_router = APIRouter(prefix="/user",tags=["user"])

user_dependency = Annotated[Users,Depends(get_current_user)]

@user_router.get("/me")
def return_user(user:user_dependency):
    return user

@user_router.get("/like-movie/{movie_id}")
def like(movie_id:int,user:user_dependency,db:db_dependency):
    return user_service.like_movie(movie_id,user,db)

@user_router.get("/watchlist-movie/{movie_id}")
def watchlist(movie_id:int,user:user_dependency,db:db_dependency):
    return user_service.watchlist_movie(movie_id,user,db)

@user_router.get("/watch-movie/{movie_id}")
def watch(movie_id:int,user:user_dependency,db:db_dependency):
    return user_service.watch_movie(movie_id,user,db)

@user_router.get("/liked-movies")
def liked_movies(user:user_dependency,db:db_dependency):
    return user_service.get_liked_movies(user,db)

@user_router.get("/watchlisted-movies")
def watchlisted_movies(user:user_dependency,db:db_dependency):
    return user_service.get_watchlisted_movies(user,db)

@user_router.get("/watched-movies")
def watched_movies(user:user_dependency,db:db_dependency):
    return user_service.get_watched_movies(user,db)

@user_router.get("/recommended-movies")
async def recommended_movies(user:user_dependency,db:db_dependency):
    return await user_service.recommend_user_movies(user,db)