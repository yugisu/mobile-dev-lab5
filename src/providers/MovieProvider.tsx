import React from "react";
import { TMovie, TMovieDTO } from "types/Movie.type";
import { useMovieData } from "utils/useMovieData";

export const MovieContext = React.createContext<{
  movies: TMovie[];
  addMovie: (movie: TMovieDTO) => void;
  removeMovie: (movieId: number) => void;
}>(null as any);

type Props = {
  children: React.ReactNode;
};

export const MovieProvider = ({ children }: Props) => {
  const { movies, addMovie, removeMovie } = useMovieData();

  return <MovieContext.Provider value={{ movies, addMovie, removeMovie }}>{children}</MovieContext.Provider>;
};
