import { Linking } from "react-native";
// import { OneSignal } from "react-native-onesignal";


export function sendReport(error) {
  // crashlytics().recordError(new Error(error));
  // crashlytics().log(error);
}

export const initializeNotification = (oneSignalKey) => {
  // OneSignal && OneSignal.initialize(oneSignalKey);
};

export async function mapUserInSegment({ id, email, first_name, last_name }) {
  // const { identify } = useAnalytics();
  // id &&
  //   identify(id.toString(), {
  //     email: email,
  //     firstName: first_name,
  //     last_name: last_name,
  //   });

  // id && OneSignal && OneSignal.login(id.toString());
  // email && OneSignal && OneSignal.User.addEmail(email);

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

export function openSupportChat(number) {
  Linking.openURL("whatsapp://send?text=&phone=" + number);
}

// export const callSupport = () => Linking.openURL("tel:+919130103785");

