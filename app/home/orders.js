import { FlatList, Text, TouchableOpacity, View } from "react-native";
import {
  scaleHeight,
  scaleMargin,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { Image } from "expo-image";

import { capitalize, snakeToTitleize, truncate } from "../utils/helper";
import { router } from "expo-router";
import Timer from "../common/timer";

export default function Orders({ data, openFilters, setPageNumber }) {
  return (
    <FlatList
      contentContainerStyle={{ height: "100%" }}
      showsVerticalScrollIndicator={false}
      style={{
        width: "100%",
        opacity: openFilters ? 0.1 : 1,
        marginBottom: scaleHeight(100),
        ...scalePadding(12),
      }}
      data={data || []}
      renderItem={({ item }) => (
        <FlatList
          data={item}
          renderItem={({
            item: {
              id,
              order_number,
              logo,
              pricings,
              description,
              card_description,
              order_state_info,
              state,
              params,
              payload: { variant_id },
              timer,
            },
          }) => (
            <TouchableOpacity
              style={{
                width: "100%",
                height: scaleHeight(timer?.remaining_time ? 160 : 120),
                display: "flex",
                alignItems: "center",
                backgroundColor: "#FFFFFF",
                borderColor: "#E4E4E4",
                borderWidth: 1,
                borderRadius: 10,
                marginBottom: scaleHeight(12),
                flexDirection: "row",
                ...scalePadding(8),
              }}
              onPress={() =>
                router.push({
                  pathname: "/details",
                  params: { id, key: "order", order_number, variant_id },
                })
              }
            >
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  contentFit={"contain"}
                  source={{ uri: logo }}
                  style={{
                    width: scaleWidth(120),
                    height: scaleHeight(120),
                  }}
                  alt="Some image here"
                />
                {timer && (
                  <Text
                    style={{
                      backgroundColor: "#F044384D",
                      paddingLeft: scaleWidth(8),
                      paddingRight: scaleWidth(8),
                      paddingBottom: scaleHeight(4),
                      paddingTop: scaleHeight(4),
                      borderRadius: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        color: "#F04438",
                      }}
                    >
                      Ends in{" "}
                    </Text>
                    <Timer
                      time={timer.remaining_time}
                      styles={{
                        color: "#F04438",
                      }}
                    />
                  </Text>
                )}
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-start",
                  height: "100%",
                  justifyContent: "space-around",
                }}
              >
                <View
                  style={{
                    ...scaleMargin(4),
                    backgroundColor: {
                      payment_released: "#039855",
                      cancelled: "#F04438",
                      shipped: "#025ACE",
                      ordered: "#FDB022",
                      delivered: "#025ACE",
                      accepted: "#FDB022",
                      expired: "#F04438",
                    }[state],
                    ...scalePadding(4),
                    borderRadius: 4,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,

                      fontWeight: "500",
                      textAlign: "center",
                      textAlignVertical: "center",
                      color: "#FFFFFF",
                    }}
                  >
                    {capitalize(snakeToTitleize(state))}
                  </Text>
                </View>
                <View style={{ ...scaleMargin(4) }}>
                  <Text
                    style={{
                      fontSize: 10,

                      fontWeight: "500",
                      color: "#101828",
                    }}
                  >
                    {truncate(description)}
                  </Text>
                </View>
                <View style={{ ...scaleMargin(4) }}>
                  <Text
                    style={{
                      fontSize: 10,

                      color: "#667085",
                    }}
                  >
                    {order_state_info}
                  </Text>
                </View>
                {timer && (
                  <Text
                    style={{
                      fontSize: 10,

                      fontWeight: "500",
                      color: "#F04438",
                    }}
                  >
                    Complete this deal before it gets expired
                  </Text>
                )}
              </View>
              <View>
                <Image
                  contentFit={"contain"}
                  source={require("../../assets/icons/CaretRight.svg")}
                  height={scaleHeight(20)}
                  width={scaleWidth(20)}
                  alt="Some image here"
                />
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={({ state, order_number, description }) =>
            `Order ${state}-${order_number}-${description}`
          }
        />
      )}
      onEndReachedThreshold={0.2}
      onEndReached={() => setPageNumber((p) => p + 1)}
    />
  );
}
