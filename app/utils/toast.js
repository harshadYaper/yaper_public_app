import RNToast from "react-native-root-toast";
import {
  scaleBorder,
  scaleFont,
  scalePadding,
  scaleWidth,
} from "./getScaledDimensions";

export default function showToast({
  message,
  type = "default",
  duration = 500,
}) {
  const CONFIG = {
    success: {
      backgroundColor: "#12B76A",
    },
    error: {
      backgroundColor: "#F04438",
    },
    warn: {
      backgroundColor: "#F79009",
    },
    info: {
      backgroundColor: "#025ACE",
    },
    default: {
      backgroundColor: "#000000",
    },
  };

  message &&
    RNToast.show(message, {
      ...{
        duration,
        animation: true,
        hideOnPress: true,
        containerStyle: {
          borderRadius: scaleBorder(10),
          ...scalePadding(8),
          paddingLeft: scaleWidth(16),
          paddingRight: scaleWidth(16),
          zIndex: 1000,
        },
        textStyle: { color: "#FFFFFF", fontWeight: "500", ...scaleFont(12) },
      },
      ...CONFIG[type],
    });
}
