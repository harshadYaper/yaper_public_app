import { FlatList, Text, TouchableOpacity, View } from "react-native";
import {
  scaleBorder,
  scaleFont,
  scaleHeight,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { Image } from "expo-image";
import { useState } from "react";
import { useSelector } from "react-redux";
import { router } from "expo-router";
import { putData } from "../storage";

export default function Supports({ data, openFilters }) {
  const [activeOption, setActiveOption] = useState();

  return (
    <FlatList
      contentContainerStyle={{}}
      showsVerticalScrollIndicator={false}
      style={{
        width: "100%",
        opacity: openFilters ? 0.1 : 1,
        ...scalePadding(12),
        marginBottom: scaleHeight(100),
      }}
      data={data || []}
      renderItem={({ item: { title, options }, index }) => (
        <View
          style={{ ...(index == 0 ? {} : { paddingTop: scaleHeight(24) }) }}
        >
          <View
            style={{
              ...{
                display: "flex",
                backgroundColor: "#FFFFFF",
                ...scalePadding(12),
                borderRadius: scaleBorder(8),
                borderColor: "#D0D5DD",
                borderWidth: scaleWidth(2),
              },
              ...(activeOption == title ? { paddingTop: scaleHeight(24) } : {}),
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
                activeOption == title
                  ? setActiveOption()
                  : setActiveOption(title)
              }
            >
              <Text
                style={{
                  ...scaleFont(14),
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
                renderItem={({
                  item: {
                    action: { type, next, resolution },
                    title,
                  },
                  index,
                }) => (
                  <View>
                    {index !== 0 && (
                      <View
                        style={{
                          display: "flex",
                          height: scaleHeight(2),
                          backgroundColor: "#D0D5DD",
                        }}
                      ></View>
                    )}
                    <TouchableOpacity
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingBottom: scaleHeight(20),
                        paddingTop: scaleHeight(20),
                      }}
                      onPress={async () => {
                        router.push({
                          pathname: "/support",
                          params: { title },
                        });
                      }}
                    >
                      <Text
                        style={{
                          ...scaleFont(12),
                          fontWeight: "400",
                          color: "#667085",
                          flex: 1,
                          flexWrap: "wrap",
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
                    </TouchableOpacity>
                  </View>
                )}
              />
            )}
          </View>
        </View>
      )}
      keyExtractor={({ title }) => `Support ${title}`}
    />
  );
}

export function SupportsHeader({ supportTimings }) {
  return (
    <>
      <Text
        style={{
          ...scaleFont(20),
          fontWeight: "500",
          ...scalePadding(4),
          paddingBottom: scaleHeight(16),
          width: "100%",
        }}
      >
        Support
      </Text>
      {supportTimings && (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F6E3C0",
            width: "100%",
            ...scalePadding(12),
            borderRadius: scaleBorder(8),
            borderWidth: scaleWidth(2),
            borderColor: "#FDB022",
          }}
        >
          <Image
            source={require("../../assets/Info.svg")}
            style={{
              height: scaleHeight(28),
              width: scaleWidth(28),
              tintColor: "#FDB022",
              marginRight: scaleWidth(12),
            }}
          />
          <Text
            style={{ ...scaleFont(12), fontWeight: "700", color: "#101828" }}
          >
            {supportTimings}
          </Text>
        </View>
      )}
    </>
  );
}
