from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  
from routes.auth_router import auth_router
from routes.tmdb_router import tmdb_router
from routes.user_router import user_router
from database import Base,engine
from dotenv import load_dotenv

load_dotenv()
allowed_origins = ["http://localhost:5173","https://movie-recommender-site-www4.onrender.com/"]

app = FastAPI()
app.add_middleware(CORSMiddleware,allow_origins=allowed_origins,allow_credentials=True,allow_methods=['*'],allow_headers=['*'])

app.include_router(auth_router)
app.include_router(tmdb_router)
app.include_router(user_router)

Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return "Home"