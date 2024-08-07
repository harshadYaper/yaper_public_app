import { Image } from "expo-image";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import {
  scaleHeight,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { WHITE } from "../constants/colors";
import { FULL_WIDTH } from "../constants";

export default function Navigation({ navMenu, setNav, nav, setData }) {
  return (
    <View
      style={{
        height: scaleHeight(108),
        width: FULL_WIDTH,
        backgroundColor: WHITE,
        position: "absolute",
        bottom: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        ...scalePadding(12),
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
              setNav(navigation);
            }}
          >
            <Image
              contentFit={"contain"}
              source={icon}
              height={scaleHeight(64)}
              width={scaleWidth(64)}
              style={{ tintColor: nav == navigation ? "#025ACE" : "#667085" }}
            />
            <Text
              style={{
                textAlign: "center",
                textAlignVertical: "center",
                color: nav == navigation ? "#025ACE" : "#667085",
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
