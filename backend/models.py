from database import Base
from sqlalchemy import Column,Integer,String,Float,Boolean,ForeignKey
from sqlalchemy.orm import relationship
from pydantic import BaseModel,Field
import uuid

class Users(Base):
    __tablename__="users"

    id = Column(String,primary_key=True,default=lambda:str(uuid.uuid4()))
    username = Column(String,unique=True)
    password = Column(String)
    dob = Column(String)

    user_movies = relationship("UserMovies",back_populates="user")


class UserMovies(Base):
    __tablename__="usermovies"

    id = Column(Integer,primary_key=True)
    user_id = Column(String, ForeignKey("users.id"))
    movie_id = Column(Integer)
    status = Column(String)#Liked/Watched/Watchlisted

    user = relationship("Users",back_populates="user_movies")

class UserModel(BaseModel):
    username : str
    password : str
    dob : str

class LoginModel(BaseModel):
    username : str
    password : str

class Token(BaseModel):
    access_token : str
    token_type : str

class MovieCard(BaseModel):
    id : int
    title : str
    poster_path : str
    rating : float = Field(validation_alias="vote_average")
    release_date : str
