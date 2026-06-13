import useUserMovies from "../hooks/useUserMovies";
import useUpdateUserMovie from "../hooks/useUpdateUserMovie";

type MovieType = {
    id: number;
    title: string;
    poster_path?: string;
    rating?: number;
    release_date?: string;
};

function MovieCard({
    movie,
    isLoading,
}: {
    movie: MovieType;
    isLoading: Boolean;
}) {
    const { data: likedMoviesIds, status: likedStatus } = useUserMovies().likedMoviesQuery;
    const { data: watchlistedMoviesIds, status: watchlistedStatus } = useUserMovies().watchlistedMoviesQuery;
    const { data: watchedMoviesIds, status: watchedStatus } = useUserMovies().watchedMoviesQuery;

    const {likeMovie,watchlistMovie,watchMovie} = useUpdateUserMovie();

    if (isLoading) return <SkeletonCard />;

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
                            className={`likeBtn ${likedMoviesIds.includes(movie.id) && "active"}`}
                            onClick={() => likeMovie(movie.id)}
                        >
                            {likedMoviesIds.includes(movie.id)
                                ? "Unlike"
                                : "Like"}
                        </button>
                    ) : (
                        <p>{`${likedStatus.slice(0, 3)}..`}</p>
                    )}
                </div>
                <div className="movie-buttons">
                    {watchlistedStatus == "success" ? (
                        <button
                            className={`likeBtn ${watchlistedMoviesIds.includes(movie.id) && "active"}`}
                            onClick={() => watchlistMovie(movie.id)}
                        >
                            {watchlistedMoviesIds.includes(movie.id)
                                ? "Unwatchlist"
                                : "watchlist"}
                        </button>
                    ) : (
                        <p>{`${watchlistedStatus.slice(0, 3)}..`}</p>
                    )}
                </div>
                <div className="movie-buttons">
                    {watchedStatus == "success" ? (
                        <button
                            className={`likeBtn ${watchedMoviesIds.includes(movie.id) && "active"}`}
                            onClick={() => watchMovie(movie.id)}
                        >
                            {watchedMoviesIds.includes(movie.id)
                                ? "Not Watched"
                                : "Watched"}
                        </button>
                    ) : (
                        <p>{`${watchedStatus.slice(0, 3)}..`}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MovieCard;

function SkeletonCard() {
    return (
        <div className="movie-card">
            <div className="movie-poster skeleton"></div>

            <div className="movie-info">
                <div className="skeleton skeleton-title"></div>

                <div className="movie-meta">
                    <div className="skeleton skeleton-meta"></div>
                    <div className="skeleton skeleton-meta"></div>
                </div>

                <div className="movie-buttons">
                    <div className="skeleton skeleton-button"></div>
                </div>
            </div>
        </div>
    );
}
