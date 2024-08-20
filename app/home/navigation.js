import { Image } from "expo-image";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import {
  scaleBorder,
  scaleFont,
  scaleHeight,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { WHITE } from "../constants/colors";

export default function Navigation({
  navMenu,
  setNav,
  nav,
  setData,
  setFilters,
  setPageNumber,
}) {
  return (
    <View
      style={{
        backgroundColor: WHITE,
        position: "absolute",
        bottom: 0,
        borderTopLeftRadius: scaleBorder(20),
        borderTopRightRadius: scaleBorder(20),
        ...scalePadding(20),
        paddingBottom: scaleHeight(20),
      }}
    >
      <FlatList
        data={navMenu}
        contentContainerStyle={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
        style={{}}
        horizontal
        renderItem={({ item: { label, icon, navigation } }) => (
          <TouchableOpacity
            onPress={() => {
              setData({ data: [], filter: [] });
              setFilters({});
              setPageNumber(1);
              setNav(navigation);
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                contentFit={"contain"}
                source={icon}
                height={scaleHeight(28)}
                width={scaleWidth(28)}
                style={{ tintColor: nav == navigation ? "#025ACE" : "#667085" }}
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  textAlignVertical: "center",
                  color: nav == navigation ? "#025ACE" : "#667085",
                  ...scaleFont(14),
                }}
              >
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
