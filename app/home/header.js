import { Text, TouchableOpacity, View } from "react-native";
import { REFERRAL_AMOUNT } from "../constants";
import { WHITE } from "../constants/colors";
import {
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
        source={require("../../assets/profile.svg")}
        height={scaleHeight(32)}
        width={scaleWidth(32)}
      />
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          textAlign: "center",
          textAlignVertical: "center",
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
      ...scalePadding(8),
      height: scaleHeight(40),
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
        textAlign: "center",
        textAlignVertical: "center",
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
}) {
  return (
    <View
      style={{
        display: "flex",
        maxHeight: scaleHeight(150),
        width: "100%",
        borderRadius: 8,
        ...HeaderComponentStyles,
        ...scalePadding(12),
      }}
    >
      <HeaderComponent {...HeaderComponentData} />
    </View>
  );
}
