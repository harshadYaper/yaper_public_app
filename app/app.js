import { Stack } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

export default function App({
  Component,
  Splash,
  loading,
  styles,
  options,
  nestMode = "safearea",
}) {
  return loading ? (
    <View style={{ ...styles.LoadingSplash, ...customeStyles.LoadingSplash }}>
      <Stack.Screen
        options={{
          headerShown: false,
          ...options,
        }}
      />
      {Splash}
    </View>
  ) : (
    <SafeAreaView style={{ ...customeStyles.Component }}>
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
    </SafeAreaView>
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
