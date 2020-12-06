import React, { useMemo, useState } from "react";
import { Image, Text, View } from "react-native";

const COLUMNS_AMOUNT = 5;
const IMAGES_IN_GROUP_AMOUNT = 6;
const GROUP_PART_CONFIG = [
  { from: 0, to: 0, sizeFactor: 3, direction: "column" },
  { from: 1, to: 2, sizeFactor: 2, direction: "column" },
  { from: 3, to: 5, sizeFactor: 1, direction: "row" },
] as const;

type TImage = { height: number; width: number; uri: string };

type Props = {
  images: TImage[];
};

export const ImagesMasonry = ({ images }: Props) => {
  const [imageWidthUnit, setImageWidthUnit] = useState<number | null>(null);

  const imageGroups = useMemo(() => {
    return images.reduce((acc, image, idx) => {
      const groupIdx = (idx / IMAGES_IN_GROUP_AMOUNT) | 0;

      const group = acc[groupIdx] || [];

      const imageInGroupIndex = idx % IMAGES_IN_GROUP_AMOUNT;

      const groupPartIdx = GROUP_PART_CONFIG.findIndex((idxConfig) => {
        return imageInGroupIndex >= idxConfig.from && imageInGroupIndex <= idxConfig.to;
      });

      if (groupPartIdx > -1) {
        if (!group[groupPartIdx]) {
          group[groupPartIdx] = [];
        }

        group[groupPartIdx].push(image);

        acc[groupIdx] = group;
      }

      return acc;
    }, [] as TImage[][][]);
  }, [images]);

  return (
    <View style={{ height: "100%" }}>
      <View onLayout={(event) => setImageWidthUnit(event.nativeEvent.layout.width / COLUMNS_AMOUNT)}>
        {imageWidthUnit !== null &&
          imageGroups.map((group, groupIdx) => (
            <View style={{ flexDirection: "row" }} key={groupIdx}>
              <View>
                <View style={{ flexDirection: "row" }}>
                  {group[0] &&
                    group[0].map((image, imageIdx) => {
                      const size = imageWidthUnit * GROUP_PART_CONFIG[0].sizeFactor;

                      return <Image source={image} style={{ height: size, width: size }} key={imageIdx} />;
                    })}
                </View>

                <View style={{ flexDirection: "row" }}>
                  {group[2] &&
                    group[2].map((image, imageIdx) => {
                      const size = imageWidthUnit * GROUP_PART_CONFIG[2].sizeFactor;

                      return <Image source={image} style={{ height: size, width: size }} key={imageIdx} />;
                    })}
                </View>
              </View>

              <View style={{ flexDirection: "column" }}>
                {group[1] &&
                  group[1].map((image, imageIdx) => {
                    const size = imageWidthUnit * GROUP_PART_CONFIG[1].sizeFactor;

                    return <Image source={image} style={{ height: size, width: size }} key={imageIdx} />;
                  })}
              </View>
            </View>
          ))}
      </View>

      {!images.length && (
        <View style={{ width: "100%", paddingVertical: 20 }}>
          <Text style={{ textAlign: "center" }}>No images to display</Text>
        </View>
      )}
    </View>
  );
};
