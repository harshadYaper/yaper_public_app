import { Linking, NativeModules } from "react-native";
import { OneSignal } from "react-native-onesignal";

const { ZendeskModule } = NativeModules;

export function sendReport(error) {
  // crashlytics().recordError(new Error(error));
  // crashlytics().log(error);
}

export const initializeNotification = (oneSignalKey) => {
  OneSignal && OneSignal.initialize(oneSignalKey);
};

export async function mapUserInSegment({ id, email, first_name, last_name }) {
  // const { identify } = useAnalytics();
  // id &&
  //   identify(id.toString(), {
  //     email: email,
  //     firstName: first_name,
  //     last_name: last_name,
  //   });

  id && OneSignal && OneSignal.login(id.toString());
  email && OneSignal && OneSignal.User.addEmail(email);

  ZendeskModule && ZendeskModule.initSdk(`${first_name} ${last_name}`, email);
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

export const openZendeskTickets = () =>
  ZendeskModule && ZendeskModule.openConversation();

// export const chatURL =
//   "https://static.zdassets.com/web_widget/latest/liveChat.html?v=10#key=yaper.zendesk.com";

// export const callSupport = () => Linking.openURL("tel:+919130103785");

export async function openZendeskSupport({
  resolution,
  isChat,
  title,
  email,
  first_name,
  last_name,
  phone,
}) {
  ZendeskModule &&
    ZendeskModule.startChat(
      email,
      first_name + " " + last_name,
      phone,
      isChat,
      resolution,
      title
    );
}
