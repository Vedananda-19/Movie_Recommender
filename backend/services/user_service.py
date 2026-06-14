from models import Users,UserMovies
from sqlalchemy import func
from sqlalchemy.orm import Session
import asyncio
from datetime import datetime
import random
from routes.tmdb_router import fetch_recommendations

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

async def recommend_user_movies(user:Users,db:Session):
    liked_ids = [movie_id for (movie_id,) in db.query(UserMovies.movie_id).filter(UserMovies.user_id == user.id, UserMovies.liked == True).order_by(UserMovies.interacted_date.desc()).limit(20).all()]
    watchlisted_ids = [movie_id for (movie_id,) in db.query(UserMovies.movie_id).filter(UserMovies.user_id == user.id, UserMovies.watchlisted == True).order_by(UserMovies.interacted_date.desc()).limit(5).all()]
    watched_ids = [movie_id for (movie_id,) in db.query(UserMovies.movie_id).filter(UserMovies.user_id == user.id, UserMovies.watched == True).order_by(UserMovies.interacted_date.desc()).limit(10).all()]

    picked_movie_ids = picked_movie_ids = list(dict.fromkeys(
        liked_ids + watchlisted_ids + watched_ids
    ))

    if not picked_movie_ids:
        return []

    picked_ids = set(picked_movie_ids)
    random_movies = [movie_id for (movie_id,) in db.query(UserMovies.movie_id).filter(UserMovies.user_id == user.id,UserMovies.interacted_date!=None,~UserMovies.movie_id.in_(picked_ids)).order_by(func.random()).limit(5).all()]
    picked_movie_ids += random_movies

    movie_seeds = random.sample(picked_movie_ids,min(10,len(picked_movie_ids)))

    recommendations = await asyncio.gather(
        *(fetch_recommendations(movie_id) for movie_id in movie_seeds)
    )
    all_recommendations = []
    for recs in recommendations:
        all_recommendations.extend(recs)
    random.shuffle(all_recommendations) 
    seen = set()
    unique_recommendations = []
    for movie in all_recommendations:
        if movie.id not in seen:
            seen.add(movie.id)
            unique_recommendations.append(movie)
    return unique_recommendations[:min(20,len(unique_recommendations))]




