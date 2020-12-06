import React, { useCallback, useContext, useMemo, useState } from "react";
import { Button, View } from "react-native";
import styled from "styled-components/native";
import { ScrollView } from "react-native-gesture-handler";

import { Routes } from "constants/Routes";
import { MovieContext } from "providers/MovieProvider";

import { ScreenContainer, ScreenTitle } from "components/styled";
import { MovieList } from "components/MovieList/MovieList";

type Props = {
  navigation: any;
};

export const MovieListScreen = ({ navigation }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");

  const { movies } = useContext(MovieContext);

  const moviesToDisplay = useMemo(
    () => (searchQuery ? movies.filter((movie) => movie.Title?.toLowerCase().includes(searchQuery.toLowerCase())) : movies),
    [searchQuery, movies]
  );

  const handleOpenMovieDetails = useCallback((movieId: number) => navigation.navigate(Routes.MOVIE_DETAILS, { movieId }), [navigation]);

  return (
    <ScrollView>
      <ScreenContainer>
        <View style={{ paddingTop: 15, paddingHorizontal: 15 }}>
          <ScreenTitle>Movies</ScreenTitle>
        </View>

        <View style={{ paddingTop: 15, paddingHorizontal: 15 }}>
          <Button title="Add new movie" onPress={() => navigation.navigate(Routes.ADD_MOVIE)} />
        </View>

        <View style={{ paddingTop: 15, paddingHorizontal: 15 }}>
          <SearchInput value={searchQuery} onChangeText={(text) => setSearchQuery(text)} placeholder="Search movies..." />
        </View>

        <MovieCardsContainer>
          <MovieList movies={moviesToDisplay} onOpenMovieDetails={handleOpenMovieDetails} />
        </MovieCardsContainer>
      </ScreenContainer>
    </ScrollView>
  );
};

const MovieCardsContainer = styled.View`
  height: 100%;

  padding: 10px 15px;
`;

const SearchInput = styled.TextInput`
  padding: 5px 10px;

  background: ${(props) => props.theme.movieCard.background};
`;
