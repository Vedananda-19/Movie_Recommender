from models import Users,UserMovies
from sqlalchemy.orm import Session
from httpx import AsyncClient
from datetime import datetime

def like_movie(movie_id:int,user:Users,db:Session):
    movie = db.query(UserMovies).filter(UserMovies.user_id==user.id,UserMovies.movie_id==movie_id).first()
    if movie:
        if movie.liked:
            movie.liked = False
            movie.interacted_date = None
        else:
            movie.liked = True
            movie.interacted_date = datetime.now()
    else:
        movie = UserMovies(user_id=user.id,movie_id=movie_id,liked=True,watchlisted=False,watched=False,interacted_date=datetime.now())
        db.add(movie)
    db.commit()
    db.refresh(movie)

    return movie

def watchlist_movie(movie_id:int,user:Users,db:Session):
    movie = db.query(UserMovies).filter(UserMovies.user_id==user.id,UserMovies.movie_id==movie_id).first()
    if movie:
        if movie.watchlisted:
            movie.watchlisted = False
            movie.interacted_date = None
        else:
            movie.watchlisted = True
            movie.interacted_date = datetime.now()
    else:
        movie = UserMovies(user_id=user.id,movie_id=movie_id,liked=False,watchlisted=True,watched=False,interacted_date=datetime.now())
        db.add(movie)
    db.commit()
    db.refresh(movie)

    return movie

def watch_movie(movie_id:int,user:Users,db:Session):
    movie = db.query(UserMovies).filter(UserMovies.user_id==user.id,UserMovies.movie_id==movie_id).first()
    if movie:
        if movie.watched:
            movie.watched = False
            movie.interacted_date = None
        else:
            movie.watched = True
            movie.interacted_date = datetime.now()
    else:
        movie = UserMovies(user_id=user.id,movie_id=movie_id,liked=False,watchlisted=False,watched=True,interacted_date=datetime.now())
        db.add(movie)
    db.commit()
    db.refresh(movie)

    return movie

def get_liked_movies(user:Users,db:Session):
    liked_movies = db.query(UserMovies).filter(UserMovies.user_id==user.id,UserMovies.liked==True).all()
    liked_movies_ids = [movie.movie_id for movie in liked_movies]
    return liked_movies_ids

def get_watchlisted_movies(user:Users,db:Session):
    watchlisted_movies = db.query(UserMovies).filter(UserMovies.user_id==user.id,UserMovies.watchlisted==True).all()
    watchlisted_movies_ids = [movie.movie_id for movie in watchlisted_movies]
    return watchlisted_movies_ids

def get_watched_movies(user:Users,db:Session):
    watched_movies = db.query(UserMovies).filter(UserMovies.user_id==user.id,UserMovies.watched==True).all()
    watched_movies_ids = [movie.movie_id for movie in watched_movies]
    return watched_movies_ids

async def recommend_movies(user:Users,db:Session):
    newly_liked_movies = db.query(UserMovies).filter(UserMovies.user_id==user.id,UserMovies.liked==True).order_by(UserMovies.interacted_date.desc()).limit(13)
    newly_watchlisted_movies = db.query(UserMovies).filter(UserMovies.user_id==user.id,UserMovies.watchlisted==True).order_by(UserMovies.interacted_date.desc()).all(5)
    newly_watched_movies = db.query(UserMovies).filter(UserMovies.user_id==user.id,UserMovies.watched==True).order_by(UserMovies.interacted_date.desc()).all(7)
    picked_movies = newly_liked_movies + newly_watchlisted_movies + newly_watched_movies

