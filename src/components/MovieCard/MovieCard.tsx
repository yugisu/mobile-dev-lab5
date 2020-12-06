import React from "react";
import styled from "styled-components/native";
import { Text, View } from "react-native";

import { TMovie } from "types/Movie.type";

type Props = {
  movie: TMovie;
};

export const MovieCard = ({ movie }: Props) => {
  return (
    <Container>
      <View>
        <View style={{ paddingBottom: 10 }}>
          <Title>
            {movie.Title} {movie.Year}
          </Title>
        </View>

        <View>
          <Text>{movie.Type}</Text>
          <Text>{movie.Genre}</Text>
          <Text>IMDB: {movie.imdbRating}</Text>
        </View>
      </View>
    </Container>
  );
};

const Container = styled.View`
  margin-top: 20px;

  padding: 5px 10px;

  background-color: ${(props) => props.theme.movieCard.background};
`;

const Title = styled.Text`
  font-weight: bold;
`;
