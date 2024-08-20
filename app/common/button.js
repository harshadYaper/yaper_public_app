import { Text, TouchableOpacity } from "react-native";
import {
  scaleBorder,
  scaleFont,
  scaleHeight,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { Image } from "expo-image";
import { isEmpty } from "../utils/helper";
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
        width,
        height,
        backgroundColor: disabled ? ClickedbackgroundColor : backgroundColor,
        borderRadius,
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
      }}
      disabled={disabled}
    >
      {isEmpty(imageSource) ? (
        <Text
          style={{
            ...scaleFont(14),
            textAlign: "center",
            textAlignVertical: "center",
            color: textColor,
            ...fontStyles,
          }}
        >
          {title}
        </Text>
      ) : (
        <Image
          contentFit={"contain"}
          source={imageSource}
          style={{
            height: scaleHeight(36),
            width: scaleWidth(36),
          }}
        />
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
  title = ">",
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
    title,
    disabled,
    fontStyles,
    imageSource,
  });
