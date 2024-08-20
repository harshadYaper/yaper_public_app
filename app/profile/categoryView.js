import { Image, ImageBackground } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";
import {
  scaleBorder,
  scaleFont,
  scaleHeight,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";

export default function CategoryView({
  category,
  options,
  backgroundImage,
  optionPadding,
}) {
  return (
    <View
      style={{
        width: "100%",
        paddingTop: scaleHeight(12),
        paddingBottom: scaleHeight(12),
      }}
    >
      <Text
        style={{
          ...scaleFont(14),
          fontWeight: "700",
          color: "#667085",
          paddingBottom: scaleHeight(20),
        }}
      >
        {category}
      </Text>
      <ImageBackground
        style={{
          ...scalePadding(20),
          backgroundColor: "#FFFFFF",
          borderRadius: scaleBorder(8),
        }}
        {...backgroundImage}
      >
        {options.map(({ label, onPress }, ind) => (
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              paddingTop: scaleHeight(ind == 0 ? 0 : optionPadding || 20),
            }}
            onPress={onPress}
            disabled={!onPress}
            key={label + ind}
          >
            <Text
              style={{
                fontWeight: "500",
                color: "#667085",
                flex: 1,
                ...scaleFont(14),
              }}
            >
              {label}
            </Text>
            {onPress && (
              <Image
                source={require("../../assets/icons/CaretRight.svg")}
                style={{ height: scaleHeight(20), width: scaleWidth(20) }}
              />
            )}
          </TouchableOpacity>
        ))}
      </ImageBackground>
    </View>
  );
}
