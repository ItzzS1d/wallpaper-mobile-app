import { Image, StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "blank",
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,

          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={`${focused ? "home" : "home-outline"}`}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Ai"
        options={{
          title: "AI",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require("@/assets/images/ai.png")}
              style={{ width: 24, height: 24 }}
              resizeMode="cover"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
