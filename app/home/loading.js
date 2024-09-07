import { Image } from "expo-image";
import { View } from "react-native";
import { scaleHeight, scaleWidth } from "../utils/getScaledDimensions";

export default function Loading({ fetching, reachedEnd }) {
  if (reachedEnd && fetching)
    return (
      <View
        style={{
          width: "100%",
          alignItems: "center",
          paddingBottom: scaleHeight(20),
          paddingTop: scaleHeight(20),
        }}
      >
        <Image
          source={require("../../assets/loading.gif")}
          style={{ height: scaleHeight(20), width: scaleWidth(35) }}
        />
      </View>
    );
}
