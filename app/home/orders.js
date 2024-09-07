import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  scaleBorder,
  scaleFont,
  scaleHeight,
  scaleMargin,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { Image } from "expo-image";

import {
  capitalize,
  snakeToTitleize,
  titleize,
  truncate,
} from "../utils/helper";
import { router } from "expo-router";
import Timer from "../common/timer";
import { FullButton } from "../common/button";
import { useSelector } from "react-redux";
import { putData } from "../storage";
import { customRequest } from "../api";
import Loading from "./loading";

export default function Orders({
  data,
  openFilters,
  setPageNumber,
  fetchData,
  fetching,
  endOfData,
}) {
  const { pan_verified } = useSelector((state) => state.user) || {};

  return (
    <FlatList
      contentContainerStyle={{}}
      showsVerticalScrollIndicator={false}
      style={{
        width: "100%",
        opacity: openFilters ? 0.1 : 1,
        marginBottom: scaleHeight(100),
        ...scalePadding(12),
      }}
      data={data || []}
      renderItem={({ item, index }) => (
        <FlatList
          data={item}
          renderItem={({
            item: {
              id,
              order_number,
              logo,
              description,
              order_state_info,
              state,
              payload: { variant_id },
              timer,
              meta: { deal_id }, //check web_view:true also
              secondary_button,
              third_button,
              show_help, //check
              user_notes,
            },
          }) => (
            <>
              <TouchableOpacity
                style={{
                  width: "100%",
                  height: scaleHeight(timer ? 160 : 120),
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#FFFFFF",
                  borderColor: "#E4E4E4",
                  borderWidth: scaleWidth(2),
                  borderRadius: scaleBorder(10),
                  marginBottom: scaleHeight(12),
                  flexDirection: "row",
                  ...scalePadding(8),
                }}
                onPress={() =>
                  router.push({
                    pathname: "/details",
                    params: {
                      id,
                      key: "order",
                      order_number,
                      variant_id,
                      deal_id,
                    },
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
                      height: scaleHeight(100),
                    }}
                    alt="Some image here"
                  />

                  {timer && (
                    <View style={{ ...scalePadding(8) }}>
                      <View
                        style={{
                          flexDirection: "row",
                          backgroundColor: "#F044384D",
                          paddingLeft: scaleWidth(8),
                          paddingRight: scaleWidth(8),
                          paddingBottom: scaleHeight(4),
                          paddingTop: scaleHeight(4),
                          borderRadius: scaleBorder(20),
                        }}
                      >
                        <Text
                          style={{
                            ...scaleFont(10),
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
                      </View>
                    </View>
                  )}
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-start",
                    height: "100%",
                    ...scalePadding(8),
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
                      borderRadius: scaleBorder(4),
                    }}
                  >
                    <Text
                      style={{
                        ...scaleFont(10),
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
                        ...scaleFont(10),
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
                        ...scaleFont(10),
                        color: "#667085",
                      }}
                    >
                      {titleize(order_state_info)}
                    </Text>
                  </View>

                  {user_notes && (
                    <View style={{ ...scaleMargin(4) }}>
                      <Text
                        style={{
                          ...scaleFont(10),
                          color: "#667085",
                        }}
                      >
                        {truncate(user_notes)}
                      </Text>
                    </View>
                  )}

                  {timer && (
                    <Text
                      style={{
                        ...scaleFont(10),
                        fontWeight: "500",
                        color: "#F04438",
                        ...scaleMargin(4),
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
              <Loading
                reachedEnd={data.length - 1 == index}
                fetching={fetching}
              />
            </>
          )}
          keyExtractor={({ state, order_number, description }) =>
            `Order ${state}-${order_number}-${description}`
          }
        />
      )}
      onEndReached={() => !endOfData && setPageNumber((p) => p + 1)}
      refreshControl={
        <RefreshControl
          refreshing={fetching}
          onRefresh={() => fetchData({ resetData: true })}
        />
      }
    />
  );
}

export function OrdersHeader() {
  return (
    <Text
      style={{
        ...scaleFont(20),
        fontWeight: "500",
        ...scalePadding(4),
        width: "100%",
      }}
    >
      Order History
    </Text>
  );
}
