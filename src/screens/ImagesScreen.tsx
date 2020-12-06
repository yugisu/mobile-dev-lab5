import React, { useState } from "react";
import { View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import * as ImagePicker from "expo-image-picker";

import { Routes } from "constants/Routes";

import { ScreenContainer, ScreenTitle } from "components/styled";
import { ImagesMasonry } from "components/ImagesMasonry/ImagesMasonry";

const Images = createStackNavigator();

export const ImagesScreen = () => {
  const [selectedImages, setSelectedImages] = useState<{ height: number; width: number; uri: string }[]>([]);

  const addImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({ quality: 1 });

      if (!result.cancelled) {
        const { type, height, width, uri } = result;

        if (type === "video") {
          console.error("Sorry, videos are not supported :(");
        }

        const newImage = {
          height,
          width,
          uri,
        };

        setSelectedImages((prev) => [...prev, newImage]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Images.Navigator screenOptions={{ headerRight: () => <AddButton onPress={addImage} /> }}>
      <Images.Screen name={Routes.IMAGES}>
        {() => (
          <ScrollView>
            <ScreenContainer>
              <View style={{ paddingHorizontal: 15, paddingTop: 15 }}>
                <ScreenTitle>Images gallery</ScreenTitle>
              </View>

              <View style={{ padding: 15, paddingTop: 25, height: "100%" }}>
                <ImagesMasonry images={selectedImages} />
              </View>
            </ScreenContainer>
          </ScrollView>
        )}
      </Images.Screen>
    </Images.Navigator>
  );
};

const AddButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
    <AddButtonInner>
      <Ionicons name="md-add" size={20} />
    </AddButtonInner>
  </TouchableOpacity>
);

const AddButtonInner = styled.View`
  margin-right: 10px;

  height: 32px;
  width: 32px;

  justify-content: center;
  align-items: center;

  background-color: #eee;
  border-radius: 16px;
`;
