import { Text, TouchableOpacity, View } from "react-native";
import { STONE, WHITE } from "../constants/colors";
import { snakeToTitleize } from "../utils/helper";
import { scaleMargin, scalePadding } from "../utils/getScaledDimensions";

export default function Toggle({ options, setVal, val, parameter, onChange }) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: STONE,
        borderRadius: 10,
        ...scalePadding(5),
        ...scaleMargin(10),
      }}
    >
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          onPress={() => {
            let value = options.find((i) => i === option);
            let performOnChange = value !== val[parameter];
            setVal({
              ...val,
              [parameter]: value,
            });
            performOnChange && onChange({ value });
          }}
        >
          <View
            style={{
              display: "flex",
              borderColor: STONE,
              backgroundColor: STONE,
              flexDirection: "row",
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
        </TouchableOpacity>
      ))}
    </View>
  );
}
