import { StyleSheet, TouchableOpacity, View } from "react-native";
import App from "../../app";
import { useEffect, useState } from "react";
import { getStaticPages } from "../../api";
import {
  scaleFont,
  scaleHeight,
  scaleWidth,
} from "../../utils/getScaledDimensions";
import { router, useLocalSearchParams } from "expo-router";
import WebView from "../../common/web-view";
import { Image } from "expo-image";

export default function Cards() {
  const { showStaticPage } = useLocalSearchParams();

  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState();

  useEffect(() => {
    (async () => {
      setContent(
        (await getStaticPages({}))?.data?.find(
          (i) => i.heading_field == showStaticPage
        )?.text_field
      );
    })();
  }, []);

  return (
    <App
      Component={
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "red",
            display: "flex",
          }}
        >
          <View style={{ flex: 1 }}>
            <WebView html={content} />
          </View>
        </View>
      }
      Splash={<></>}
      styles={customeStyles}
      loading={loading}
      options={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: "#101828",
          ...scaleFont(16),
          fontWeight: "500",
        },
        headerShown: true,
        title: showStaticPage,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <Image
              source={require("../../../assets/icons/CaretLeft.svg")}
              style={{
                height: scaleHeight(24),
                width: scaleWidth(24),
                tintColor: "#101828",
              }}
            />
          </TouchableOpacity>
        ),
      }}
    />
  );
}
const customeStyles = StyleSheet.create({});
