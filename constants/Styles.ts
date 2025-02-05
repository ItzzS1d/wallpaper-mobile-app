import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export const hp = (percentage: number) => {
  return (percentage * height) / 100;
};
export const wp = (percentage: number) => {
  return (percentage * width) / 100;
};

export const getColumnCount = () => {
  if (width >= 1024) {
    return 4;
  } else if (width >= 768) {
    return 3;
  } else {
    return 2;
  }
};

export const getImageSize = (height: number, width: number) => {
  if (width > height) {
    //landscape
    return 250;
  } else if (width < height) {
    //portraid
    return 300;
  } else {
    //square
    return 200;
  }
};
