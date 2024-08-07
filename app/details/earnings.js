import { Pressable, Text, View } from "react-native";
import {
  scaleHeight,
  scaleMargin,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { WHITE } from "../constants/colors";
import { Image } from "expo-image";

export default function Earnings({ items, expanded = true, onExpand }) {
  const data = items
    .map(({ type, content }) => ({ [type]: content }))
    .reduce((a, b) => ({ ...a, ...b }));

  return (
    <View
      style={{
        display: "flex",
        backgroundColor: WHITE,
        borderColor: "#E4E4E4",
        borderRadius: 8,
        borderWidth: 1,
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
          Earning Details
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
        <>
          <View
            style={{
              justifyContent: "center",
              ...scalePadding(12),
            }}
          >
            <Text
              style={{
                fontSize: 12,

                color: "#101828",
                marginBottom: scaleHeight(12),
              }}
            >
              You'll spend
            </Text>
            <Text
              style={{
                fontSize: 12,

                fontWeight: "700",
                color: "#101828",
              }}
            >
              {data.spend}
            </Text>
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

                fontWeight: "700",
                color: "#101828",
                marginBottom: scaleHeight(12),
              }}
            >
              You'll recieve
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 12,

                  color: "#667085",
                }}
              >
                Grand Total
              </Text>

              <Text
                style={{
                  fontSize: 12,

                  fontWeight: "700",
                  color: "#667085",
                }}
              >
                {data.receive}
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              ...scalePadding(12),
              backgroundColor: "#025ACE40",
            }}
          >
            <Text
              style={{
                fontSize: 12,

                fontWeight: "700",
                color: "#101828",
              }}
            >
              Your total earnings
            </Text>

            <Text
              style={{
                fontSize: 12,

                fontWeight: "700",
                color: "#101828",
              }}
            >
              {data.earnings}
            </Text>
          </View>
        </>
      )}
    </View>
  );
}
