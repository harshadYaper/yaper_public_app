import { useEffect, useState } from "react";

import { StyleSheet, TouchableOpacity } from "react-native";
import App from "../app";
import Template from "./template";
import { Image } from "expo-image";
import { router } from "expo-router";

export default function Profile() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <App
      Component={<Template />}
      Splash={<></>}
      styles={customeStyles}
      loading={loading}
      options={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: "#101828",
          fontSize: 16,

          fontWeight: "500",
        },
        headerShown: true,
        title: "My Profile",
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              source={require("../../assets/icons/CaretLeft.svg")}
              style={{ height: 24, width: 24, tintColor: "#101828" }}
            />
          </TouchableOpacity>
        ),
      }}
    />
  );
}

const customeStyles = StyleSheet.create({});
