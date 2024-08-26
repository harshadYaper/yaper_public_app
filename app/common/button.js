import { Text, TouchableOpacity } from "react-native";
import {
  scaleBorder,
  scaleFont,
  scaleHeight,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { Image } from "expo-image";
import { WHITE } from "../constants/colors";

function Button({
  height,
  width,
  backgroundColor,
  borderRadius,
  textColor,
  onPress,
  ClickedbackgroundColor,
  title,
  disabled,
  fontStyles,
  imageSource,
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      style={{
        ...{
          width,
          height,
          backgroundColor: disabled ? ClickedbackgroundColor : backgroundColor,
          borderRadius,
          display: "flex",
          alignItems: "center",
        },
      }}
      disabled={disabled}
    >
      {imageSource ? (
        <Image
          contentFit={"contain"}
          source={imageSource}
          style={{
            height: scaleHeight(36),
            width: scaleWidth(36),
          }}
        />
      ) : (
        <Text
          style={{
            ...scaleFont(14, true),
            textAlign: "center",
            width: "100%",
            height: "100%",
            textAlignVertical: "center",
            color: textColor,
            ...fontStyles,
          }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

export const FullButton = ({
  height = scaleHeight(48),
  width = scaleWidth(325),
  backgroundColor = "#025ACE",
  borderRadius = scaleBorder(8),
  textColor = WHITE,
  ClickedbackgroundColor = "#D0D5DD",
  onPress,
  title = "Next",
  disabled = false,
  fontStyles,
}) =>
  Button({
    height,
    width,
    backgroundColor,
    borderRadius,
    textColor,
    ClickedbackgroundColor,
    onPress,
    title,
    disabled,
    fontStyles,
  });

export const SmallButton = ({
  height = scaleHeight(40),
  width = scaleWidth(160),
  backgroundColor = "#025ACE",
  borderRadius = scaleBorder(8),
  textColor = WHITE,
  ClickedbackgroundColor = "#D0D5DD",
  onPress,
  title = "Next",
  disabled = false,
  fontStyles,
}) =>
  Button({
    height,
    width,
    backgroundColor,
    borderRadius,
    textColor,
    ClickedbackgroundColor,
    onPress,
    title,
    disabled,
    fontStyles,
  });

export const MiniButton = ({
  height = scaleHeight(40),
  width = scaleWidth(40),
  backgroundColor = "#025ACE",
  borderRadius = scaleBorder(8),
  textColor = WHITE,
  ClickedbackgroundColor = "#D0D5DD",
  onPress,
  disabled = false,
  fontStyles = scaleFont(24),
  imageSource = require("../../assets/right-arrow.svg"),
}) =>
  Button({
    height,
    width,
    backgroundColor,
    borderRadius,
    textColor,
    ClickedbackgroundColor,
    onPress,
    disabled,
    fontStyles,
    imageSource,
  });
