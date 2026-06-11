from fastapi import HTTPException,Depends
from models.auth_models import User,UserModel,LoginModel,Token
from sqlalchemy.orm import Session
from jose import jwt
from datetime import datetime,timedelta,timezone
import os

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = 'HS256'

def register_user(data:UserModel,db:Session):
    existing = db.query(User).filter(User.username==data.username).first()
    if existing:
        raise HTTPException(409,"User ALready Exists")
    
    new_user = User(username=data.username,password=data.password,dob=data.dob)

    db.add(new_user)
    db.commit()

    return {"message":"successful"}

def get_usernames_list(db:Session):
    usernames = [row[0] for row in db.query(User.username).all()]
    return usernames

def check_login(data:LoginModel,db:Session):
    user = db.query(User).filter(User.username==data.username).first()
    print(user)
    if not user:
        raise HTTPException(404,"Username Not Found")
    if user.password!=data.password:
        raise HTTPException(400,"Invalid Credentials")
    return create_access_token(user)

def create_access_token(user:User|None):
    expires_delta = timedelta(minutes=60)
    encode_data = {'sub':user.username,'id':user.id}
    expiry = datetime.now(timezone.utc) + expires_delta
    encode_data.update({'exp':expiry})
    access_token = jwt.encode(encode_data,JWT_SECRET_KEY,algorithm=ALGORITHM)
    token = Token(access_token=access_token,token_type="bearer")
    return token
    
    