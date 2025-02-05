import { hp } from "@/constants/Styles";
import React, { useEffect } from "react";
import { View, Animated, StyleSheet, Dimensions } from "react-native";

const SkeletonLoader = () => {
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.skeleton,
          {
            opacity,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "83%",
    marginTop: hp(0.5),
    backgroundColor: "gray",
  },
  skeleton: {
    width: "100%",
    height: "100%",
    backgroundColor: "#e1e1e1",
  },
});

export default SkeletonLoader;
