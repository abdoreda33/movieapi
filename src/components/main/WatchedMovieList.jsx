import { WatchedMovie } from "./WatchedMovie";

export function WatchedMovieList({ watched, handleDeletedMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          handleDeletedMovie={handleDeletedMovie}
        />
      ))}
    </ul>
  );
}
