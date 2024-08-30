import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FULL_WIDTH } from "../constants";
import { WHITE } from "../constants/colors";
import {
  scaleBorder,
  scaleFont,
  scaleHeight,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { Image } from "expo-image";
import { PrimaryCheckBox } from "../common/checkbox";
import { PrimaryRadio } from "../common/radio";
import { SmallButton } from "../common/button";
import { isIOS } from "../utils/environment";

export default function Filters({
  filters = [],
  openFilterOption,
  setOpenFilterOption,
  setFilters,
  fetchData,
  selectedFilters,
}) {
  const handleClose = (fetch) => {
    setFilters((p) => ({ ...p, filter: false }));
    fetch && fetchData({ resetData: true });
  };

  return (
    <>
      <Pressable
        style={{
          backgroundColor: "#101828",
          position: "absolute",
          opacity: 0.9,
          height: "100%",
          width: "100%",
          zIndex: 10,
        }}
        onPress={handleClose}
      />
      <View
        style={{
          height: "80%",
          width: FULL_WIDTH,
          backgroundColor: WHITE,
          position: "absolute",
          bottom: 0,
          borderTopLeftRadius: scaleBorder(12),
          borderTopRightRadius: scaleBorder(12),
          zIndex: 10,
          paddingTop: scaleHeight(12),
          paddingBottom: scaleHeight(16),
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: scaleHeight(48),
            width: "100%",
            paddingLeft: scaleWidth(16),
            paddingRight: scaleWidth(16),
            paddingTop: scaleHeight(4),
            paddingBottom: scaleHeight(12),
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              ...scaleFont(16),
              color: "#101828",
            }}
          >
            Sort & Filter
          </Text>
          <TouchableOpacity onPress={() => handleClose(false)}>
            <Image
              source={require("../../assets/icons/X.svg")}
              style={{
                height: scaleHeight(24),
                width: scaleWidth(24),
                tintColor: "#101828",
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: scaleHeight(32),
            width: "100%",
            flex: 1,
            borderColor: "#D0D5DD",
            borderBottomWidth: scaleWidth(2),
            borderTopWidth: scaleWidth(2),
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: scaleWidth(110),
              display: "flex",
              borderColor: "#D0D5DD",
              borderRightWidth: scaleWidth(2),
              height: "100%",
            }}
          >
            {filters.map((filter) => (
              <TouchableOpacity
                onPress={() => {
                  setOpenFilterOption({
                    ...filter,
                    options: filter.options.map((o) =>
                      filter.type == "ms" &&
                      selectedFilters[filter.id]
                        ?.split(",")
                        ?.includes(o.id.toString())
                        ? { ...o, selected: true }
                        : o
                    ),
                  });
                }}
                key={filter?.id}
                style={{
                  ...{
                    borderBottomWidth: scaleWidth(2),
                    borderColor: "#D0D5DD",
                    justifyContent: "center",
                    alignItems: "center",
                    ...scalePadding(16),
                  },
                  ...(openFilterOption?.id == filter?.id
                    ? {
                        backgroundColor: "#F9FAFB",
                      }
                    : {}),
                }}
              >
                <Text
                  style={{
                    color:
                      openFilterOption?.id == filter?.id
                        ? "#101828"
                        : "#667085",
                    fontWeight: openFilterOption?.id == filter?.id ? 700 : 400,
                    ...scaleFont(12),
                  }}
                >
                  {filter?.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <ScrollView
            style={{
              flex: 1,
              height: "100%",
              ...scalePadding(6),
            }}
          >
            {
              {
                ms: openFilterOption.options.map(({ name, id }) => (
                  <PrimaryCheckBox
                    key={name + id}
                    onPress={() => {
                      setOpenFilterOption((p) => ({
                        ...p,
                        options: p.options.map((o) =>
                          o.id == id ? { ...o, selected: !o.selected } : o
                        ),
                      }));
                    }}
                    label={name}
                    selected={
                      openFilterOption.type == "ms" &&
                      selectedFilters[openFilterOption.id]
                        ?.split(",")
                        .includes(id.toString())
                    }
                    styles={{
                      paddingTop: scaleHeight(12),
                      paddingBottom: scaleHeight(12),
                    }}
                  />
                )),
                ss: openFilterOption.options.map(({ name, id, selected }) => (
                  <PrimaryRadio
                    key={name + id}
                    onPress={() => {
                      setOpenFilterOption((p) => ({
                        ...p,
                        options: p.options.map((o) => ({
                          ...o,
                          selected: o.id == id,
                        })),
                      }));
                    }}
                    label={name}
                    selected={selectedFilters[openFilterOption.id] == id}
                    styles={{
                      paddingTop: scaleHeight(12),
                      paddingBottom: scaleHeight(12),
                    }}
                  />
                )),
              }[openFilterOption?.type]
            }
          </ScrollView>
        </View>
        <View
          style={{
            ...{
              width: "100%",
              paddingLeft: scaleWidth(16),
              paddingRight: scaleWidth(16),
              paddingTop: scaleHeight(16),

              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            },
            ...(isIOS ? { paddingBottom: scaleHeight(16) } : {}),
          }}
        >
          <Pressable onPress={() => setFilters({})}>
            <Text
              style={{
                ...scaleFont(14),
                fontWeight: "500",
                color: "#025ACE",
              }}
            >
              Clear All
            </Text>
          </Pressable>

          <SmallButton
            onPress={() => handleClose(true)}
            title="Apply"
            width={scaleWidth(100)}
            borderRadius={scaleBorder(4)}
          />
        </View>
      </View>
    </>
  );
}
