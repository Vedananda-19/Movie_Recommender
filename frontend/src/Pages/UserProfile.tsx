import useAuth from "../hooks/useAuth";
import useUserMovies from "../hooks/useUserMovies";
import useMovieDetails from "../hooks/useMovieDetails";
import MovieRow from "../Components/MovieRow";

type User = {
    id: string;
    username: string;
    password: string;
};

type MovieType = {
    id: number;
    title: string;
    poster_path?: string;
    rating?: number;
    release_date?: string;
};

function UserProfile() {
    const { user } = useAuth() as { user: User };
    
    const { likedMoviesQuery, watchedMoviesQuery, watchlistedMoviesQuery } = useUserMovies();

    const likedMoviesQueries = useMovieDetails(likedMoviesQuery.data);//Getting Details form Ids
    const watchlistedMoviesQueries =  useMovieDetails(watchlistedMoviesQuery.data)
    const watchedMoviesQueries = useMovieDetails(watchedMoviesQuery.data)
    return (
        <div>
            <div>
                <h1>Profile</h1>
            </div>
            <div>
                <h2>Username : </h2>
                <h2>{user.username}</h2>
            </div>
            <div>
                <h2>Liked Movies</h2>
                <MovieRow queries={likedMoviesQueries} />
            </div>
            <div>
                <h2>WatchListed Movies</h2>
                <MovieRow queries={watchlistedMoviesQueries} />
            </div>
            <div>
                <h2>Watched Movies</h2>
                <MovieRow queries={watchedMoviesQueries} />
            </div>
        </div>
    );
}

export default UserProfile;
