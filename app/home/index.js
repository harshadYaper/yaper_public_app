import { useEffect, useState } from "react";

import { StyleSheet } from "react-native";
import App from "../app";
import Template from "./template";

export default function Home() {
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
    />
  );
}

const customeStyles = StyleSheet.create({});
