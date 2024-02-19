import { useEffect, useState } from "react";

export function useMovie(query, callBack) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const KEY = "c15bdd85";
  useEffect(() => {
    callBack?.();
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?s=movies&type=movie&apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok)
          throw new Error("something went wrong with fetching movie");

        const data = await res.json();
        if (data.Response === "false") throw new Error("Movies not found");
        console.log(data.Response);
        setMovies(data.Search);
        console.log(data.Search);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    return function () {
      controller.abort();
    };
  }, [query]);
  return { movies, isLoading, error };
}
