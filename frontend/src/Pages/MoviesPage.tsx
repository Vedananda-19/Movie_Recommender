import useAuth from "../hooks/useAuth";
import api from "../apis/api";
import useRedirectUnauth from "../hooks/useRedirectUnauth";
import MovieRow from "../Components/MovieRow";
import useHomeMovies from "../hooks/useHomeMovies";
import { useState, useEffect } from "react";


function MoviesPage() {
    const { data, isLoading, isError } = useHomeMovies();
    const movies = data
    return (
        <div>
            <div>
                <h1>Movies</h1>
            </div>
            {isError ? (
                <h2>An Error Occured While Loading Movies</h2>
            ) : (
                <div className="homeMovies">
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
            )}
        </div>
    );
}

export default MoviesPage;
