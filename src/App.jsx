import { useState } from "react";

import { useMovie } from "./useMovie";
import { useLocalStorageState } from "./useLocalStorageState";
import { Loader } from "./components/ui/Loader";
import { Box } from "./components/main/Box";
import { MovieDetails } from "./components/main/MovieDetails";
import { WatchedSummery } from "./components/main/WatchedSummery";
import { WatchedMovieList } from "./components/main/WatchedMovieList";
import { Error } from "./components/ui/Error";
import { MovieList } from "./components/main/MovieList";
import { Main } from "./components/main/Main";
import { NumResult } from "./components/Header/NumResults";
import { Search } from "./components/Header/Search";
import { Navbar } from "./components/Header/Navbar";
/*
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
*/

export default function App() {
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useLocalStorageState([], "watched");
  const { movies, isLoading, error } = useMovie(query, closeMovieDetails);
  const [selectedId, setSelectedId] = useState(null);
  //http://www.omdbapi.com/?apikey=[yourkey]&

  function selectDetail(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function closeMovieDetails() {
    setSelectedId(null);
  }
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }
  function handleDeletedMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />}*/}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelected={selectDetail} />
          )}
          {isLoading && <Loader />}
          {error && <Error message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseDetails={closeMovieDetails}
              onAddWattched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummery watched={watched} />
              <WatchedMovieList
                watched={watched}
                handleDeletedMovie={handleDeletedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
