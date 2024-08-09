import { Image, ImageBackground } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";
import {
  scaleHeight,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";

export default function CategoryView({ category, options, backgroundImage }) {
  return (
    <View style={{ width: "100%" }}>
      <Text
        style={{
          fontWeight: "700",
          color: "#667085",
          marginBottom: scaleHeight(24),
          marginTop: scaleHeight(24),
        }}
      >
        {category}
      </Text>
      <ImageBackground
        style={{
          ...scalePadding(20),
          backgroundColor: "#FFFFFF",
          borderRadius: 8,
        }}
        {...backgroundImage}
      >
        {options.map(({ label, onPress }, ind) => (
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: ind == 0 ? scaleHeight(0) : scaleHeight(20),
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
