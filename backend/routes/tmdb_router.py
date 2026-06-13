from fastapi import APIRouter
import httpx
from models import MovieCard
import os
import asyncio
from dotenv import load_dotenv

tmdb_router = APIRouter(prefix="/tmdb",tags=["tmdb"])
load_dotenv()
print(os.getenv("TMDB_ACCESS_KEY"))

api = "https://api.themoviedb.org/3"
headers = {"Authorization":f"Bearer {os.getenv('TMDB_ACCESS_KEY')}"}

@tmdb_router.post("/movies-details")
async def get_movies_details(movie_ids:list[int],page:int = 1):
    movies = await asyncio.gather(
        *(get_movie_details_by_id(movie_id) for movie_id in movie_ids[(page-1)*10:(page)*10])
    )
    return movies

@tmdb_router.get("/movie/{movie_id}")
async def get_movie_details(movie_id:int):
    return await get_movie_details_by_id(movie_id)

async def get_movie_details_by_id(movie_id:int):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{api}/movie/{movie_id}",headers=headers)
        data=response.json()
    return MovieCard.model_validate(data)

@tmdb_router.get("/popular",response_model=list[MovieCard])
async def get_popular_movies(page:int = 1):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{api}/movie/popular",params={"page":page},headers=headers)
    data = response.json()
    movies = [MovieCard.model_validate(movie) for movie in data["results"]]
    return movies

@tmdb_router.get("/top_rated",response_model=list[MovieCard])
async def get_top_rated_movies(page:int = 1):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{api}/movie/top_rated",params={"page":page},headers=headers)
    data = response.json()
    movies = [MovieCard.model_validate(movie) for movie in data["results"]]
    return movies

@tmdb_router.get("/now_playing",response_model=list[MovieCard])
async def get_now_playing_movies(page:int = 1):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{api}/movie/now_playing",params={"page":page},headers=headers)
    data = response.json()
    movies = [MovieCard.model_validate(movie) for movie in data["results"]]
    return movies

@tmdb_router.get("/upcoming",response_model=list[MovieCard])
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

@tmdb_router.get("/test")
async def test():
    async with httpx.AsyncClient() as client:
        response = await client.get("https://www.google.com")
        return {"status": response.status_code}
