import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  scaleFont,
  scaleHeight,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { useEffect, useState } from "react";
import App from "../app";
import Tickets from "./tickets";
import Conversations from "./conversations";

export default function Support() {
  const { key } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <App
      Component={key == "tickets" ? <Tickets /> : <Conversations />}
      styles={customeStyles}
      loading={loading}
      options={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: "#101828",
          ...scaleFont(16),
          fontWeight: "500",
        },
        headerShown: true,
        title: key == "tickets" ? "My Tickets" : "Support",
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <Image
              source={require("../../assets/icons/CaretLeft.svg")}
              style={{
                height: scaleHeight(24),
                width: scaleWidth(24),
                tintColor: "#101828",
              }}
            />
          </TouchableOpacity>
        ),
      }}
    />
  );
}

const customeStyles = StyleSheet.create({});
