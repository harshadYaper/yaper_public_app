import { useEffect, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Pressable,
  FlatList,
} from "react-native";
import { getData } from "../storage";
import { createOrder } from "../api";
import WebView from "../common/web-view";
import { Image } from "expo-image";
import App from "../app";
import { router } from "expo-router";
import { scaleHeight, scalePadding } from "../utils/getScaledDimensions";
import { FullButton } from "../common/button";
import { range } from "../utils/helper";
import CopyToClipboard from "../common/copy-to-clipboard";

export default function EcommerceView() {
  const [params, setParams] = useState();
  const [order, setOrder] = useState();
  const [timer, setTimer] = useState();
  const [screen, setScreen] = useState(0);
  const [proceed, setProceed] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const MAX_SCREENS = 2;
  const timeFormatter = (val) => {
    return val <= 9 ? "0" + val.toString() : val;
  };

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

          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 10,

            color: "#FFFFFF",
            ...scalePadding(4),
          }}
        >
          {label}
        </Text>
        <Text
          style={{
            fontSize: 10,

            color: "#FFFFFF",
            ...scalePadding(4),
          }}
        >
          {value}
        </Text>
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
    // address && Alert.alert("Warning", address?.user_message);
  }, [address]);

  useEffect(() => {
    order && setTimer(order?.timer?.remaining_time);
  }, [order]);

  useEffect(() => {
    (async () => {
      deal_id && setOrder(await createOrder({ deal_id }));
    })();
  }, [params]);

  useEffect(() => {
    timer &&
      timer > 0 &&
      setTimeout(() => {
        setTimer((p) => p - 1);
      }, 1000);
  }, [timer]);

  return (
    <App
      Component={
        <View style={{ flex: 1, alignItems: "center" }}>
          <WebView
            uri={order?.url}
            styles={{ ...(proceed ? {} : { opacity: 0.1 }) }}
          />
          {!proceed ? (
            <View
              style={{
                position: "absolute",
                bottom: 0,
                backgroundColor: "#FFFFFF",
                ...scalePadding(20),
                width: "100%",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#101828",
                  fontWeight: "700",
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  textAlign: "center",
                  paddingBottom: scaleHeight(20),
                }}
              >
                {address?.user_message}
              </Text>
              <FullButton onPress={() => setProceed(true)} />
            </View>
          ) : (
            <View
              style={{
                position: "absolute",
                bottom: 0,
                backgroundColor: showDetails ? "transparent" : "#101828",

                width: showDetails ? 80 : "100%",
                alignItems: "center",
              }}
            >
              <Pressable
                style={{
                  height: 60,
                  width: 60,
                  borderColor: "#101828",
                  backgroundColor: "#101828",
                  borderWidth: 2,
                  borderRadius: 50,
                  justifyContent: "center",

                  alignItems: "center",
                }}
                onPress={() => setShowDetails((p) => !p)}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderColor: "#FFFFFF",
                    borderWidth: 4,
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,

                      fontWeight: "700",
                      textAlign: "center",
                      textAlignVertical: "center",
                      color: "#FFFFFF",
                    }}
                  >
                    {timeFormatter(parseInt(timer / 60))}:
                    {timeFormatter(parseInt(timer % 60))}
                  </Text>
                </View>
              </Pressable>
              {!showDetails && (
                <View
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
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
                        fontSize: 12,

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
                        <DetailsComp label={label} value={value} />
                      )}
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
                        style={{
                          height: 4,
                          borderRadius: 2,
                          width: screen == i ? 32 : 4,
                          backgroundColor: "#FFFFFF",
                          marginLeft: 4,
                          marginRight: 4,
                        }}
                        onPress={() => setScreen((p) => 1 - p)}
                      />
                    ))}
                  </View>
                </View>
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
          fontSize: 16,

          fontWeight: "500",
        },
        headerShown: true,
        title: "Place Order",
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              source={require("../../assets/icons/CaretLeft.svg")}
              style={{ height: 24, width: 24, tintColor: "#101828" }}
            />
          </TouchableOpacity>
        ),
      }}
    />
  );
}

const customeStyles = StyleSheet.create({});
