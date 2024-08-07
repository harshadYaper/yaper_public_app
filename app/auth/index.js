import { useEffect, useState } from "react";

import { StyleSheet } from "react-native";
import App from "../app";
import Login from "./login";

export default function Auth() {
  const [loading, setLoading] = useState(true);
  const [component, setComponent] = useState([Login, { mobile: "9130103785" }]);
  const [Component, params] = component;

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <App
      Component={<Component setComponent={setComponent} {...params} />}
      Splash={<></>}
      styles={customeStyles}
      loading={loading}
    />
  );
}

const customeStyles = StyleSheet.create({});
