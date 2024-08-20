import { useEffect, useState } from "react";

import { Share, StyleSheet, TouchableOpacity } from "react-native";
import App from "../app";
import Deal from "./deal";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import Order from "./order";
import {
  scaleFont,
  scaleHeight,
  scaleWidth,
} from "../utils/getScaledDimensions";

export default function Details() {
  const [loading, setLoading] = useState(true);
  const [component, setComponent] = useState([Deal, {}]);
  const [Component, params] = component;
  const { key, id, deal_id } = useLocalSearchParams();

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
          ...scaleFont(16),

          fontWeight: "500",
        },
        headerShown: true,
        title: key == "order" ? "Order Details" : "Deal Details",
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
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
        headerRight: () => (
          <TouchableOpacity
            onPress={
              async () =>
                await Share.share({
                  message: `https://yaper.co/deal/${deal_id || id}`,
                }) // change this
            }
          >
            <Image
              source={require("../../assets/icons/Share.svg")}
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
