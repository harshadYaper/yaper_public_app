import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import App from "../app";
import { useState } from "react";
import { Image } from "expo-image";
import { scalePadding } from "../utils/getScaledDimensions";
import { FullButton } from "../common/button";

export default function Refer() {
  const [loading, setLoading] = useState(false);

  return (
    <App
      Component={
        <View
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
            height: "100%",
            ...scalePadding(16),
          }}
        >
          <Image
            source={require("../../assets/refer.svg")}
            style={{ height: 240, width: 240 }}
          />
          <View
            style={{
              height: 80,
              width: "80%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: "#CEE3FF",
            }}
          >
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  ...scalePadding(4),
                  color: "#667085",
                  fontSize: 12,
                }}
              >
                No of Referrals
              </Text>
              <Text
                style={{
                  ...scalePadding(4),
                  color: "#000000",
                  fontSize: 12,

                  fontWeight: "700",
                }}
              >
                2
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  ...scalePadding(4),
                  color: "#667085",
                  fontSize: 12,
                }}
              >
                Total Earnings
              </Text>
              <Text
                style={{
                  ...scalePadding(4),
                  color: "#000000",
                  fontSize: 12,

                  fontWeight: "700",
                }}
              >
                $200
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: 16,

              fontWeight: "500",
              color: "#101828",
              textAlign: "center",
            }}
          >
            Refer your friends & get $100 for each successful referral
          </Text>

          <Text
            style={{
              fontSize: 12,

              color: "#667085",
              textAlign: "center",
            }}
          >
            If your friends signup and help a shopper by placing an order,
            they'll get awesome cash rewards and you'll get $100 for each
            successful referral
          </Text>
          <FullButton
            title="Refer Now"
            onPress={() => {
              console.log("link copied");
            }}
          />
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
        title: "Refer & Earn",
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => {
              Component == MyCards ? router.back() : setComponent([MyCards]);
            }}
          >
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
