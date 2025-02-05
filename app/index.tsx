import { hp, wp } from "@/constants/Styles";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ImageBackground, Text, View } from "react-native";
import Animated, { FadeInDown, SlideInDown } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

export default function Index() {
  return (
    <View>
      <StatusBar translucent />
      <ImageBackground
        source={require("@/assets/images/welcome1.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <Animated.View
          entering={FadeInDown.duration(600)}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
            marginBottom: hp(8),
          }}
        >
          <LinearGradient
            colors={[
              "rgba(255,255,255,0)",
              "rgba(255,255,255,0.5)",
              "white",
              "white",
            ]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 0.8 }}
            style={{
              width: wp(100),
              height: hp(65),
              bottom: 0,
              position: "absolute",
            }}
          />

          <Animated.Text
            style={{ fontWeight: 500, fontSize: hp(6) }}
            entering={FadeInDown.duration(300)}
          >
            Pixels
          </Animated.Text>
          <Animated.Text
            style={{
              fontWeight: 500,
              marginBottom: hp(3.3),
              marginTop: hp(1.5),
              fontSize: hp(2.3),
              color: "rgba(0,0,0,0.6)",
            }}
            entering={FadeInDown.duration(500)}
          >
            Every Pixel Tells a Story
          </Animated.Text>
          <Animated.View
            entering={FadeInDown.duration(700)}
            style={{
              backgroundColor: "#1B1B1B",
              width: "70%",
              paddingVertical: 15,
              borderRadius: 10,
            }}
          >
            <Link href="/(tabs)">
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 17,
                  color: "white",

                  textAlign: "center",
                }}
              >
                Start Explore
              </Text>
            </Link>
          </Animated.View>
        </Animated.View>
      </ImageBackground>
    </View>
  );
}
