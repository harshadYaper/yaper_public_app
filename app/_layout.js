import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "./store";
import { init, wrap } from "@sentry/react-native";
import { getAppVariables } from "./utils/environment";
import { useEffect } from "react";
import { OneSignal } from "react-native-onesignal";
import { requestPermissionsAsync } from "expo-notifications";

function HomeLayout() {
  useEffect(() => {
    (async () => {
      let { sentryDSN, sentryDebug, oneSignalKey } = await getAppVariables();
      // init({
      //   dsn: sentryDSN,
      //   debug: sentryDebug,
      // });
      let { granted } = await requestPermissionsAsync();
      granted && OneSignal.initialize(oneSignalKey);
    })();
  }, []);

  return (
    <Provider store={store}>
      <Stack />
    </Provider>
  );
}

export default wrap(HomeLayout);
