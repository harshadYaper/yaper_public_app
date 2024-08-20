import RNWebView from "react-native-webview";

export default function WebView({ uri, html, styles, injectScript }) {
  return (
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
      injectedJavaScriptObject={injectScript}
      source={{ uri, html }}
    />
  );
}
