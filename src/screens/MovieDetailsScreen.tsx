import React, { useContext, useMemo } from "react";
import { Image, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { NavigationProp, Route } from "@react-navigation/native";

import { Routes } from "constants/Routes";
import { PosterImages } from "static/Posters";
import { MovieContext } from "providers/MovieProvider";

import { ScreenContainer, ScreenTitle } from "components/styled";

type Props = {
  navigation: NavigationProp<{}>;
  route: Route<typeof Routes.MOVIE_DETAILS, { movieId: number }>;
};

export const MovieDetailsScreen = ({ route }: Props) => {
  const { movieId } = route.params;

  const { movies } = useContext(MovieContext);

  const movieToDisplay = useMemo(() => movies.find((movie) => movie.id === movieId), [movies, movieId]);

  return (
    <ScrollView>
      <ScreenContainer>
        {movieToDisplay ? (
          <>
            {Boolean(movieToDisplay.Poster && PosterImages[movieToDisplay.Poster]) && (
              <Image source={PosterImages[movieToDisplay.Poster]} style={{ width: "100%" }} />
            )}

            <View style={{ paddingHorizontal: 15, paddingTop: 15 }}>
              <ScreenTitle>{movieToDisplay.Title}</ScreenTitle>
            </View>

            <View style={{ paddingHorizontal: 15, paddingTop: 15 }}>
              <Text>
                IMDB: {movieToDisplay.imdbRating} {movieToDisplay.imdbVotes && `(${movieToDisplay.imdbVotes} votes)`}
              </Text>
            </View>

            <View style={{ paddingHorizontal: 15, paddingTop: 15 }}>
              <Text>{movieToDisplay.Type}</Text>
              <Text>Year: {movieToDisplay.Year}</Text>
              <Text>Rated: {movieToDisplay.Rated}</Text>
              <Text>Released: {movieToDisplay.Released}</Text>
              <Text>Runtime: {movieToDisplay.Runtime}</Text>
              <Text>Genre: {movieToDisplay.Genre}</Text>
              <Text>Director: {movieToDisplay.Director}</Text>
              <Text>Writer: {movieToDisplay.Writer}</Text>
              <Text>Actors: {movieToDisplay.Actors}</Text>
            </View>
          </>
        ) : (
          <View>
            <View style={{ width: "100%", paddingVertical: 20 }}>
              <Text style={{ textAlign: "center" }}>Movie not found</Text>
            </View>
          </View>
        )}
      </ScreenContainer>
    </ScrollView>
  );
};
