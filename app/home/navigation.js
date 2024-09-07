import { Image } from "expo-image";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import {
  scaleFont,
  scaleHeight,
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
        paddingLeft: scaleWidth(20),
        paddingRight: scaleWidth(20),
        paddingTop: scaleHeight(4),
        paddingBottom: scaleHeight(12),
        borderColor: "#D0D5DD",
        borderWidth: scaleWidth(2),
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
            style={{
              width: scaleWidth(64),
              height: scaleHeight(64),
              justifyContent: "space-around",
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
                  ...scaleFont(10),
                  fontWeight: "500",
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
