from fastapi import APIRouter
import httpx
from models import MovieCard
import os
import asyncio

tmdb_router = APIRouter(prefix="/tmdb",tags=["tmdb"])

api = "https://api.themoviedb.org/3"
headers = {"Authorization":f"Bearer {os.getenv('TMDB_ACCESS_KEY')}"}

@tmdb_router.get("/movie/popular",response_model=list[MovieCard])
async def get_popular_movies(page:int = 1):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{api}/movie/popular",params={"page":page},headers=headers)
    data = response.json()
    movies = [MovieCard.model_validate(movie) for movie in data["results"]]
    return movies

@tmdb_router.get("/movie/top_rated",response_model=list[MovieCard])
async def get_top_rated_movies(page:int = 1):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{api}/movie/top_rated",params={"page":page},headers=headers)
    data = response.json()
    movies = [MovieCard.model_validate(movie) for movie in data["results"]]
    return movies

@tmdb_router.get("/movie/now_playing",response_model=list[MovieCard])
async def get_now_playing_movies(page:int = 1):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{api}/movie/now_playing",params={"page":page},headers=headers)
    data = response.json()
    movies = [MovieCard.model_validate(movie) for movie in data["results"]]
    return movies

@tmdb_router.get("/movie/upcoming",response_model=list[MovieCard])
async def get_upcoming_movies(page:int = 1):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{api}/movie/upcoming",params={"page":page},headers=headers)
    data = response.json()
    movies = [MovieCard.model_validate(movie) for movie in data["results"]]
    return movies

@tmdb_router.get("/load-movies-page")
async def load_movies_page():
    popular,top_rated,now_playing,upcoming = await asyncio.gather(
        get_popular_movies(),
        get_top_rated_movies(),
        get_now_playing_movies(),
        get_upcoming_movies()
    )
    return {"popular":popular,"top_rated":top_rated,"now_playing":now_playing,"upcoming":upcoming}


