import { useEffect, useState } from "react";
import { Text } from "react-native";
import { scaleFont } from "../utils/getScaledDimensions";

export default function Timer({ time, styles, content, showMins = true }) {
  const [timer, setTimer] = useState();

  useEffect(() => setTimer(time), [time]);

  const timeFormatter = (val) => (val <= 9 ? "0" + val.toString() : val);

  useEffect(() => {
    timer && setTimeout(() => setTimer((p) => (p > 0 ? p - 1 : 0)), 1000);
  }, [timer]);

  return (
    <Text
      style={{
        ...scaleFont(10),
        fontWeight: "700",
        textAlign: "center",
        textAlignVertical: "center",
        ...styles,
      }}
    >
      {content
        ? content
        : `${timeFormatter(parseInt(timer / 60))}:${timeFormatter(
            parseInt(timer % 60)
          )} ${showMins ? "mins" : ""}`}
    </Text>
  );
}
