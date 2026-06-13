from fastapi import HTTPException,Depends
from fastapi.security import OAuth2PasswordBearer,OAuth2PasswordRequestForm
from models import Users,UserModel,LoginModel,Token
from sqlalchemy.orm import Session
from jose import jwt,JWTError
from datetime import datetime,timedelta,timezone
from database import db_dependency
import os

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = 'HS256'
oAuth2Scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def register_user(data:UserModel,db:Session):
    existing = db.query(Users).filter(Users.username==data.username).first()
    if existing:
        raise HTTPException(409,"Users Already Exists")
    
    new_user = Users(username=data.username,password=data.password,dob=data.dob)

    db.add(new_user)
    db.commit()

    return {"message":"successful"}

def get_usernames_list(db:Session):
    usernames = [row[0] for row in db.query(Users.username).all()]
    return usernames

def check_login(data:LoginModel,db:Session):
    user = db.query(Users).filter(Users.username==data.username).first()
    print(user)
    if not user:
        raise HTTPException(404,"Username Not Found")
    if user.password!=data.password:
        raise HTTPException(400,"Invalid Credentials")
    return create_access_token(user)

def create_access_token(user:Users|None):
    expires_delta = timedelta(minutes=60)
    encode_data = {'id':user.id}
    expiry = datetime.now(timezone.utc) + expires_delta
    encode_data.update({'exp':expiry})
    access_token = jwt.encode(encode_data,JWT_SECRET_KEY,algorithm=ALGORITHM)
    token = Token(access_token=access_token,token_type="bearer")
    return token

def verify_token(token : str = Depends(oAuth2Scheme)):
    try:
        payload = jwt.decode(token,JWT_SECRET_KEY,algorithms=[ALGORITHM])
        user_id = payload.get("id")
        if user_id is None:
            raise HTTPException(401,"Unauthorized")
        return user_id
    except JWTError:
        raise HTTPException(401,'Unauthorized')

def get_current_user(db:db_dependency,user_id:str=Depends(verify_token)):
    user =  db.query(Users).filter(Users.id==user_id).first()
    if not user:
        raise HTTPException(401,'User Not Found')
    return user
    
    