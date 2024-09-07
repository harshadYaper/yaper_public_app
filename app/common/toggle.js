import { Pressable, Text, View } from "react-native";
import { STONE, WHITE } from "../constants/colors";
import { snakeToTitleize } from "../utils/helper";
import {
  scaleBorder,
  scaleFont,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";

export default function Toggle({ options, setVal, val, parameter, onChange }) {
  return (
    <View style={{ ...scalePadding(4) }}>
      <View
        key={parameter}
        style={{
          display: "flex",
          flexDirection: "row",
          ...scalePadding(4),
          justifyContent: "center",
          alignItems: "center",
          borderColor: STONE,
          backgroundColor: STONE,
          borderRadius: scaleBorder(20),
        }}
      >
        {options.map((option) => (
          <Pressable
            key={option}
            onPress={() => {
              let value = options.find((i) => i === option);
              if (value !== val[parameter]) {
                setVal((v) => ({ ...v, [parameter]: value }));
                onChange(value);
              }
            }}
            style={{ ...scalePadding(4) }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                ...scalePadding(4),
                backgroundColor: option == val[parameter] ? "#F67280" : STONE,
                borderColor: option == val[parameter] ? "#F67280" : STONE,
                borderRadius: scaleBorder(10),
                borderWidth: scaleWidth(2),
              }}
            >
              <Text
                style={{
                  ...scaleFont(14),
                  textAlign: "center",
                  color: option == val[parameter] ? WHITE : "#848482",
                }}
              >
                {snakeToTitleize(option)}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
