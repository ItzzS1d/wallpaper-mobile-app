import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { hp, wp } from "@/constants/Styles";
import Categories from "@/components/Categories";
import ImageGrid from "@/components/ImageGrid";
import { apiCall } from "@/api";
import { filters } from "@/constants/data";

export interface ImageData {
  webformatURL: string;
  imageWidth: number;
  imageHeight: number;
}
let page = 1;

const index = () => {
  const [searchInput, setSearchInput] = useState("");
  const [images, setImages] = useState<ImageData[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const scrollRef = useRef(null);
  function handleCategorySelect(category: string | null) {
    setActiveCategory(category);
    setImages([]);
    page = 1;
    let params = {
      page,
    };
    if (category) params.category = category;
    fetchImages(params, false);
  }

  async function handleSearch() {
    if (searchInput.length > 2) {
      page = 1;
      setImages([]);
      setActiveCategory(null); //clear category when searching
      fetchImages({ page, q: searchInput }, false);
    }
    if (searchInput == "") {
      page = 1;
      setImages([]);
      setActiveCategory(null); //clear category when searching

      fetchImages({ page }, false);
    }
  }

  useEffect(() => {
    const id = setTimeout(handleSearch, 1000);
    return () => clearTimeout(id);
  }, [searchInput]);

  async function fetchImages(params = { page: 1 }, append = true) {
    let res = await apiCall(params);
    if (res.success && res.data.hits) {
      if (append) {
        setImages([...images, ...res.data.hits]);
      } else {
        setImages(res.data.hits);
      }
    }
  }

  const handleScroll = (event) => {
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const scrollOffSet = event.nativeEvent.contentOffset.y;
    const bottomPosition = contentHeight - scrollViewHeight;
    if (scrollOffSet >= bottomPosition - 1) {
      ++page;
      let params = {
        page,
        ...filters,
      };
      if (activeCategory) params.category = activeCategory;
      if (searchInput) params.q = searchInput;
      fetchImages(params);
    }
  };
  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Pressable>
          <Text style={{ fontSize: hp(4), fontWeight: "semibold" }}>
            Pixels
          </Text>
        </Pressable>
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="search" size={24} />
        <TextInput
          placeholder="search for photos"
          style={{ flex: 1 }}
          value={searchInput}
          onChangeText={(value) => setSearchInput(value)}
        />
        {searchInput && (
          <Pressable onPress={() => setSearchInput("")}>
            <Ionicons name="close-circle" size={24} />
          </Pressable>
        )}
      </View>

      <ScrollView
        contentContainerStyle={{ gap: 15 }}
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
        onScroll={handleScroll}
      >
        <Categories
          handleSelectCategory={handleCategorySelect}
          activeCategory={activeCategory}
        />
        {images.length > 0 && (
          <View>
            <ImageGrid images={images} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    paddingHorizontal: hp(2),
    backgroundColor: "#dbdbdb",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: wp(2),
    borderRadius: 10,
    paddingVertical: hp(0.8),
  },
});
