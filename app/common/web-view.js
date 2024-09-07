import { Linking, Platform } from "react-native";
import RNWebView from "react-native-webview";

export default function WebView({ uri, html, styles, injectScript }) {
  return Platform.OS === "web" ? (
    <>
      <iframe src={uri} height={"100%"} width={"100%"} />
    </>
  ) : (
    <RNWebView
      style={{
        opacity: 0.99,
        overflow: "hidden",
        width: "100%",
        height: "100%",
        ...styles,
      }}
      useWebKit={true}
      originWhitelist={["*"]}
      javaScriptEnabled
      startInLoadingState
      nestedScrollEnabled
      injectedJavaScript={injectScript}
      domStorageEnabled
      sharedCookiesEnabled
      source={{ uri, html }}
      onShouldStartLoadWithRequest={(event) => {
        let isLink = event.url.startsWith("mailto");
        isLink && Linking.openURL(event.url);
        return !isLink;
      }}
    />
  );
}
