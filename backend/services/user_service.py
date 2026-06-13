from models import Users,UserMovies
from sqlalchemy.orm import Session

def like_movie(movie_id:int,user:Users,db:Session):
    movie = db.query(UserMovies).filter(UserMovies.user_id==user.id,UserMovies.movie_id==movie_id).first()
    if movie:
        if movie.liked:
            movie.liked = False
        else:
            movie.liked = True
    else:
        movie = UserMovies(user_id=user.id,movie_id=movie_id,liked=True,watchlisted=False,watched=False)
        db.add(movie)
    db.commit()
    db.refresh(movie)

    return movie

def get_liked_movies(user:Users,db:Session):
    liked_movies = db.query(UserMovies).filter(UserMovies.user_id==user.id,UserMovies.liked==True).all()
    liked_movies_ids = [movie.movie_id for movie in liked_movies]
    return liked_movies_ids
