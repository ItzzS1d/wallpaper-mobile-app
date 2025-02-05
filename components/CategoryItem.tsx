import { Pressable, StyleSheet, Text } from "react-native";
import { hp, wp } from "@/constants/Styles";
import Animated, { FadeIn, FadeInRight } from "react-native-reanimated";

const CategoryItem = ({
  category,
  index,
  handleSelectCategory,
  isActive,
}: {
  category: string;
  index: number;
  handleSelectCategory: (value: string | null) => void;
  isActive: boolean;
}) => {
  const color = isActive ? "white" : "blank";
  const backgroundColor = isActive ? "black" : "white";

  return (
    <Animated.View
      entering={FadeInRight.delay(index * 200)
        .duration(1000)
        .springify()
        .damping(14)}
    >
      <Pressable
        style={[styles.category, isActive && { backgroundColor }]}
        onPress={() =>
          isActive ? handleSelectCategory(null) : handleSelectCategory(category)
        }
      >
        <Text style={[styles.title, { color }]}>{category}</Text>
      </Pressable>
    </Animated.View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  category: {
    backgroundColor: "white",
    paddingVertical: wp(2.5),
    paddingHorizontal: wp(4),
    borderRadius: wp(3),
  },
  title: {
    fontSize: hp(1.8),
    fontWeight: "semibold",
  },
});
