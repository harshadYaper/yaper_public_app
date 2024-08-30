import { Image } from "expo-image";
import { useEffect, useState } from "react";
import {
  scaleBorder,
  scaleFont,
  scaleHeight,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { Pressable, Text, TouchableOpacity } from "react-native";
import { WHITE } from "../constants/colors";

function Radio({
  width,
  height,
  backgroundColor,
  borderRadius,
  onPress,
  ClickedbackgroundColor,
  disabled,
  borderColor,
  label,
  selected,
  styles,
}) {
  const [checked, setChecked] = useState(selected);

  useEffect(() => {
    setChecked(selected);
  }, [selected]);

  const handlePress = () => {
    setChecked(!checked);
    onPress();
  };

  return (
    <Pressable
      style={{
        display: "flex",
        flexDirection: "row",
        ...scalePadding(6),
        ...styles,
        alignItems: "center",
      }}
      onPress={handlePress}
    >
      <TouchableOpacity
        onPress={handlePress}
        disabled={disabled}
        style={{
          width: scaleWidth(width),
          height: scaleHeight(height),
          backgroundColor: backgroundColor,
          borderRadius,
          borderColor: checked ? ClickedbackgroundColor : borderColor,
          borderWidth: scaleWidth(2),
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginRight: scaleWidth(8),
        }}
      >
        <Image
          contentFit={"contain"}
          source={require("../../assets/radio.svg")}
          height={scaleHeight(8)}
          width={scaleWidth(8)}
          style={{
            tintColor: checked ? ClickedbackgroundColor : backgroundColor,
          }}
        />
      </TouchableOpacity>
      <Text style={{ ...scaleFont(14) }}>{label}</Text>
    </Pressable>
  );
}

export const PrimaryRadio = ({
  width = 20,
  height = 22,
  backgroundColor = WHITE,
  borderRadius = scaleBorder(100),
  onPress,
  ClickedbackgroundColor = "#025ACE",
  disabled = false,
  borderColor = "#D0D5DD",
  label = "",
  selected = false,
  styles,
}) =>
  Radio({
    width,
    height,

    backgroundColor,
    borderRadius,
    onPress,
    ClickedbackgroundColor,
    disabled,
    borderColor,
    label,
    selected,
    styles,
  });
