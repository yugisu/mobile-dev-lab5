import { useCallback, useState } from "react";

import { TMovie, TMovieDTO } from "types/Movie.type";

import moviesList from "static/MoviesList.json";

const transformedMovieListData = moviesList.map((movie, idx) => ({ ...movie, id: moviesList.length - idx }));

export const useMovieData = () => {
  const [movies, setMovies] = useState<TMovie[]>(transformedMovieListData);

  const addMovie = useCallback(
    (newMovie: TMovieDTO) =>
      setMovies((prev) => {
        const newId = Math.max(...prev.map((movie) => movie.id)) + 1;

        return [{ id: newId, ...newMovie }, ...prev];
      }),
    []
  );

  const removeMovie = useCallback((movieId: number) => {
    debugger;

    return setMovies((prev) => prev.filter((movie) => movie.id !== movieId));
  }, []);

  return {
    movies,
    addMovie,
    removeMovie,
  };
};
