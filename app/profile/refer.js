import { Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import App from "../app";
import { useState } from "react";
import { Image } from "expo-image";
import {
  scaleFont,
  scaleHeight,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { FullButton } from "../common/button";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import { REFERRAL_AMOUNT, RUPEE } from "../constants";

export default function Refer() {
  const [loading, setLoading] = useState(false);

  const {
    referral: { link, referral_count, referral_earning },
  } = useSelector((state) => state.user) || {};

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
            style={{ height: scaleHeight(240), width: scaleWidth(240) }}
          />
          <View
            style={{
              height: scaleHeight(80),
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
                  ...scaleFont(12),
                }}
              >
                No of Referrals
              </Text>
              <Text
                style={{
                  ...scalePadding(4),
                  color: "#000000",
                  ...scaleFont(12),
                  fontWeight: "700",
                }}
              >
                {referral_count}
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
                  ...scaleFont(12),
                }}
              >
                Total Earnings
              </Text>
              <Text
                style={{
                  ...scalePadding(4),
                  color: "#000000",
                  ...scaleFont(12),
                  fontWeight: "700",
                }}
              >
                {RUPEE}
                {referral_earning}
              </Text>
            </View>
          </View>
          <Text
            style={{
              ...scaleFont(16),
              fontWeight: "500",
              color: "#101828",
              textAlign: "center",
            }}
          >
            Refer your friends & get {RUPEE}
            {REFERRAL_AMOUNT} for each successful referral
          </Text>

          <Text
            style={{
              ...scaleFont(12),
              color: "#667085",
              textAlign: "center",
            }}
          >
            If your friends signup and help a shopper by placing an order,
            they'll get awesome cash rewards and you'll get {RUPEE}
            {REFERRAL_AMOUNT} for each successful referral
          </Text>
          <FullButton
            title="Refer Now"
            onPress={async () => {
              await Share.share({ message: link });
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
          ...scaleFont(16),
          fontWeight: "500",
        },
        headerShown: true,
        title: "Refer & Earn",
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
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
