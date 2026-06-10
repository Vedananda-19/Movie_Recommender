from database import Base
from sqlalchemy import Column,Integer,String,Float,Boolean
from pydantic import BaseModel
import uuid

class User(Base):
    __tablename__="users"

    id = Column(String,primary_key=True,default=lambda:str(uuid.uuid4()))
    username = Column(String,unique=True)
    password = Column(String)
    dob = Column(String)

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
