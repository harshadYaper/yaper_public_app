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
import { Image } from "expo-image";
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
  const { deal_id, deal_name } = params || {};

  const [loading, setLoading] = useState(true);

  const DetailsComp = ({ label, value, showAdditional }) => {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "50%",
          flexShrink: 1,
          ...scalePadding(4),
          alignItems: "center",
        }}
      >
        <Text
          style={{
            ...scaleFont(8),
            color: "#FFFFFF",
          }}
        >
          {label}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "80%",
          }}
        >
          <Text
            style={{
              ...scaleFont(10),
              flexShrink: 1,
              color: "#FFFFFF",
            }}
          >
            {truncate(value)}
          </Text>
          {showAdditional && <CopyToClipboard value={value} />}
        </View>
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
                  opacity: 0.8,
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
                  paddingTop: scaleHeight(8),
                  paddingBottom: scaleHeight(40),
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
                    <FullButton
                      onPress={() => setProceed(true)}
                      title="Proceed"
                    />
                  </>
                )}
              </View>
            </>
          ) : (
            <View
              style={{
                position: "absolute",
                bottom: 0,
                backgroundColor: showDetails ? "transparent" : "#101828",
                width: "100%",
                alignItems: "center",
                ...scalePadding(4),
              }}
            >
              <Pressable
                style={{
                  height: scaleHeight(60),
                  width: scaleWidth(60),
                  borderColor: "#101828",
                  backgroundColor: "#101828",
                  borderWidth: scaleWidth(2),
                  borderRadius: scaleBorder(50),
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => setShowDetails((p) => !p)}
              >
                <View
                  style={{
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
              </Pressable>
              {!showDetails && (
                <TouchableOpacity
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: scaleHeight(120),
                  }}
                  onPress={() => setScreen((s) => 1 - s)}
                >
                  <View
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        ...scaleFont(12),
                        fontWeight: "700",
                        color: "#FFFFFF",
                        ...scalePadding(4),
                      }}
                    >
                      {screen == 0 ? deal_name : "Delivery Details"}
                    </Text>
                    <FlatList
                      contentContainerStyle={{}}
                      style={{ width: "100%" }}
                      data={
                        screen == 0
                          ? [
                              { label: "Total Price", value: total_price },
                              { label: "Cart Amount", value: cart_amount },
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
                        />
                      )}
                      keyExtractor={({ label }) => label}
                    />
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
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
              )}
            </View>
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
