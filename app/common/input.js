import { StyleSheet, Text, TextInput, View } from "react-native";
import {
  scaleBorder,
  scaleFont,
  scaleHeight,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { isIOS } from "../utils/environment";

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
  editable = true,
  leftComponent,
  rightComponent,
  secureFields,
  multiline = false,
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
                multiline={multiline}
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
                  ...(!editable && { color: "#667085" }),
                  ...style.Input,
                }}
                placeholder={placeholder}
                placeholderTextColor="#D8D8DC"
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
    ...scaleFont(20),
    fontWeight: "500",
    color: "#344054",
    ...scalePadding(6),
  },
  Input: (width) => ({
    ...{
      width: scaleWidth(width),
      backgroundColor: "white",
      minHeight: scaleHeight(44),
      textAlignVertical: "center",
      borderRadius: scaleBorder(8),
      borderColor: "#D0D5DD",
      borderWidth: scaleWidth(2),
      ...scaleFont(16),
      ...scalePadding(6),
      color: "#101828",
    },
    ...(isIOS && { paddingTop: scaleHeight(0) }),
  }),
  Hint: {
    ...scaleFont(12),
    color: "#ABB0BC",
    ...scalePadding(6),
  },
});
