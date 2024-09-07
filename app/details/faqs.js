import { Linking, Pressable, Text, View } from "react-native";
import {
  scaleBorder,
  scaleFont,
  scaleHeight,
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
        paddingBottom: scaleHeight(120),
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
            paddingBottom: scaleHeight(12),
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
            paddingBottom: scaleHeight(12),
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

          <VideoComp url={videos?.urls?.en} />
          <VideoComp url={videos?.urls?.hi} />
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

          <VideoComp url={"https://www.youtube.com/shorts/HhnvsgCtO9w"} />
          <VideoComp url={"https://www.youtube.com/shorts/ImOEm_UrJLM"} />
        </View>
      </View>
    </View>
  );
}

function VideoComp({ url }) {
  return (
    <Pressable
      onPress={() => Linking.openURL(url)}
      style={{
        width: scaleWidth(60),
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/Vector.svg")}
        style={{
          height: scaleHeight(20),
          width: scaleWidth(20),
        }}
      />
    </Pressable>
  );
}
