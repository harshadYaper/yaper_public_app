import { useEffect, useState } from "react";

import { StyleSheet, TouchableOpacity } from "react-native";
import App from "../app";
import PAN from "./pan";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import BankDetails from "./bank_details";
import {
  scaleFont,
  scaleHeight,
  scaleWidth,
} from "../utils/getScaledDimensions";

export default function KYC() {
  const { pan_verified } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(true);
  const [component, setComponent] = useState([
    pan_verified ? BankDetails : PAN,
    pan_verified ? "Bank Account Details" : "Verify PAN",
    {},
  ]);

  const [Component, title, params] = component;

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <App
      Component={<Component setComponent={setComponent} {...params} />}
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
        title,
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
      }}
    />
  );
}

const customeStyles = StyleSheet.create({});
