import { Linking, Pressable, Text, View } from "react-native";
import {
  scaleHeight,
  scaleMargin,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { WHITE } from "../constants/colors";
import { Image } from "expo-image";

export default function FAQs({ videos }) {
  return (
    <View style={{ display: "flex", marginBottom: scaleHeight(90) }}>
      <Text
        style={{
          fontWeight: "500",
          color: "#667085",
          ...scaleMargin(6),
          marginBottom: scaleHeight(12),
          marginTop: scaleHeight(12),
        }}
      >
        FAQs
      </Text>
      <View
        style={{
          backgroundColor: WHITE,
          borderColor: "#E4E4E4",
          borderRadius: 8,
          borderWidth: 1,
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
          <Text style={{ flex: 1 }}></Text>
          <Text
            style={{
              fontSize: 10,

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
              fontSize: 10,

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
              fontSize: 12,

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
              fontSize: 12,

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
