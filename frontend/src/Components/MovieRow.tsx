import MovieCard from "./MovieCard";

type MovieType = {
    id: number;
    title: string;
    poster_path?: string;
    rating?: number;
    release_date?: string;
};

function MovieRow({ movies }: { movies: MovieType[] }) {
  return (
    <div className="movie-row">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieRow;