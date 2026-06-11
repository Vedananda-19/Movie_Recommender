from fastapi import APIRouter,Depends,status
from . import auth_service
from .auth_model import UserModel,LoginModel
from database import db_dependency

auth_router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

@auth_router.post("/register")
def register(data:UserModel,db:db_dependency):
    return auth_service.register_user(data,db)

@auth_router.get("/get-users")
def get_usersnames_list(db:db_dependency):
    return auth_service.get_usernames_list(db)

@auth_router.post("/login")
def login(data:LoginModel,db:db_dependency):
    return auth_service.check_login(data,db)

@auth_router.get("/verify-token",status_code=status.HTTP_200_OK)
def verify_token():
    return "successful"


