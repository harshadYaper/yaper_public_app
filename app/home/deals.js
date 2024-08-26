import { FlatList, RefreshControl, TouchableOpacity, View } from "react-native";
import {
  scaleBorder,
  scaleHeight,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";

import DealBox from "./deal_box";
import { useEffect, useState } from "react";
import { getInfoCards } from "../api";
import { Image } from "expo-image";

export default function Deals({ data, openFilters, fetching, fetchData }) {
  return (
    <FlatList
      contentContainerStyle={{}}
      showsVerticalScrollIndicator={false}
      style={{
        opacity: openFilters ? 0.1 : 1,
        marginBottom: scaleHeight(90),
        ...scalePadding(12),
        width: "100%",
      }}
      data={data || []}
      renderItem={({
        item: {
          id,
          title,
          image,
          store,
          card_meta,
          content,
          color_code,
          color,
        },
      }) => (
        <DealBox
          id={id}
          title={title}
          image={image}
          url={store?.url}
          card_meta={card_meta}
          content={content}
          color_code={color_code}
          color={color}
        />
      )}
      keyExtractor={({ id }) => `Deal ${id}`}
      refreshControl={
        <RefreshControl
          refreshing={fetching}
          onRefresh={() => fetchData({ resetData: true })}
        />
      }
    />
  );
}

export function DealsHeader() {
  const [data, setData] = useState();
  const [index, setIndex] = useState(0);

  const handlePress = () => {
    setIndex((p) => (p == data?.length - 1 ? 0 : p + 1));
  };

  useEffect(() => {
    (async () => {
      setData((await getInfoCards({}))?.data);
    })();
  }, []);

  return (
    <FlatList
      data={data?.slice(index, index + 1)}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
      onMomentumScrollEnd={handlePress}
      renderItem={({ item: { id, type, info, actions } }) => (
        //information, banners, input -> type
        //header, sub_title,placeholder,title,img_url -> info
        //cta_text", "card_cmd", "cmd_config -> actions.card
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
          disabled
        >
          <Image
            contentFit="fill"
            source={{
              uri:
                index % 2 !== 0
                  ? "https://images.samsung.com/is/image/samsung/in-full-hd-tv-te50fa-ua43te50fakxxl-frontblack-231881877?$650_519_PNG$"
                  : "https://cdn.pixabay.com/photo/2024/01/21/20/09/ai-generated-8523907_640.png", // need to change
            }}
            style={{
              width: scaleWidth(350),
              height: scaleWidth(120),
              borderRadius: scaleBorder(8),
            }}
          />
        </TouchableOpacity>
      )}
      keyExtractor={({ id }) => `INFO CARDS ${id}`}
    />
  );
}
