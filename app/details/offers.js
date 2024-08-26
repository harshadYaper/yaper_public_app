import { Pressable, Text, View } from "react-native";
import {
  scaleBorder,
  scaleFont,
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
        paddingTop: scaleHeight(12),
        paddingBottom: scaleHeight(24),
      }}
    >
      <View
        style={{
          ...{
            display: "flex",
          },
          ...(onExpand
            ? {
                backgroundColor: WHITE,
                borderColor: "#D0D5DD",
                borderWidth: scaleWidth(2),
                borderRadius: scaleBorder(8),
              }
            : { paddingBottom: scaleHeight(12) }),
        }}
      >
        <Pressable
          onPress={() => onExpand && onExpand()}
          style={{
            ...{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            },
            ...(onExpand
              ? { ...scalePadding(12) }
              : {
                  paddingLeft: scaleWidth(6),
                  paddingRight: scaleWidth(6),
                  paddingBottom: scaleHeight(12),
                  paddingTop: scaleHeight(12),
                }),
          }}
        >
          <Text
            style={{
              ...scaleFont(14),
              fontWeight: "500",
              color: "#667085",
            }}
          >
            Offer Details
          </Text>
          {onExpand && (
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
          )}
        </Pressable>
        {expanded && (
          <View
            style={{
              ...{ justifyContent: "center", ...scalePadding(12) },
              ...(onExpand
                ? {}
                : {
                    backgroundColor: WHITE,
                    borderColor: "#D0D5DD",
                    borderWidth: scaleWidth(2),
                    borderRadius: scaleBorder(8),
                  }),
            }}
          >
            <Image
              contentFit={"contain"}
              source={{ uri: bank?.logo }}
              style={{
                height: scaleHeight(16),
                width: scaleWidth(80),
              }}
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
                ...scaleFont(12),
                color: "#101828",
              }}
            >
              {offer?.description}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
