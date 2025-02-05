import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Share,
  StyleSheet,
  View,
} from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { hp, wp } from "@/constants/Styles";
import { BlurView } from "expo-blur";
import { Ionicons, Octicons } from "@expo/vector-icons";

const imageModel = () => {
  const { image } = useLocalSearchParams();
  const [downloading, setIsDownloading] = useState(false);

  const handleDownloadImage = async () => {
    try {
      setIsDownloading(true);
      // Step 2: Define a file path to save the image
      const fileUri = FileSystem.documentDirectory + "downloaded_image.jpg"; // Use a static filename

      // Step 3: Download the image
      const download = await FileSystem.downloadAsync(image, fileUri);

      // Step 4: Check if the download was successful
      if (download.status !== 200) {
        Alert.alert("Error", "Failed to download image.");
        return;
      }

      // Step 5: Save the downloaded image to the gallery
      await MediaLibrary.saveToLibraryAsync(download.uri);
      Alert.alert("Success", "Image saved to gallery!");
      router.back();
    } catch (error) {
      console.error("Download Error:", error);
      Alert.alert("Error", "Something went wrong!");
    } finally {
      setIsDownloading(false);
    }
  };
  const handleShare = () => {
    Share.share({
      title: "Wallpaper",
      message:
        "Hey, Check out the awesome wallpapers on wallpapers app and also you can generate free AI wallpapers and download it.",
    });
  };
  return (
    <BlurView
      tint="dark"
      intensity={80}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <Image
        transition={100}
        source={{ uri: image }}
        style={{ height: hp(40), width: "80%", borderRadius: 10 }}
        contentFit="cover"
      />
      <View
        style={{
          flexDirection: "row",
          marginTop: 15,
          alignItems: "center",
          gap: wp(8),
        }}
      >
        <Pressable style={styles.btn} onPress={() => router.back()}>
          <Ionicons name="close" size={24} color={"white"} />
        </Pressable>
        <Pressable style={styles.btn} disabled={downloading}>
          {downloading ? (
            <ActivityIndicator size={28} />
          ) : (
            <Octicons
              name="download"
              size={24}
              color={"white"}
              onPress={handleDownloadImage}
            />
          )}
        </Pressable>
        <Pressable
          style={styles.btn}
          onPress={() =>
            router.push({
              pathname: "/ImagePreview",
              params: {
                image,
              },
            })
          }
        >
          <Image
            source={require("@/assets/images/preview.png")}
            style={{ height: 35, width: 35 }}
          />
        </Pressable>
        <Pressable style={styles.btn} onPress={handleShare}>
          <Octicons name="share" size={24} color={"white"} />
        </Pressable>
      </View>
    </BlurView>
  );
};

export default imageModel;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "rgba(255,255,255,0.2)",
    height: hp(6),
    width: wp(12),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderCurve: "continuous",
  },
});
