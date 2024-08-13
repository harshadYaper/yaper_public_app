import { FlatList, Text, TouchableOpacity, View } from "react-native";
import {
  scaleFont,
  scaleHeight,
  scaleMargin,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { Image } from "expo-image";

import { capitalize, snakeToTitleize, truncate } from "../utils/helper";
import { router } from "expo-router";
import Timer from "../common/timer";
import { FullButton } from "../common/button";
import { useSelector } from "react-redux";
import { putData } from "../storage";
import { customRequest } from "../api";

export default function Orders({
  data,
  openFilters,
  setPageNumber,
  fetchData,
}) {
  const { pan_verified } = useSelector((state) => state.user) || {};

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
              ...p
            },
          }) => (
            <TouchableOpacity
              style={{
                width: "100%",
                height: scaleHeight(180),
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
                    height: scaleHeight(140),
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

                {user_notes && (
                  <View style={{ ...scaleMargin(4) }}>
                    <Text
                      style={{
                        fontSize: 10,
                        color: "#667085",
                      }}
                    >
                      {truncate(user_notes, 100)}
                    </Text>
                  </View>
                )}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  {secondary_button && (
                    <FullButton
                      width={scaleWidth(60)}
                      height={scaleHeight(30)}
                      title={secondary_button.button_text}
                      fontSize={scaleFont(10)}
                      onPress={async () => {
                        await putData("PARAMS", {
                          deal_id,
                          deal_name: description,
                        });
                        router.navigate({
                          pathname: pan_verified ? "/ecommerce-view" : "/kyc",
                        });
                      }}
                    />
                  )}

                  {third_button && (
                    <>
                      {console.log(third_button.request)}
                      <FullButton
                        width={scaleWidth(80)}
                        height={scaleHeight(30)}
                        title={third_button.button_text}
                        fontSize={scaleFont(10)}
                        backgroundColor={"#F04438"}
                        onPress={async () => {
                          await customRequest({
                            url: third_button.request.href,
                            method: third_button.request.type,
                            payload: { variant_id },
                          });
                          fetchData({ resetData: true });
                        }}
                      />
                    </>
                  )}
                </View>

                {timer && (
                  <Text
                    style={{
                      fontSize: 10,

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
