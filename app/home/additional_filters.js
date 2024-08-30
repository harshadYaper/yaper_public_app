import { FlatList, Text, TouchableOpacity, View } from "react-native";
import {
  scaleBorder,
  scaleFont,
  scaleHeight,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { WHITE } from "../constants/colors";
import { Image } from "expo-image";
import Input from "../common/input";
import { useEffect, useState } from "react";
import { isEmpty } from "../utils/helper";
import { isIOS } from "../utils/environment";

export default function AdditionalFilters({
  setFilters,
  filters,
  fetchData,
  navigation,
  filterStyles,
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
      ].slice(
        0,
        { home: 2, orders: 1, transactions: 0, support: 0 }[navigation]
      ),
      key: "filter",
    },
    {
      label: "Non GST deals",
      onPress: () => handleKey("gst_deals"),
      key: "gst_deals",
    },
    {
      label: "Non EMI deals",
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
        height: scaleHeight(60),
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      {navigation == "orders" && (
        <View
          style={{
            paddingLeft: scaleWidth(12),
          }}
        >
          <Input
            inputArray={[searchString]}
            onChange={(val) => setSearchString(val)}
            placeholder="Search orders"
            width={isIOS ? 242 : 252} //240 + 12 from padding
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
          }}
          showsHorizontalScrollIndicator={false}
          data={ADDITIONAL_FILTER}
          renderItem={({ item: { label, onPress, images, key }, index }) => {
            let isSelected =
              filters[key] ||
              (key == "filter" &&
                Object.keys(filters).filter(
                  (f) => !ADDITIONAL_FILTER.map((af) => af.key).includes(f)
                ).length !== 0);

            return (
              <View
                style={{ ...(index !== 0 && { paddingLeft: scaleWidth(8) }) }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: isSelected ? "#025ACE" : WHITE,
                    borderColor: "#D0D5DD",
                    borderWidth: scaleWidth(2),
                    borderRadius: scaleBorder(20),
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    ...scalePadding(8),
                    paddingRight: scaleWidth(12),
                    paddingLeft: scaleWidth(12),
                    ...filterStyles.Filter,
                  }}
                  onPress={onPress}
                >
                  {images && (
                    <Image
                      contentFit={"contain"}
                      source={images[0]}
                      style={{
                        height: scaleHeight(16),
                        width: scaleWidth(16),
                        ...(isSelected && { tintColor: "#FFFFFF" }),
                        ...filterStyles.Image,
                      }}
                    />
                  )}
                  <Text
                    style={{
                      ...scaleFont(14),
                      fontWeight: "500",
                      paddingRight: scaleWidth(4),
                      paddingLeft: scaleWidth(4),
                      color: "#667085",
                      ...filterStyles.Label,
                      ...(isSelected && { color: WHITE }),
                    }}
                  >
                    {label}
                  </Text>
                  {images && images[1] && (
                    <Image
                      contentFit={"contain"}
                      source={images[1]}
                      style={{
                        height: scaleHeight(16),
                        width: scaleWidth(16),
                        ...(isSelected && { tintColor: "#FFFFFF" }),
                      }}
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
              </View>
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
          }}
        >
          <FlatList
            horizontal
            contentContainerStyle={{
              justifyContent: "space-between",
              alignItems: "center",
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
                    borderWidth: scaleWidth(2),
                    borderRadius: scaleBorder(8),
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    ...scalePadding(4),
                    paddingRight: scaleWidth(8),
                    paddingLeft: scaleWidth(8),
                    marginRight: scaleWidth(index == 0 ? 8 : 0),
                  }}
                  onPress={() =>
                    setFilters((p) => ({ ...p, payment_state: value }))
                  }
                >
                  <Text
                    style={{
                      ...scaleFont(14),
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
        </View>
      )}
    </View>
  );
}
