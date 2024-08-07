import { useDispatch, useSelector } from "react-redux";
import App from "./app";
import React, { useEffect, useState } from "react";
import { sleep } from "./utils/helper";
import { StyleSheet } from "react-native";
import {
  scaleFont,
  scaleHeight,
  scaleWidth,
} from "./utils/getScaledDimensions";
import Splash from "./splash";
import Home from "./home";
import Welcome from "./welcome";
import { getConnection } from "./common/make-request";
import { getData } from "./storage";
import { getAppVariables } from "./utils/environment";
import Auth from "./auth";

export default function Yaper() {
  const [appIsloading, setAppIsLoad] = useState(true);
  const { intro: showedIntro } = useSelector((state) => state.intro) || false;

  const { token } = useSelector((state) => state.token) || {};

  const dispatch = useDispatch();

  async function onAppStartup() {
    try {
      dispatch({
        type: "NETWORK",
        payload: {
          network: await getConnection(),
        },
      });

      dispatch({
        type: "SHOWED_INTRO",
        payload: {
          intro: await getData("SHOWED_INTRO"),
        },
      });

      dispatch({
        type: "PARAMS",
        payload: { params: {} },
      });

      dispatch({
        type: "TOKEN",
        payload: { ...(await getData("TOKEN")) },
      });

      dispatch({
        type: "USER",
        payload: { ...(await getData("USER")) },
      });

      dispatch({
        type: "LOGS",
        payload: { log: (await getAppVariables()).log },
      });

      await sleep(1000); // need to remove this
    } catch (e) {
      console.log(e);
    } finally {
      setAppIsLoad(false);
    }
  }
  useEffect(() => {
    onAppStartup();
  }, []);

  return appIsloading ? (
    <App
      Splash={<Splash customeStyles={customeStyles} />}
      styles={customeStyles}
      loading={appIsloading}
    />
  ) : showedIntro ? (
    token ? (
      <Home />
    ) : (
      <Auth />
    )
  ) : (
    <Welcome />
  );
}

const customeStyles = StyleSheet.create({
  LoadingSplash: {
    backgroundColor: "#025ACE",
  },
  Logo: { height: scaleWidth(707), justifyContent: "center" },
  Footer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
  },
  SecureIcon: {
    flexDirection: "row",
    alignItems: "center",
    width: scaleWidth(155),
    height: scaleHeight(20),
    marginBottom: scaleHeight(20),
  },
  FooterText: {
    width: scaleWidth(126),
    height: scaleHeight(30),
    textAlign: "center",
    fontSize: scaleFont(10),
  },
});
