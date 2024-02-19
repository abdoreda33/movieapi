import { Movie } from "./Movie";

export function MovieList({ movies, onSelected }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} onSelected={onSelected} />
      ))}
    </ul>
  );
}
