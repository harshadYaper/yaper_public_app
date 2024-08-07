import { Text, TouchableOpacity, View } from "react-native";
import { FULL_WIDTH } from "../constants";
import { WHITE } from "../constants/colors";
import {
  scaleHeight,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { Image } from "expo-image";
import { PrimaryCheckBox } from "../common/checkbox";
import { PrimaryRadio } from "../common/radio";
import { SmallButton } from "../common/button";

export default function Filters({
  filters = [],
  setOpenFilters,
  openFilterOption,
  setOpenFilterOption,
}) {
  return (
    <View
      style={{
        height: scaleHeight(680),
        width: FULL_WIDTH,
        backgroundColor: WHITE,
        position: "absolute",
        bottom: 0,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        marginBottom: -scaleHeight(20),
        zIndex: 10,
        ...scalePadding(12),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          height: scaleHeight(32),
          width: "100%",
          paddingLeft: scaleWidth(16),
          paddingRight: scaleWidth(16),
          paddingTop: scaleHeight(4),
          paddingBottom: scaleHeight(4),
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,

            color: "#101828",
          }}
        >
          Sort & Filter
        </Text>
        <TouchableOpacity
          onPress={() => {
            setOpenFilters(false);
          }}
        >
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
          borderWidth: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: scaleWidth(150),
            height: "100%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              onPress={() => {
                setOpenFilterOption(filter);
              }}
              key={filter?.id}
              style={{
                borderColor: "#D0D5DD",
                borderWidth: 1,
                flex: 1,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color:
                    openFilterOption?.id == filter?.id ? "#101828" : "#667085",
                  fontWeight: openFilterOption?.id == filter?.id ? 500 : 400,
                }}
              >
                {filter?.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flex: 1, height: "100%", ...scalePadding(6) }}>
          {
            {
              ms: openFilterOption.options.map(({ name, id, selected }) => (
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
                  selected={selected}
                />
              )),
              ss: openFilterOption.options.map(({ name, id, selected }) => (
                <PrimaryRadio
                  key={name + id}
                  onPress={() => {}}
                  label={name}
                  selected={selected}
                />
              )),
            }[openFilterOption?.type]
          }
        </View>
      </View>
      <View
        style={{
          height: scaleHeight(64),
          width: "100%",
          paddingLeft: scaleWidth(16),
          paddingRight: scaleWidth(16),
          paddingTop: scaleHeight(4),
          paddingBottom: scaleHeight(4),
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,

            fontWeight: "500",
            color: "#025ACE",
          }}
        >
          Clear All
        </Text>

        <SmallButton
          onPress={() => {
            setOpenFilters(false);
          }}
        />
      </View>
    </View>
  );
}
