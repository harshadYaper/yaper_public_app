import { NativeModules } from "react-native";

const { ZendeskModule } = NativeModules;

export function sendReport(error) {
  // crashlytics().recordError(new Error(error));
  // crashlytics().log(error);
}

export function mapUserInSegment({ id, email, first_name, last_name }) {
  // const { identify } = useAnalytics();
  // id &&
  //   identify(id.toString(), {
  //     email: email,
  //     firstName: first_name,
  //     last_name: last_name,
  //   });
  // ZendeskModule.initSdk(`${first_name} ${last_name}`, email);
}

export function trackEvent({ event, properties }) {
  // const { track } = useAnalytics();
  // track(event, properties);
}

export function trackScreen({ screenName, properties }) {
  // const { screen } = useAnalytics();
  // screen(screenName, properties);
}

export function logoutAnalytics() {
  // const { flush } = useAnalytics();
  // flush();
}
