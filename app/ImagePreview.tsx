import React from "react";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";

const ImagePreview = () => {
  const { image } = useLocalSearchParams();

  return (
    <>
      <Image
        source={{ uri: image }}
        style={{ width: "100%", height: "100%" }}
        contentFit="cover"
      />
    </>
  );
};

export default ImagePreview;
