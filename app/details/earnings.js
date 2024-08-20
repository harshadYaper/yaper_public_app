import { Pressable, Text, View } from "react-native";
import {
  scaleBorder,
  scaleFont,
  scaleHeight,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { WHITE } from "../constants/colors";
import { Image } from "expo-image";
import { titleize } from "../utils/helper";

export default function Earnings({ items, expanded = true, onExpand }) {
  const data = items
    .map((i) =>
      i.prices.map((p) =>
        p.prefix_operator
          ? { ...p, value: `${p.prefix_operator} ${p.value}` }
          : p
      )
    )
    .reduce((a, b) => [...a, ...b])
    .concat({
      label: "earnings",
      value: items.find((i) => i.type == "earnings").content,
    });
  const uniqueData = [
    ...new Map(data.map((item) => [item.label, item])).values(),
  ];

  return (
    <View
      style={{
        ...{
          display: "flex",
          paddingBottom: scaleHeight(12),
          paddingTop: scaleHeight(12),
        },
        ...(onExpand
          ? {
              backgroundColor: WHITE,
              borderColor: "#E4E4E4",
              borderRadius: scaleBorder(8),
              borderWidth: scaleWidth(2),
            }
          : {}),
      }}
    >
      <Pressable
        onPress={() => onExpand && onExpand()}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: scaleWidth(6),
          paddingRight: scaleWidth(6),
          paddingBottom: scaleHeight(12),
          paddingTop: scaleHeight(12),
        }}
      >
        <Text
          style={{
            ...scaleFont(14),
            fontWeight: "500",
            color: "#667085",
          }}
        >
          Earning Details
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
            backgroundColor: WHITE,
            borderColor: "#E4E4E4",
            borderRadius: scaleBorder(8),
            borderWidth: scaleWidth(2),
          }}
        >
          <View
            style={{
              justifyContent: "center",
              ...scalePadding(12),
            }}
          >
            <Text
              style={{
                ...scaleFont(12),
                color: "#101828",
                marginBottom: scaleHeight(12),
              }}
            >
              You'll spend
            </Text>
            <Text
              style={{
                ...scaleFont(12),
                fontWeight: "700",
                color: "#101828",
              }}
            >
              {data.find((d) => d.label == "spend").value}
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
                ...scaleFont(12),
                fontWeight: "700",
                color: "#101828",
                marginBottom: scaleHeight(12),
              }}
            >
              You'll recieve
            </Text>
            {uniqueData
              .filter((d) => !d.label.includes(["earnings"]))
              .map(({ label, value }) => (
                <View
                  key={label}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingTop: scaleHeight(6),
                    paddingBottom: scaleHeight(6),
                  }}
                >
                  <Text
                    style={{
                      ...scaleFont(12),
                      color: "#667085",
                    }}
                  >
                    {titleize(label, true)}
                  </Text>

                  <Text
                    style={{
                      ...scaleFont(12),
                      fontWeight: "700",
                      color: "#667085",
                    }}
                  >
                    {value}
                  </Text>
                </View>
              ))}
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
                ...scaleFont(12),
                fontWeight: "700",
                color: "#101828",
              }}
            >
              Your total earnings
            </Text>

            <Text
              style={{
                ...scaleFont(12),

                fontWeight: "700",
                color: "#101828",
              }}
            >
              {data.find((d) => d.label == "earnings").value}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
