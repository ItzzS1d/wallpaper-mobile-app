import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { ImageData } from "@/app/(tabs)";
import { Image } from "expo-image";
import { getImageSize, wp } from "@/constants/Styles";
import { router } from "expo-router";

const ImageCard = ({
  image,
  index,
  columns,
}: {
  image: ImageData;
  index: number;
  columns: number;
}) => {
  function getImageHeight() {
    let { imageHeight, imageWidth } = image;
    return { height: getImageSize(imageHeight, imageWidth) };
  }

  return (
    <Pressable
      style={[styles.imageWrapper, styles.spacing]}
      onPress={() =>
        router.navigate({
          pathname: "/imageModel",
          params: { image: image.webformatURL },
        })
      }
    >
      <Image
        style={[styles.image, getImageHeight()]}
        source={{ uri: image.webformatURL }}
        transition={100}
      />
    </Pressable>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: "100%",
  },
  imageWrapper: {
    backgroundColor: "gray",
    borderRadius: 8,
    borderCurve: "continuous",
    overflow: "hidden",
    marginBottom: wp(2),
  },
  spacing: {
    marginRight: wp(2),
  },
});
