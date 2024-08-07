import { useEffect, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

import WebView from "../common/web-view";
import { getStaticPages } from "../api";
import {
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
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: WHITE,
            position: "absolute",
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            ...scalePadding(16),
          }}
        >
          <View
            style={{
              backgroundColor: "#E2E2E5",
              width: scaleWidth(30),
              height: scaleHeight(4),
            }}
          />
          <Text
            style={{
              fontSize: 20,

              fontWeight: "600",
              color: "#0D1F3C",
              ...scalePadding(12),
            }}
          >
            {showStaticPage}
          </Text>
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
