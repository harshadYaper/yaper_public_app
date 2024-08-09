import { Text, TouchableOpacity, View } from "react-native";
import { FULL_WIDTH, REFERRAL_AMOUNT } from "../constants";
import { WHITE } from "../constants/colors";
import {
  scaleHeight,
  scaleMargin,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { Image } from "expo-image";
import { useSelector } from "react-redux";
import { router } from "expo-router";

export const LeftComp = () => {
  const { first_name, last_name } = useSelector((state) => state.user) || {};
  return (
    <TouchableOpacity
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        ...scalePadding(16),
      }}
      onPress={() => router.push({ pathname: "/profile" })}
    >
      <Image
        contentFit={"contain"}
        source={require("../../assets/profile.svg")}
        height={scaleHeight(32)}
        width={scaleWidth(32)}
      />
      <Text
        style={{
          fontSize: 16,

          fontWeight: "500",
          ...scalePadding(8),
        }}
      >
        {first_name + " " + last_name}
      </Text>
    </TouchableOpacity>
  );
};

export const RightComp = () => (
  <TouchableOpacity
    style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      ...scalePadding(8),
      ...scaleMargin(12),
      height: scaleHeight(32),
      backgroundColor: WHITE,
      color: "black",
      borderRadius: 16,
      borderColor: "#D0D5DD",
      borderWidth: 1,
    }}
    onPress={() => {
      router.navigate({ pathname: "/profile/refer" });
    }}
  >
    <Image
      contentFit={"contain"}
      source={require("../../assets/icons/Gift.svg")}
      height={scaleHeight(32)}
      width={scaleWidth(32)}
      style={{ tintColor: "#025ACE" }}
    />
    <Text
      style={{
        color: "black",
        fontSize: 10,

        fontWeight: "500",
      }}
    >
      Earn upto Rs.{REFERRAL_AMOUNT}
    </Text>
  </TouchableOpacity>
);

export default function Header({
  HeaderComponent,
  HeaderComponentStyles,
  HeaderComponentData,
}) {
  return (
    <>
      <View
        style={{
          height: scaleHeight(100),
          width: FULL_WIDTH,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomLeftRadius: scaleWidth(24),
          borderBottomRightRadius: scaleWidth(24),
          flexDirection: "row",
          backgroundColor: "#CEE3FF",
          paddingTop: scaleHeight(32),
        }}
      >
        <LeftComp />
        <RightComp />
      </View>

      {HeaderComponent && (
        <View
          style={{
            display: "flex",
            height: 150,
            width: "100%",
            borderRadius: 8,
            ...HeaderComponentStyles,
            ...scalePadding(12),
          }}
        >
          <HeaderComponent {...HeaderComponentData} />
        </View>
      )}
    </>
  );
}
