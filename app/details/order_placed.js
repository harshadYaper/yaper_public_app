import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";
import {
  scaleFont,
  scaleHeight,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { FullButton } from "../common/button";
import { router } from "expo-router";

export default function OrderPlaced({
  orderNumber,
  walletAmount,
  setOrderComponent,
}) {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#12B76A",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: scaleHeight(80),
        }}
      >
        <Image
          source={require("../../assets/icons/CheckCircle.svg")}
          style={{
            height: scaleHeight(80),
            width: scaleWidth(80),
            tintColor: "#FFFFFF",
          }}
        />
        <Text
          style={{
            ...scaleFont(16),
            fontWeight: "500",
            paddingTop: scaleHeight(16),
            color: "#FFFFFF",
          }}
        >
          Thank You
        </Text>
        <Text
          style={{
            ...scaleFont(16),
            fontWeight: "500",
            paddingTop: scaleHeight(16),
            color: "#FFFFFF",
          }}
        >
          Order Placed Successfully
        </Text>
      </View>
      <View
        style={{
          paddingBottom: scaleHeight(16),
          paddingTop: scaleHeight(16),
          paddingLeft: scaleWidth(12),
          paddingRight: scaleWidth(12),
          backgroundColor: "#FFFFFF",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 8,
        }}
      >
        <Text
          style={{
            ...scaleFont(14),
            fontWeight: "500",
            paddingBottom: scaleHeight(16),
            paddingTop: scaleHeight(16),
          }}
        >
          Order ID: {orderNumber}
        </Text>

        <View
          style={{
            ...scalePadding(16),
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              ...scaleFont(20),
              fontWeight: "700",
              paddingBottom: scaleHeight(4),
            }}
          >
            {walletAmount}
          </Text>
          <Text
            style={{
              ...scaleFont(16),
              fontWeight: "500",
              paddingBottom: scaleHeight(4),
              paddingTop: scaleHeight(4),
            }}
          >
            added to your wallet
          </Text>
          <Text
            style={{
              ...scaleFont(12),
              fontWeight: "400",
              paddingTop: scaleHeight(4),
              textAlign: "center",
              verticalAlign: "middle",
            }}
          >
            *will be transferred to your account once the order is delivered
          </Text>
        </View>
        <View
          style={{
            paddingTop: scaleHeight(16),
            paddingBottom: scaleHeight(12),
          }}
        >
          <FullButton
            title="See next steps"
            onPress={() => setOrderComponent()}
          />
        </View>
        <Pressable onPress={() => router.navigate("/")}>
          <Text
            style={{
              ...scaleFont(14),
              fontWeight: "500",
              color: "#025ACE",
              paddingTop: scaleHeight(4),
              textAlign: "center",
              verticalAlign: "middle",
            }}
          >
            Go to Home
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
