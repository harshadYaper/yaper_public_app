import { Text, View } from "react-native";
import {
  scaleBorder,
  scaleFont,
  scaleHeight,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";

export default function Instructions({ instruction }) {
  return (
    <View
      style={{
        display: "flex",
        paddingBottom: scaleHeight(12),
        paddingTop: scaleHeight(12),
      }}
    >
      <Text
        style={{
          ...scaleFont(14),
          fontWeight: "500",
          color: "#667085",
          ...scalePadding(6),
          paddingBottom: scaleHeight(12),
        }}
      >
        Instructions
      </Text>
      <Text
        style={{
          ...scalePadding(12),
          ...scaleFont(12),
          fontWeight: "700",
          color: "#101828",
          backgroundColor: "#F6E3C0",
          borderColor: "#FDB022",
          borderRadius: scaleBorder(8),
          borderWidth: scaleWidth(2),
        }}
      >
        {instruction}
      </Text>
    </View>
  );
}
