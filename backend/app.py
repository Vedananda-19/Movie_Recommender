from fastapi import FastAPI,HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware  

app = FastAPI()
app.add_middleware(CORSMiddleware)

@app.get("/")
def home():
    return "Home"