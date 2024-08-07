import { useEffect, useState } from "react";

import { StyleSheet, TouchableOpacity } from "react-native";
import App from "../app";
import PAN from "./pan";
import { Image } from "expo-image";

export default function KYC() {
  const [loading, setLoading] = useState(true);
  const [component, setComponent] = useState([PAN, "Verify PAN", {}]);

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
          fontSize: 16,

          fontWeight: "500",
        },
        headerShown: true,
        title,
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
