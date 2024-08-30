import { useEffect, useState } from "react";

import { StyleSheet } from "react-native";
import App from "../app";
import Login from "./login";

export default function Auth() {
  const [loading, setLoading] = useState(true);
  const [component, setComponent] = useState([]);

  const [Component, params] = component;

  const setLogin = () => setComponent([Login, { mobile: "9346282733" }]);

  useEffect(() => {
    setLoading(false);
    setLogin();
  }, []);

  return (
    <App
      Component={
        <Component
          setComponent={setComponent}
          setLogin={setLogin}
          {...params}
        />
      }
      Splash={<></>}
      styles={customeStyles}
      loading={loading}
      nestMode="scroll"
    />
  );
}

const customeStyles = StyleSheet.create({});
