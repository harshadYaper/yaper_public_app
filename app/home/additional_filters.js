import { FlatList, Text, TouchableOpacity } from "react-native";
import {
  scaleHeight,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { WHITE } from "../constants/colors";
import { Image } from "expo-image";

export default function AdditionalFilters({
  setOpenFilters,
  setFilters,
  filters,
}) {
  const ADDITIONAL_FILTER = [
    {
      label: "Filter",
      onPress: () => {
        setOpenFilters((p) => !p);
        setFilters((p) =>
          p.filter((f) => f.key == "filter").length == 0
            ? [...p, { key: "filter", value: 1 }]
            : [...p.filter((i) => i.key !== "filter")]
        );
      },
      images: [
        require("../../assets/FiltersLines.svg"),
        require("../../assets/CaretDown.svg"),
      ],

      key: "filter",
    },
    {
      label: "No GST deals",
      onPress: () => {
        setFilters((p) =>
          p.filter((f) => f.key == "no_gst_deals").length == 0
            ? [...p, { key: "no_gst_deals", value: 1 }]
            : [...p.filter((i) => i.key !== "no_gst_deals")]
        );
      },
      key: "no_gst_deals",
    },
    {
      label: "No EMI deals",
      onPress: () => {
        setFilters((p) =>
          p.filter((f) => f.key == "no_emi_deals").length == 0
            ? [...p, { key: "no_emi_deals", value: 1 }]
            : [...p.filter((i) => i.key !== "no_emi_deals")]
        );
      },
      key: "no_emi_deals",
    },
  ];

  return (
    <FlatList
      horizontal
      contentContainerStyle={{
        height: scaleHeight(40),
        marginBottom: scaleHeight(30),
      }}
      showsHorizontalScrollIndicator={false}
      style={{
        paddingTop: 4,
        paddingBottom: 4,
      }}
      data={ADDITIONAL_FILTER}
      renderItem={({ item: { label, onPress, images, key } }) => {
        let selected = filters.filter((f) => f.key == key).length !== 0;
        return (
          <TouchableOpacity
            style={{
              backgroundColor: selected ? "#025ACE" : WHITE,
              borderColor: "#D0D5DD",
              borderWidth: 1,
              borderRadius: 20,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              minWidth: scaleWidth(118),
              marginRight: scaleWidth(12),
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
                color: selected ? WHITE : "#667085",
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
              />
            )}
            {selected && (
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
  );
}
