import { StyleSheet, Text, TextInput, View } from "react-native";
import {
  scaleFont,
  scaleHeight,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";

export default function Input({
  label,
  hint,
  placeholder,
  maxLength,
  keyboardType,
  onChange,
  errorMessage,
  width = 325,
  reference,
  inputArray,
  style = {},
  usageType,
  editable,
  leftComponent,
  rightComponent,
  secureFields,
}) {
  return (
    <View key={label}>
      {label && (
        <Text
          style={{
            ...customStyles.Label,
            ...style.Label,
          }}
        >
          {label}
        </Text>
      )}

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          ...style.InputGroup,
        }}
      >
        {leftComponent && leftComponent}

        {inputArray &&
          inputArray.map((input, ind) => {
            return (
              <TextInput
                secureTextEntry={secureFields}
                key={usageType + " " + ind}
                ref={(r) => reference && (reference.current[ind] = r)}
                maxLength={maxLength}
                onChangeText={(val) => {
                  onChange(val, ind);
                }}
                editable={editable}
                value={input}
                keyboardType={keyboardType}
                style={{
                  ...customStyles.Input(width),
                  ...style.Input,
                }}
                placeholder={placeholder}
              />
            );
          })}

        {rightComponent && rightComponent}
      </View>

      {hint && <Text style={customStyles.Hint}>{hint}</Text>}
    </View>
  );
}

const customStyles = StyleSheet.create({
  Label: {
    fontSize: scaleFont(20),
    fontWeight: "500",
    color: "#344054",
    ...scalePadding(6),
  },
  Input: (width) => ({
    width: scaleWidth(width),
    backgroundColor: "white",
    height: scaleHeight(44),
    textAlignVertical: "center",
    borderRadius: 8,
    borderColor: "#D0D5DD",
    borderWidth: 1,
    fontSize: scaleFont(16),
    ...scalePadding(10),
  }),
  Hint: {
    fontSize: scaleFont(12),
    color: "#ABB0BC",
    ...scalePadding(6),
  },
});
