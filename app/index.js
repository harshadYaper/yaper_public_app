import { useDispatch, useSelector } from "react-redux";
import App from "./app";
import React, { useEffect, useState } from "react";
import { sleep } from "./utils/helper";
import Splash from "./splash";
import Home from "./home";
import Welcome from "./welcome";
import { getConnection } from "./common/make-request";
import { getData } from "./storage";
import { getAppVariables } from "./utils/environment";
import Auth from "./auth";
import { mapUserInSegment } from "./utils/analytics";
import { loadAsync } from "expo-font";
import { Inter_400Regular } from "@expo-google-fonts/inter";

export default function Yaper() {
  const { intro: showedIntro } = useSelector((state) => state.intro) || false;
  const { token } = useSelector((state) => state.token) || {};
  const user = useSelector((state) => state.user) || {};

  const [appIsloading, setAppIsLoad] = useState(true);

  const dispatch = useDispatch();

  async function onAppStartup() {
    try {
      await loadAsync({ Inter_400Regular });
      dispatch({
        type: "NETWORK",
        payload: {
          network: await getConnection(),
        },
      });

      dispatch({
        type: "SHOWED_INTRO",
        payload: {
          intro: true, //await getData("SHOWED_INTRO")
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

      await sleep(1500); // need to remove this
      user && (await mapUserInSegment(user));
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
      Splash={<Splash />}
      styles={{
        LoadingSplash: {
          backgroundColor: "#025ACE",
        },
      }}
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
