import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";

export default function App({
  Component,
  Splash,
  loading,
  styles,
  options,
  nestMode = "safearea",
}) {
  return (
    <RootSiblingParent>
      {loading ? (
        <View
          style={{ ...styles.LoadingSplash, ...customeStyles.LoadingSplash }}
        >
          <Stack.Screen
            options={{
              headerShown: false,
              ...options,
            }}
          />
          {Splash}
        </View>
      ) : (
        <View style={{ ...customeStyles.Component }}>
          <Stack.Screen
            options={{
              headerShown: false,
              ...options,
            }}
          />
          {nestMode == "safearea" ? (
            Component
          ) : (
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
            >
              {Component}
            </ScrollView>
          )}
        </View>
      )}
    </RootSiblingParent>
  );
}

const customeStyles = StyleSheet.create({
  LoadingSplash: {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  Component: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
});
