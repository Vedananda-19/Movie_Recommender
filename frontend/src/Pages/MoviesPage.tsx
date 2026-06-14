import MovieRow from "../Components/MovieRow";
import useHomeMovies from "../hooks/useHomeMovies";


function MoviesPage() {
    const { data, isLoading, isError } = useHomeMovies();

    const movies = data;

    return (
        <div className="themeBackground">
            <div className="pageContainer">
            <div className="pageHeader">
                <h1>Movies</h1>
                <p>Discover what is popular, highly rated, and coming soon.</p>
            </div>

            {isError ? (
                <h2 className="errorMessage">An Error Occured While Loading Movies</h2>
            ) : (
                <div className="homeMovies">
                    <section className="movieSection">
                        <h1>Popular</h1>
                        <MovieRow
                            movies={movies?.popular ?? []}
                            isLoading={isLoading}
                        />
                    </section>

                    <section className="movieSection">
                        <h1>Top Rated</h1>
                        <MovieRow
                            movies={movies?.top_rated ?? []}
                            isLoading={isLoading}
                        />
                    </section>

                    <section className="movieSection">
                        <h1>Now Playing</h1>
                        <MovieRow
                            movies={movies?.now_playing ?? []}
                            isLoading={isLoading}
                        />
                    </section>

                    <section className="movieSection">
                        <h1>Upcoming</h1>
                        <MovieRow
                            movies={movies?.upcoming ?? []}
                            isLoading={isLoading}
                        />
                    </section>
                </div>
            )}
            </div>
        </div>
    );
}

export default MoviesPage;
