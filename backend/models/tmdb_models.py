from pydantic import BaseModel,Field

class MovieCard(BaseModel):
    id : int
    title : str
    poster_path : str
    rating : float = Field(alias="vote_average")
    release_date : str