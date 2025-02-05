import { FlatList, StyleSheet } from "react-native";
import { categories } from "@/constants/data";
import CategoryItem from "./CategoryItem";

const Categories = ({
  handleSelectCategory,
  activeCategory,
}: {
  handleSelectCategory: (value: string | null) => void;
  activeCategory: string | null;
}) => {
  return (
    <FlatList
      data={categories}
      contentContainerStyle={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <CategoryItem
          category={item}
          index={index}
          isActive={item === activeCategory}
          handleSelectCategory={handleSelectCategory}
        />
      )}
      keyExtractor={(item) => item}
    />
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    gap: 8,
  },
});
