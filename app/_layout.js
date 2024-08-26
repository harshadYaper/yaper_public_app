import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "./store";
import { init, wrap } from "@sentry/react-native";
import { getAppVariables } from "./utils/environment";
import { useEffect } from "react";
import { requestPermissionsAsync } from "expo-notifications";
import { initializeNotification } from "./utils/analytics";

function HomeLayout() {
  useEffect(() => {
    (async () => {
      let { sentryDSN, sentryDebug, oneSignalKey } = await getAppVariables();
      init({
        dsn: sentryDSN,
        debug: sentryDebug,
      });
      let { granted } = await requestPermissionsAsync();
      granted && initializeNotification(oneSignalKey);
    })();
  }, []);

  return (
    <Provider store={store}>
      <Stack />
    </Provider>
  );
}

export default wrap(HomeLayout);
