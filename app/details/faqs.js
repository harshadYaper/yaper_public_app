import { Linking, Pressable, Text, View } from "react-native";
import {
  scaleBorder,
  scaleFont,
  scaleHeight,
  scaleMargin,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { WHITE } from "../constants/colors";
import { Image } from "expo-image";

export default function FAQs({ videos }) {
  return (
    <View
      style={{
        display: "flex",
        marginBottom: scaleHeight(120),
        paddingTop: scaleHeight(12),
      }}
    >
      <Text
        style={{
          ...scaleFont(14),
          fontWeight: "500",
          color: "#667085",
          paddingLeft: scaleWidth(6),
          paddingRight: scaleWidth(6),
          paddingBottom: scaleHeight(12),
          paddingTop: scaleHeight(12),
        }}
      >
        FAQs
      </Text>
      <View
        style={{
          backgroundColor: WHITE,
          borderColor: "#E4E4E4",
          borderRadius: scaleBorder(8),
          borderWidth: scaleWidth(2),
          justifyContent: "center",
          ...scalePadding(12),
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: scaleHeight(12),
          }}
        >
          <Text style={{ flex: 1, ...scaleFont(14) }}></Text>
          <Text
            style={{
              ...scaleFont(10),
              color: "#667085",
              width: scaleWidth(60),
              textAlign: "center",
              textAlignVertical: "center",
            }}
          >
            English
          </Text>
          <Text
            style={{
              ...scaleFont(10),
              color: "#667085",
              width: scaleWidth(60),
              textAlign: "center",
              textAlignVertical: "center",
            }}
          >
            Hindi
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: scaleHeight(12),
          }}
        >
          <Text
            style={{
              flex: 1,
              ...scaleFont(12),
              color: "#101828",
            }}
          >
            {videos?.headers?.en}
          </Text>
          <Pressable
            onPress={() => Linking.openURL(videos?.urls?.en)}
            style={{
              width: scaleWidth(60),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/Vector.svg")}
              style={{
                height: scaleHeight(22),
                width: scaleWidth(20),
                ...scalePadding(2),
              }}
            />
          </Pressable>
          <Pressable
            onPress={() => Linking.openURL(videos?.urls?.hi)}
            style={{
              width: scaleWidth(60),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/Vector.svg")}
              style={{
                height: scaleHeight(22),
                width: scaleWidth(20),
                ...scalePadding(2),
              }}
            />
          </Pressable>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              flex: 1,
              ...scaleFont(12),
              color: "#101828",
            }}
          >
            Why is TDS deducted from payments?
          </Text>
          <Pressable
            onPress={() =>
              Linking.openURL("https://www.youtube.com/shorts/HhnvsgCtO9w")
            }
            style={{
              width: scaleWidth(60),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/Vector.svg")}
              style={{
                height: scaleHeight(22),
                width: scaleWidth(20),
                ...scalePadding(2),
              }}
            />
          </Pressable>
          <Pressable
            onPress={() =>
              Linking.openURL("https://www.youtube.com/shorts/ImOEm_UrJLM")
            }
            style={{
              width: scaleWidth(60),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/Vector.svg")}
              style={{
                height: scaleHeight(22),
                width: scaleWidth(20),
                ...scalePadding(2),
              }}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
