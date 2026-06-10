from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base,sessionmaker,Session
from typing import Annotated
from fastapi import Depends
import os

from dotenv import load_dotenv

load_dotenv()

print(os.getenv("URL_DATABASE"))
engine = create_engine(os.getenv("URL_DATABASE"))

SessionLocal = sessionmaker(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session,Depends(get_db)]

Base = declarative_base()


