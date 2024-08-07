import { FlatList } from "react-native";
import { scaleHeight } from "../utils/getScaledDimensions";

import DealBox from "./deal_box";

export default function Deals({ data, openFilters }) {
  return (
    <FlatList
      contentContainerStyle={{}}
      showsVerticalScrollIndicator={false}
      style={{
        opacity: openFilters ? 0.1 : 1,
        marginBottom: scaleHeight(100),
      }}
      data={data || []}
      renderItem={({
        item: {
          id,
          title,
          image,
          store: { url },
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
          url={url}
          card_meta={card_meta}
          content={content}
          color_code={color_code}
          color={color}
        />
      )}
      keyExtractor={({ id }) => `Deal ${id}`}
    />
  );
}

export function DealsHeader() {
  return <></>;
}
