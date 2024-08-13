import { Image } from "expo-image";
import { useState } from "react";
import {
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
}) {
  const [checked, setChecked] = useState(selected);

  return (
    <View style={{ display: "flex", flexDirection: "row", ...scalePadding(6) }}>
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
          borderWidth: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginRight: scaleWidth(8),
        }}
      >
        <Image
          contentFit={"contain"}
          source={require("../../assets/check.svg")}
          height={scaleHeight(14)}
          width={scaleWidth(14)}
        />
      </TouchableOpacity>
      <Text style={{}}>{label}</Text>
    </View>
  );
}

export const PrimaryCheckBox = ({
  size = 20,
  backgroundColor = WHITE,
  borderRadius = 6,
  onPress,
  ClickedbackgroundColor = "#025ACE",
  disabled = false,
  borderColor = "#D0D5DD",
  label = "",
  selected = false,
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
  });
