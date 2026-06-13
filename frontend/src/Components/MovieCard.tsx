import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../apis/api";
import useLikedMovies from "../hooks/useLikedMovies";
import useLikeMovie from "../hooks/useLikeMovie";

type MovieType = {
    id: number;
    title: string;
    poster_path?: string;
    rating?: number;
    release_date?: string;
};

function MovieCard({ movie }: { movie: MovieType }) {
    const { data: likedMovieIds, status: likedStatus } = useLikedMovies();

    const likeMovie = useLikeMovie();

    return (
        <div className="movie-card">
            <img
                src={
                    movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "/placeholder.jpg"
                }
                alt={movie.title}
                className="movie-poster"
            />

            <div className="movie-info">
                <h3>{movie.title}</h3>

                <div className="movie-meta">
                    <span>⭐ {movie.rating?.toFixed(1) ?? "N/A"}</span>
                    <span>
                        {movie.release_date
                            ? new Date(movie.release_date).getFullYear()
                            : "Unknown"}
                    </span>
                </div>
                <div className="movie-buttons">
                    {likedStatus == "success" ? (
                        <button
                            className={`likeBtn ${likedMovieIds.includes(movie.id) && "active"}`}
                            onClick={async () => likeMovie(movie.id)}
                        >
                            Like
                        </button>
                    ) : (
                        <p>{`${likedStatus.slice(0, 3)}..`}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MovieCard;
