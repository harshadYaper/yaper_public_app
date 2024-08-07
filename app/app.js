import { Stack } from "expo-router";
import { SafeAreaView, StyleSheet, View } from "react-native";

export default function App({ Component, Splash, loading, styles, options }) {
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
      {Component}
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
