import { Pressable, Text, View } from "react-native";
import {
  scaleHeight,
  scaleMargin,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { Image } from "expo-image";
import { WHITE } from "../constants/colors";

export default function Offers({ offer, bank, expanded = true, onExpand }) {
  return (
    <View
      style={{
        display: "flex",
        backgroundColor: WHITE,
        borderColor: "#D0D5DD",
        borderWidth: 1,
        borderRadius: 8,
        marginTop: scaleHeight(12),
        marginBottom: scaleHeight(12),
      }}
    >
      <Pressable
        onPress={() => onExpand && onExpand()}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: scaleWidth(8),
          paddingRight: scaleWidth(8),
        }}
      >
        <Text
          style={{
            fontWeight: "500",
            color: "#667085",
            ...scaleMargin(6),
            marginBottom: scaleHeight(12),
            marginTop: scaleHeight(12),
          }}
        >
          Offer Details
        </Text>
        <Image
          source={
            expanded
              ? require("../../assets/icons/CaretCircleUp.svg")
              : require("../../assets/icons/CaretCircleDown.svg")
          }
          style={{
            height: scaleHeight(20),
            width: scaleWidth(20),
          }}
        />
      </Pressable>
      {expanded && (
        <View
          style={{
            justifyContent: "center",
            ...scalePadding(12),
          }}
        >
          <Image
            source={bank?.logo}
            style={{ height: scaleHeight(16), width: scaleWidth(80) }}
          />
          <View
            style={{
              backgroundColor: "#D0D5DD",
              height: scaleHeight(2),
              width: "100%",
              marginTop: scaleHeight(12),
              marginBottom: scaleHeight(12),
            }}
          ></View>
          <Text
            style={{
              fontSize: 12,

              color: "#101828",
            }}
          >
            {offer?.description}
          </Text>
        </View>
      )}
    </View>
  );
}
