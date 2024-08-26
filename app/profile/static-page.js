import { useEffect, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

import WebView from "../common/web-view";
import { getStaticPages } from "../api";
import {
  scaleBorder,
  scaleFont,
  scaleHeight,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { WHITE } from "../constants/colors";

export default function StaticPage({ showStaticPage, setShowStaticPage }) {
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
    <Modal animationType="slide" transparent>
      <Pressable
        onPress={() => setShowStaticPage()}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Pressable
          onPress={() => setShowStaticPage(showStaticPage)}
          style={{
            width: "100%",
            height: "80%",
            borderTopLeftRadius: scaleBorder(20),
            borderTopRightRadius: scaleBorder(20),
            backgroundColor: WHITE,
            position: "absolute",
            bottom: 0,
            ...scalePadding(12),
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#E2E2E5",
                width: scaleWidth(30),
                height: scaleHeight(4),
              }}
            />
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                ...scaleFont(20),
                fontWeight: "600",
                color: "#0D1F3C",
                paddingBottom: scaleHeight(16),
                paddingTop: scaleHeight(32),
              }}
            >
              {showStaticPage}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
            }}
          >
            <WebView html={content} />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
