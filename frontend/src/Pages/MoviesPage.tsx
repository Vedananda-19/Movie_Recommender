import useAuth from "../hooks/useAuth";
import api from "../apis/api";
import useRedirectUnauth from "../hooks/useRedirectUnauth";
import MovieRow from "../Components/MovieRow";
import { useState, useEffect } from "react";

type MovieType = {
    id: number;
    title: string;
    poster_path?: string;
    rating?: number;
    release_date?: string;
};
type MoviesObjectType = {
    popular: MovieType[];
    top_rated: MovieType[];
    now_playing: MovieType[];
    upcoming: MovieType[];
};

function MoviesPage() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [movies, setMovies] = useState<MoviesObjectType>({popular:[],top_rated:[],now_playing:[],upcoming:[]});
    const { check_auth } = useAuth()!;
    const redirect = useRedirectUnauth();

    useEffect(() => {
        load_movies_page();
    }, []);

    const handleSubmit = async () => {
        const isAuth = await check_auth();
        if (!isAuth) {
            redirect();
            return;
        }
        try {
            const response = await api.get("/");
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    async function load_movies_page() {
        setIsLoading(true);
        try {
            const response = await api.get("/tmdb/load-movies-page");
            setMovies(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div>
                <h1>Movies</h1>
            </div>
            <div className="moviesGrid">
                <button
                    onClick={() => {
                        handleSubmit();
                    }}
                >
                    Check Protected route
                </button>
            </div>
            <div>
                <h1>Popular</h1>
                {isLoading ? (
                    <h2>Loading...</h2>
                ) : (
                    <MovieRow movies={movies.popular} />
                )}
            </div>
            <div>
                <h1>Top Rated</h1>
                {isLoading ? (
                    <h2>Loading...</h2>
                ) : (
                    <MovieRow movies={movies.top_rated} />
                )}
            </div>
            <div>
                <h1>Now Playing</h1>
                {isLoading ? (
                    <h2>Loading...</h2>
                ) : (
                    <MovieRow movies={movies.now_playing} />
                )}
            </div>
            <div>
                <h1>Upcoming</h1>
                {isLoading ? (
                    <h2>Loading...</h2>
                ) : (
                    <MovieRow movies={movies.upcoming} />
                )}
            </div>
        </div>
    );
}

export default MoviesPage;
