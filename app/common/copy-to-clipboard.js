import { Image, TouchableOpacity } from "react-native";

import { setStringAsync } from "expo-clipboard";
import { COPY } from "../constants/images";
import { scalePadding } from "../utils/getScaledDimensions";

export default function CopyToClipboard({
  value,
  height = 10,
  width = 10,
  tintColor = "white",
}) {
  return (
    <TouchableOpacity
      onPress={async () => await setStringAsync(value)}
      style={{
        ...scalePadding(2),
      }}
    >
      <Image
        resizeMode="contain"
        style={{ height, width, tintColor }}
        source={COPY}
      />
    </TouchableOpacity>
  );
}
