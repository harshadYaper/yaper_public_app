import { FlatList, Text, TouchableOpacity, View } from "react-native";
import {
  scaleHeight,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { Image } from "expo-image";
import { useState } from "react";

export default function Supports({ data, openFilters }) {
  const [activeOption, setActiveOption] = useState();

  return (
    <FlatList
      contentContainerStyle={{}}
      showsVerticalScrollIndicator={false}
      style={{
        width: "100%",
        opacity: openFilters ? 0.1 : 1,
        marginTop: scaleHeight(20),
        ...scalePadding(12),
        marginBottom: scaleHeight(100),
      }}
      data={data || []}
      renderItem={({ item: { title, options } }) => (
        <View
          style={{
            display: "flex",
            backgroundColor: "#FFFFFF",
            ...scalePadding(12),
            marginTop: scaleHeight(24),
            borderRadius: 8,
            borderColor: "#D0D5DD",
            borderWidth: 1,
          }}
        >
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onPress={() =>
              activeOption == title ? setActiveOption() : setActiveOption(title)
            }
          >
            <Text
              style={{
                fontWeight: "500",
                color: "#667085",
              }}
            >
              {title}
            </Text>
            <Image
              source={
                activeOption == title
                  ? require("../../assets/icons/CaretCircleDown.svg")
                  : require("../../assets/icons/CaretCircleRight.svg")
              }
              style={{
                height: scaleHeight(20),
                width: scaleWidth(20),
                tintColor: "#667085",
              }}
            />
          </TouchableOpacity>
          {activeOption == title && (
            <FlatList
              data={options}
              renderItem={({ item: { action, title }, index }) => (
                <View
                  style={{
                    marginTop: scaleHeight(12),
                  }}
                >
                  {index !== 0 && (
                    <View
                      style={{
                        display: "flex",
                        height: scaleHeight(2),
                        backgroundColor: "#D0D5DD",
                      }}
                    ></View>
                  )}
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: scaleHeight(12),
                      marginBottom: scaleHeight(12),
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,

                        color: "#667085",
                      }}
                    >
                      {title}
                    </Text>
                    <Image
                      source={require("../../assets/icons/CaretRight.svg")}
                      style={{
                        height: scaleHeight(20),
                        width: scaleWidth(20),
                        tintColor: "#667085",
                      }}
                    />
                  </View>
                </View>
              )}
            />
          )}
        </View>
      )}
      keyExtractor={({ title }) => `Support ${title}`}
    />
  );
}

export function SupportsHeader({ supportTimings }) {
  return (
    supportTimings && (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F6E3C0",
          width: "100%",
          ...scalePadding(12),
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "#FDB022",
        }}
      >
        <Image
          source={require("../../assets/icons/Info.svg")}
          style={{
            height: scaleHeight(28),
            width: scaleWidth(28),
            tintColor: "#FDB022",
            marginRight: scaleWidth(8),
          }}
        />
        <Text style={{ fontSize: 12, fontWeight: "700" }}>
          {supportTimings}
        </Text>
      </View>
    )
  );
}
