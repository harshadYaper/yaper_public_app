import { Text, View } from "react-native";
import {
  scaleHeight,
  scaleMargin,
  scalePadding,
} from "../utils/getScaledDimensions";

export default function Instructions({ instruction }) {
  return (
    <View style={{ display: "flex" }}>
      <Text
        style={{
          fontWeight: "500",
          color: "#667085",
          ...scaleMargin(6),
          marginBottom: scaleHeight(12),
          marginTop: scaleHeight(12),
        }}
      >
        Instructions
      </Text>
      <Text
        style={{
          ...scalePadding(12),
          fontSize: 12,

          fontWeight: "700",
          color: "#101828",
          backgroundColor: "#F6E3C0",
          borderColor: "#FDB022",
          borderRadius: 8,
          borderWidth: 1,
        }}
      >
        {instruction}
      </Text>
    </View>
  );
}
