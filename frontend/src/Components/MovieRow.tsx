import MovieCard from "./MovieCard";
import type { UseQueryResult } from "@tanstack/react-query";

type MovieType = {
    id: number;
    title: string;
    poster_path?: string;
    rating?: number;
    release_date?: string;
};

type MovieRowProps = {
    movies?: MovieType[];
    isLoading?: boolean;
    queries?: UseQueryResult<MovieType>[];
};

function MovieRow({
    movies = [],
    isLoading = false,
    queries,
}: MovieRowProps) {
    return (
        <div className="movie-row">
            {isLoading ? (
                Array.from({ length: 10 }).map((_, i) => (
                    <MovieCard
                        key={i}
                        movie={{ id: i, title: "" }}
                        isLoading={true}
                    />
                ))
            ) : queries ? (
                queries.map((query, idx) => (
                    query.isError ?
                        <MovieCard
                            key={idx}
                            movie={{
                                id: idx,
                                title: "Failed to load",
                            }}
                            isLoading={false}
                        />: 
                        <MovieCard
                            key={query.data?.id ?? idx}
                            movie={query.data ?? { id: idx, title: "" }}
                            isLoading={query.isLoading}
                        />
                ))
            ) : (
                movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        isLoading={false}
                    />
                ))
            )}
        </div>
    );
}

export default MovieRow;