import { useEffect, useState } from "react";

import { StyleSheet, TouchableOpacity } from "react-native";
import App from "../app";
import Deal from "./deal";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import Order from "./order";

export default function Details() {
  const [loading, setLoading] = useState(true);
  const [component, setComponent] = useState([Deal, {}]);
  const [Component, params] = component;
  const { key } = useLocalSearchParams();

  useEffect(() => {
    setLoading(false);
    key == "order" && setComponent([Order, {}]);
  }, []);

  return (
    <App
      Component={<Component {...params} />}
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
        title: key == "order" ? "Order Details" : "Deal Details",
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              source={require("../../assets/icons/CaretLeft.svg")}
              style={{ height: 24, width: 24, tintColor: "#101828" }}
            />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <Image
            source={require("../../assets/icons/Share.svg")}
            style={{ height: 24, width: 24, tintColor: "#101828" }}
          />
        ),
      }}
    />
  );
}

const customeStyles = StyleSheet.create({});
