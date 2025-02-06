import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { hp, wp } from "@/constants/Styles";
import { StatusBar } from "expo-status-bar";
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import OpenAi from "openai";
import { Image } from "expo-image";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import { Link } from "expo-router";
import SkeletonLoader from "@/components/Skeleton";
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
const Ai = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [downloading, setIsDownloading] = useState(false);

  const client = new OpenAi({
    apiKey:
      "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",
  });
  const handleGenerateImg = async () => {
    if (!prompt) return Alert.alert("failed", "Prompt is required");

    try {
      setLoading(true);
      setImage("");
      const res = await client.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        size: "1024x1792",
        quality: "hd",
        n: 1,
      });

      setImage(res.data[0].url!);
    } catch (error) {
      console.log(error);
      Alert.alert("Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

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
    } catch (error) {
      console.error("Download Error:", error);
      Alert.alert("Error", "Something went wrong!");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <View style={styles.headerContainer}>
        <Text style={{ fontSize: hp(2.5) }}>AI Image Gen</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          multiline
          placeholder="Type a prompt"
          style={{ flex: 1 }}
          onChangeText={(value) => setPrompt(value.trim())}
        />
        <Pressable onPress={handleGenerateImg} disabled={loading}>
          <Ionicons
            name={`${loading ? "send-outline" : "send"}`}
            size={24}
            color="black"
          />
        </Pressable>
      </View>
      {loading && <SkeletonLoader />}
      {image ? (
        <View>
          <Image
            source={{ uri: image }}
            placeholder={{ blurhash }}
            style={{
              width: "100%",
              height: "83%",
              marginTop: hp(0.5),
            }}
            contentFit="cover"
            transition={500}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
              justifyContent: "center",
              paddingRight: wp(3),
              paddingTop: hp(1),
            }}
          >
            <Link
              href={{
                pathname: "/ImagePreview",
                params: {
                  image: encodeURIComponent(image),
                },
              }}
              style={{
                backgroundColor: "#1b1b1b",
                padding: 8,
                paddingHorizontal: wp(7),
                borderRadius: 5,
              }}
            >
              <Text
                style={{ fontSize: hp(2), fontWeight: "500", color: "white" }}
              >
                Preview
              </Text>
            </Link>
            {downloading ? (
              <Text
                style={{
                  padding: 8,
                  paddingHorizontal: wp(12),
                  borderRadius: 5,
                }}
              >
                downloading...
              </Text>
            ) : (
              <Pressable
                onPress={handleDownloadImage}
                style={{
                  backgroundColor: "#1b1b1b",
                  padding: 8,
                  paddingHorizontal: wp(12),
                  borderRadius: 5,
                }}
              >
                <Feather name="download" size={22} color="white" />
              </Pressable>
            )}
          </View>
        </View>
      ) : (
        !loading && (
          <View
            style={{
              paddingHorizontal: wp(2),
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="images" size={80} color="black" />
            <Text style={{ fontSize: hp(2), marginTop: 5 }}>
              Add a prompt and start generating
            </Text>
          </View>
        )
      )}
    </SafeAreaView>
  );
};

export default Ai;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    paddingHorizontal: wp(2),
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: hp(2),
  },
  inputContainer: {
    marginTop: hp(1),
    marginHorizontal: wp(2),
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
  },
});
