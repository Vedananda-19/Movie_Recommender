from fastapi import FastAPI,HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware  
from auth.auth_router import auth_router
from database import Base,engine
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()
app.add_middleware(CORSMiddleware,allow_origins=['*'],allow_credentials=True,allow_methods=['*'])
app.include_router(auth_router)

Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return "Home"