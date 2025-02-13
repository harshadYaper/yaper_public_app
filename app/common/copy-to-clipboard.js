import { TouchableOpacity } from "react-native";

import { setStringAsync } from "expo-clipboard";
import { COPY } from "../constants/images";
import {
  scaleHeight,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { Image } from "expo-image";
import showToast from "../utils/toast";

export default function CopyToClipboard({
  value,
  height = scaleHeight(15),
  width = scaleWidth(15),
  tintColor = "white",
}) {
  return (
    <TouchableOpacity
      onPress={async () => await setStringAsync(value.toString())}
      style={{
        ...scalePadding(2),
      }}
    >
      <Image
        contentFit="contain"
        style={{ height, width, tintColor }}
        source={COPY}
      />
    </TouchableOpacity>
  );
}

export async function copyToClipboard({ value, message }) {
  await setStringAsync(value.toString());
  showToast({ message, type: "success" });
}
