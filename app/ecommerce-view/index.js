import { useEffect, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Pressable,
  FlatList,
  Alert,
} from "react-native";
import { getData } from "../storage";
import { createOrder } from "../api";
import WebView from "../common/web-view";
import { Image, ImageBackground } from "expo-image";
import App from "../app";
import { router } from "expo-router";
import {
  scaleBorder,
  scaleFont,
  scaleHeight,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { FullButton } from "../common/button";
import { range, truncate } from "../utils/helper";
import CopyToClipboard from "../common/copy-to-clipboard";
import Timer from "../common/timer";

export default function EcommerceView() {
  const [params, setParams] = useState();
  const [order, setOrder] = useState();
  const [screen, setScreen] = useState(0);
  const [proceed, setProceed] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const MAX_SCREENS = 2;

  function addressFormatter(address) {
    return [
      {
        label: "Name :",
        value: `${address?.first_name || ""} ${address?.last_name || ""}`,
      },
      {
        label: "Phone :",
        value: address?.phone,
      },
      {
        label: "Line 1 :",
        value: address?.address_line1,
      },
      {
        label: "Line 2 :",
        value: address?.address_line2,
      },
      {
        label: "Landmark :",
        value: address?.landmark,
      },
      {
        label: "Pincode :",
        value: address?.pincode,
      },
      {
        label: "City :",
        value: address?.city,
      },
      {
        label: "State :",
        value: address?.state,
      },
    ].filter(({ value }) => (value || "") !== "");
  }

  const { total_price, discount, cart_amount, quantity, address } = order || {};
  const { deal_id, deal_name, store_name } = params || {};

  const [loading, setLoading] = useState(true);

  const DetailsComp = ({ label, value, showAdditional, styles }) => {
    return (
      <View
        style={{
          ...{
            display: "flex",
            flexDirection: "row",
            paddingBottom: scaleHeight(2),
            alignItems: "center",
            width: "50%",
            paddingRight: scaleWidth(16),
          },
          ...styles,
        }}
      >
        <Text
          style={{
            ...scaleFont(10),
            color: "#FFFFFF",
            paddingRight: scaleWidth(8),
          }}
        >
          {label}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Text
            style={{
              ...scaleFont(10),
              fontWeight: "500",
              color: "#FFFFFF",
            }}
          >
            {truncate(value, 70)}
          </Text>
        </View>
        {showAdditional && <CopyToClipboard value={value} />}
      </View>
    );
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    (async () => {
      setParams(await getData("PARAMS"));
    })();
  }, []);

  useEffect(() => {
    if (order && order.errors) {
      Alert.alert("Error", order.errors.message);
      router.navigate({ pathname: "/" });
    }
  }, [order]);

  useEffect(() => {
    (async () => {
      deal_id && setOrder(await createOrder({ deal_id }));
    })();
  }, [params]);

  return (
    <App
      Component={
        <View style={{ flex: 1 }}>
          <WebView
            uri={order?.url}
            styles={{ ...(proceed ? {} : { opacity: 0.1 }) }}
            injectScript={order?.inject_script}
          />
          {!proceed ? (
            <>
              <View
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#101828",
                  opacity: 0.6,
                }}
              ></View>
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  backgroundColor: "#FFFFFF",
                  width: "100%",
                  alignItems: "center",
                  borderTopLeftRadius: scaleBorder(12),
                  borderTopRightRadius: scaleBorder(12),
                  paddingLeft: scaleWidth(24),
                  paddingRight: scaleWidth(24),
                  paddingTop: scaleHeight(24),
                  paddingBottom: scaleHeight(24),
                }}
              >
                {address?.user_message && (
                  <>
                    <Text
                      style={{
                        color: "#101828",
                        fontWeight: "700",
                        ...scaleFont(14),
                        textAlign: "left",
                        textAlignVertical: "center",
                        paddingBottom: scaleHeight(32),
                      }}
                    >
                      {address.user_message}
                    </Text>
                    <View
                      style={{
                        paddingBottom: scaleHeight(32),
                        width: "100%",
                      }}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          width: "100%",
                          alignItems: "center",
                          ...scalePadding(12),
                          backgroundColor: "#F6E3C0",
                          borderRadius: scaleBorder(8),
                          borderWidth: scaleWidth(2),
                          borderColor: "#FDB022",
                        }}
                      >
                        <View style={{ paddingRight: scaleWidth(12) }}>
                          <Image
                            source={require("../../assets/Info.svg")}
                            style={{
                              height: scaleHeight(28),
                              width: scaleWidth(28),
                              tintColor: "#FDB022",
                            }}
                          />
                        </View>
                        <Text
                          style={{
                            color: "#101828",
                            fontWeight: "500",
                            ...scaleFont(12),
                            textAlign: "left",
                            flex: 1,
                            textAlignVertical: "center",
                          }}
                        >
                          You will be redirected to {store_name} to complete the
                          order. Details like address, name and contact number
                          will be provided on next screen
                        </Text>
                      </View>
                    </View>
                    <FullButton
                      onPress={() => setProceed(true)}
                      title="Proceed"
                    />
                  </>
                )}
              </View>
            </>
          ) : (
            <>
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Pressable
                  style={{
                    width: "100%",
                    borderColor: "#101828",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => setShowDetails((p) => !p)}
                >
                  <ImageBackground
                    source={require("../../assets/ecom-shape.svg")}
                    style={{
                      height: scaleHeight(80),
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={
                        showDetails
                          ? require("../../assets/icons/CaretCircleUp.svg")
                          : require("../../assets/icons/CaretCircleDown.svg")
                      }
                      style={{
                        height: scaleHeight(30),
                        width: scaleWidth(28),
                        tintColor: "#FFFFFF",
                      }}
                    />
                  </ImageBackground>
                </Pressable>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: showDetails ? "transparent" : "#101828",
                  }}
                >
                  {!showDetails && (
                    <>
                      <View
                        style={{
                          display: "flex",
                          paddingLeft: scaleWidth(20),
                          paddingRight: scaleWidth(20),
                          height: "100%",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            width: scaleWidth(40),
                            height: scaleHeight(40),
                            borderColor: "#FFFFFF",
                            borderWidth: scaleWidth(4),
                            borderRadius: scaleBorder(50),
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {order?.timer?.remaining_time && (
                            <Timer
                              time={order.timer.remaining_time}
                              styles={{
                                color: "#FFFFFF",
                              }}
                              showMins={false}
                            />
                          )}
                        </View>
                      </View>
                      <TouchableOpacity
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          minHeight: scaleHeight(160),
                          flex: 1,
                        }}
                        onPress={() => setScreen((s) => 1 - s)}
                      >
                        <View
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                            flex: 1,
                            justifyContent: "center",
                          }}
                        >
                          <Text
                            style={{
                              ...scaleFont(10),
                              fontWeight: "700",
                              color: "#FFFFFF",
                              paddingBottom: scaleHeight(screen == 0 ? 24 : 8),
                            }}
                          >
                            {screen == 0 ? deal_name : "Delivery Details"}
                          </Text>
                          <FlatList
                            contentContainerStyle={{
                              flex: 1,
                            }}
                            style={{ flex: 1 }}
                            data={
                              screen == 0
                                ? [
                                    {
                                      label: "Total Price",
                                      value: total_price,
                                    },
                                    {
                                      label: "Cart Amount",
                                      value: cart_amount,
                                    },
                                    { label: "Discount", value: discount },
                                  ]
                                : addressFormatter(address)
                            }
                            numColumns={2}
                            renderItem={({ item: { label, value } }) => (
                              <DetailsComp
                                label={label}
                                value={value}
                                showAdditional={screen !== 0}
                                styles={
                                  screen == 0 && { paddingTop: scaleHeight(24) }
                                }
                              />
                            )}
                            keyExtractor={({ label }) => label}
                          />
                        </View>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingBottom: scaleHeight(16),
                          }}
                        >
                          {range(MAX_SCREENS).map((i) => (
                            <Pressable
                              key={"SCREENS" + i}
                              style={{
                                height: scaleHeight(4),
                                borderRadius: scaleBorder(2),
                                width: scaleWidth(screen == i ? 32 : 4),
                                backgroundColor: "#FFFFFF",
                                marginLeft: scaleWidth(4),
                                marginRight: scaleWidth(4),
                              }}
                              onPress={() => setScreen((p) => 1 - p)}
                            />
                          ))}
                        </View>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
            </>
          )}
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
        title: "Place Order",
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              source={require("../../assets/icons/CaretLeft.svg")}
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
