import React from "react";
import { Image, Text, View } from "react-native";

type Props = {
  images: { height: number; width: number; uri: string }[];
};

export const ImagesMasonry = ({ images }: Props) => {
  return (
    <View style={{ height: "100%" }}>
      {images.map((image, idx) => (
        <Image source={image} style={{ height: 100, width: 100 }} key={idx} />
      ))}

      {!images.length && (
        <View style={{ width: "100%", paddingVertical: 20 }}>
          <Text style={{ textAlign: "center" }}>No images to display</Text>
        </View>
      )}
    </View>
  );
};
