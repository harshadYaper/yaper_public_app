import { Pressable, Text, View } from "react-native";
import { STONE, WHITE } from "../constants/colors";
import { snakeToTitleize } from "../utils/helper";
import { scalePadding, scaleWidth } from "../utils/getScaledDimensions";

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
          borderRadius: 20,
          maxWidth: scaleWidth(160),
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
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                ...scalePadding(5),
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: option == val[parameter] ? WHITE : "#848482",
                  backgroundColor: option == val[parameter] ? "#F67280" : STONE,
                  borderRadius: 10,
                  borderColor: option == val[parameter] ? "#F67280" : STONE,
                  ...scalePadding(5),
                  borderWidth: 2,
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
