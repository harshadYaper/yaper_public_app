import { useEffect, useState } from "react";

import { StyleSheet } from "react-native";
import App from "../app";
import Template from "./template";
import { LeftComp, RightComp } from "./header";

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
      ///////// giving error Warning: React has detected a change in the order of Hooks called by HeaderConfig
      options={{
        title: "",
        headerShown: true,
        headerLeft: LeftComp,
        headerRight: RightComp,
        headerStyle: { backgroundColor: "#CEE3FF" },
      }}
      /////////
    />
  );
}

const customeStyles = StyleSheet.create({});
