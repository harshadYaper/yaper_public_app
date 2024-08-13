import { FlatList, Text, TouchableOpacity, View } from "react-native";
import {
  scaleHeight,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { WHITE } from "../constants/colors";
import { Image } from "expo-image";
import Input from "../common/input";
import { useEffect, useState } from "react";
import { isEmpty } from "../utils/helper";

export default function AdditionalFilters({
  setFilters,
  filters,
  fetchData,
  navigation,
}) {
  const handleKey = (key) => {
    setFilters((p) =>
      p[key]
        ? {
            ...Object.keys(p)
              .map((k) => k != key && { [k]: p[k] })
              .reduce((a, b) => ({ ...a, ...b })),
          }
        : { ...p, [key]: true }
    );
    fetchData({ resetData: true });
  };

  const ADDITIONAL_FILTER = [
    {
      label: "Filter",
      onPress: () => handleKey("filter"),
      images: [
        require("../../assets/FiltersLines.svg"),
        require("../../assets/CaretDown.svg"),
      ],
      key: "filter",
    },
    {
      label: "No GST deals",
      onPress: () => handleKey("gst_deals"),
      key: "gst_deals",
    },
    {
      label: "No EMI deals",
      onPress: () => handleKey("emi_deals"),
      key: "emi_deals",
    },
  ].slice(0, { home: 3, orders: 1, transactions: 0, support: 0 }[navigation]);

  const [searchString, setSearchString] = useState();

  useEffect(() => {
    searchString &&
      setFilters((p) => ({ ...p, query: searchString })) &&
      fetchData({ resetData: true });
  }, [searchString]);

  return (
    <View
      style={{
        ...scalePadding(4),
        width: "100%",
        height: scaleHeight(50),
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      {navigation == "orders" && (
        <View
          style={{
            paddingLeft: scaleWidth(12),
            paddingRight: scaleWidth(12),
          }}
        >
          <Input
            inputArray={[searchString]}
            onChange={(val) => setSearchString(val)}
            placeholder="Search orders"
            width={240}
            style={{
              Input: {
                ...scalePadding(10),
                paddingLeft: scaleWidth(14),
                paddingRight: scaleWidth(14),
              },
            }}
          />
        </View>
      )}

      {!isEmpty(ADDITIONAL_FILTER) && (
        <FlatList
          horizontal
          contentContainerStyle={{
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
          showsHorizontalScrollIndicator={false}
          data={ADDITIONAL_FILTER}
          renderItem={({ item: { label, onPress, images, key } }) => {
            let isSelected = filters[key];
            return (
              <TouchableOpacity
                style={{
                  backgroundColor: isSelected ? "#025ACE" : WHITE,
                  borderColor: "#D0D5DD",
                  borderWidth: 1,
                  borderRadius: 20,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  ...scalePadding(4),
                  paddingRight: scaleWidth(8),
                  paddingLeft: scaleWidth(8),
                }}
                onPress={onPress}
              >
                {images && (
                  <Image
                    contentFit={"contain"}
                    source={images[0]}
                    height={scaleHeight(16)}
                    width={scaleWidth(16)}
                  />
                )}
                <Text
                  style={{
                    fontWeight: "500",
                    ...scalePadding(8),
                    color: isSelected ? WHITE : "#667085",
                  }}
                >
                  {label}
                </Text>
                {images && (
                  <Image
                    contentFit={"contain"}
                    source={images[1]}
                    height={scaleHeight(16)}
                    width={scaleWidth(16)}
                    // style={{ tintColor: isSelected ? WHITE : "#667085" }}
                  />
                )}
                {isSelected && (
                  <Image
                    contentFit={"contain"}
                    source={require("../../assets/icons/X.svg")}
                    style={{
                      height: scaleHeight(16),
                      width: scaleWidth(16),
                      tintColor: "#FFFFFF",
                    }}
                  />
                )}
              </TouchableOpacity>
            );
          }}
          keyExtractor={({ label }) => label}
        />
      )}

      {navigation == "transactions" && (
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            width: "100%",
            paddingRight: scaleWidth(12),
          }}
        >
          <FlatList
            horizontal
            contentContainerStyle={{
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%",
              paddingLeft: scaleWidth(12),
              paddingRight: scaleWidth(12),
            }}
            showsHorizontalScrollIndicator={false}
            data={[
              { label: "Recieved", value: "payment_withdrawn" },
              { label: "Cancelled", value: "payment_cancelled" },
            ]}
            renderItem={({ item: { label, value }, index }) => {
              let isSelected = filters.payment_state == value;
              return (
                <TouchableOpacity
                  style={{
                    backgroundColor: isSelected ? "#025ACE" : WHITE,
                    borderColor: "#D0D5DD",
                    borderWidth: 1,
                    borderRadius: 8,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    ...scalePadding(4),
                    paddingRight: scaleWidth(8),
                    paddingLeft: scaleWidth(8),
                    marginRight: index == 0 ? scaleWidth(8) : 0,
                  }}
                  onPress={() =>
                    setFilters((p) => ({ ...p, payment_state: value }))
                  }
                >
                  <Text
                    style={{
                      fontWeight: "500",
                      ...scalePadding(8),
                      color: isSelected ? WHITE : "#667085",
                    }}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={({ label }) => label}
          />
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              backgroundColor: "#FFFFFF",
              ...scalePadding(12),
              borderColor: "#D0D5DD",
              borderWidth: 1,
              borderRadius: 8,
            }}
          >
            <Image
              source={require("../../assets/Download.svg")}
              style={{
                height: scaleHeight(20),
                width: scaleWidth(20),
                marginRight: scaleWidth(8),
              }}
            />
            <Text style={{ fontSize: 12, color: "#101828" }}>Export</Text>
          </View>
        </View>
      )}
    </View>
  );
}
