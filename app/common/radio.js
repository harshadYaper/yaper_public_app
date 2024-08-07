import { Image } from "expo-image";
import { useState } from "react";
import {
  scaleHeight,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { Text, TouchableOpacity, View } from "react-native";
import { WHITE } from "../constants/colors";

function Radio({
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
  const [checked, setChecked] = useState(selected || false);

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
          backgroundColor: backgroundColor,
          borderRadius,
          borderColor: checked ? ClickedbackgroundColor : borderColor,
          borderWidth: 1,
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
      <Text style={{}}>{label}</Text>
    </View>
  );
}

export const PrimaryRadio = ({
  size = 20,
  backgroundColor = WHITE,
  borderRadius = 100,
  onPress,
  ClickedbackgroundColor = "#025ACE",
  disabled = false,
  borderColor = "#D0D5DD",
  label = "",
  selected,
}) =>
  Radio({
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
