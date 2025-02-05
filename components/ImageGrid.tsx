import { ActivityIndicator, StyleSheet, View } from "react-native";
import React from "react";
import { ImageData } from "@/app/(tabs)";
import { MasonryFlashList } from "@shopify/flash-list";
import ImageCard from "./ImageCard";
import { getColumnCount } from "@/constants/Styles";

const ImageGrid = ({ images }: { images: ImageData[] }) => {
  return (
    <View style={styles.container}>
      <MasonryFlashList
        data={images}
        numColumns={getColumnCount()}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={25}
        ListFooterComponent={<ActivityIndicator size={45} />}
        renderItem={({ item, index }) => (
          <ImageCard image={item} index={index} columns={getColumnCount()} />
        )}
      />
    </View>
  );
};

export default ImageGrid;

const styles = StyleSheet.create({
  container: {
    minHeight: 3,
    width: "100%",
  },
});
