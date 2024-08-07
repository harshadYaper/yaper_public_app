import { Dimensions, PixelRatio, Platform } from "react-native";

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  fontScale,
} = Dimensions.get("window");

// iphone dimensions 375*812
const normalizedWidth = SCREEN_WIDTH / 375;
const normalizedHeight = SCREEN_HEIGHT / 812;

const getScaledDimensions = (size, normalValue) => {
  return (
    Math.round(PixelRatio.roundToNearestPixel(size * normalValue)) -
    (Platform.OS === "ios" ? 0 : 1)
  );
};

export const scaleFont = (size) => size / fontScale;

export const scaleWidth = (size) => getScaledDimensions(size, normalizedWidth);

export const scaleHeight = (size) =>
  getScaledDimensions(size, normalizedHeight);

export function scalePadding(size) {
  return {
    paddingLeft: scaleWidth(size),
    paddingRight: scaleWidth(size),
    paddingTop: scaleHeight(size),
    paddingBottom: scaleHeight(size),
  };
}

export function scaleMargin(size) {
  return {
    marginLeft: scaleWidth(size),
    marginRight: scaleWidth(size),
    marginTop: scaleHeight(size),
    marginBottom: scaleHeight(size),
  };
}
