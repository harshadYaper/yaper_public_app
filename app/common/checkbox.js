import { Image } from "expo-image";
import { useState } from "react";
import {
  scaleBorder,
  scaleFont,
  scaleHeight,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { Text, TouchableOpacity, View } from "react-native";
import { WHITE } from "../constants/colors";

function CheckBox({
  size,
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

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        ...scalePadding(6),
        ...styles,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          setChecked(!checked);
          onPress();
        }}
        disabled={disabled}
        style={{
          width: size,
          height: size,
          backgroundColor: checked ? ClickedbackgroundColor : backgroundColor,
          borderRadius,
          borderColor: checked ? backgroundColor : borderColor,
          borderWidth: scaleWidth(2),
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          contentFit={"contain"}
          source={require("../../assets/check.svg")}
          height={scaleHeight(14)}
          width={scaleWidth(14)}
        />
      </TouchableOpacity>
      <Text style={{ paddingLeft: scaleWidth(12), ...scaleFont(14) }}>
        {label}
      </Text>
    </View>
  );
}

export const PrimaryCheckBox = ({
  size = 20,
  backgroundColor = WHITE,
  borderRadius = scaleBorder(4),
  onPress,
  ClickedbackgroundColor = "#025ACE",
  disabled = false,
  borderColor = "#D0D5DD",
  label = "",
  selected = false,
  styles,
}) =>
  CheckBox({
    size,
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
