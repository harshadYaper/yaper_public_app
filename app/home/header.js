import { Text, TouchableOpacity, View } from "react-native";
import { REFERRAL_AMOUNT } from "../constants";
import { WHITE } from "../constants/colors";
import {
  scaleBorder,
  scaleFont,
  scaleHeight,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { Image } from "expo-image";
import { useSelector } from "react-redux";
import { router } from "expo-router";
import { truncate } from "../utils/helper";

export const LeftComp = () => {
  const { first_name } = useSelector((state) => state.user) || {};
  return (
    <TouchableOpacity
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
      onPress={() => router.push({ pathname: "/profile" })}
    >
      <Image
        contentFit={"contain"}
        source={require("../../assets/profile.png")}
        height={scaleHeight(32)}
        width={scaleWidth(32)}
        style={{ borderRadius: scaleBorder(32) }}
      />
      <Text
        style={{
          ...scaleFont(16),
          fontWeight: "500",
          textAlign: "center",
          textAlignVertical: "center",
          paddingLeft: scaleWidth(8),
        }}
      >
        {truncate(first_name, 10, "")}
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
      backgroundColor: WHITE,
      color: "black",
      borderRadius: scaleBorder(16),
      borderColor: "#D0D5DD",
      borderWidth: scaleWidth(2),
      paddingLeft: scaleWidth(8),
      paddingRight: scaleWidth(8),
    }}
    onPress={() => {
      router.navigate({ pathname: "/profile/refer" });
    }}
  >
    <Image
      contentFit={"contain"}
      source={require("../../assets/icons/Gift.svg")}
      style={{
        tintColor: "#025ACE",
        height: scaleHeight(20),
        width: scaleWidth(20),
      }}
    />
    <Text
      style={{
        color: "black",
        ...scaleFont(10),
        fontWeight: "500",
        textAlign: "center",
        textAlignVertical: "center",
        ...scalePadding(8),
      }}
    >
      Earn upto {"\u20B9"}
      {REFERRAL_AMOUNT}
    </Text>
  </TouchableOpacity>
);

export default function Header({
  HeaderComponent,
  HeaderComponentStyles,
  HeaderComponentData,
  showProfile,
}) {
  return (
    <>
      {showProfile && (
        <View
          style={{
            backgroundColor: "#CEE3FF",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: scaleWidth(16),
            paddingRight: scaleWidth(16),
            paddingTop: scaleHeight(60),
            paddingBottom: scaleHeight(24),
          }}
        >
          <LeftComp />
          <RightComp />
        </View>
      )}
      <View
        style={{
          display: "flex",
          width: "100%",
          borderRadius: scaleBorder(8),
          ...scalePadding(12),
          ...HeaderComponentStyles,
        }}
      >
        <HeaderComponent {...HeaderComponentData} />
      </View>
    </>
  );
}
