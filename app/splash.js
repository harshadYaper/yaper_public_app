import { Image } from "expo-image";
import { Text, View } from "react-native";
import { scaleHeight, scaleWidth } from "./utils/getScaledDimensions";

export default function Splash({ customeStyles }) {
  return (
    <>
      <View style={customeStyles.Logo}>
        <Image
          contentFit={"contain"}
          source={require("../assets/yaper-logo.svg")}
          height={scaleHeight(102.266)}
          width={scaleWidth(106)}
        />
      </View>
      <View style={customeStyles.Footer}>
        <View style={customeStyles.SecureIcon}>
          <Image
            contentFit={"contain"}
            source={require("../assets/shield-verified.svg")}
            height={scaleHeight(30)}
            width={scaleWidth(30)}
          />
          <Text style={{ color: "#F9FAFB" }}>Trusted by 100,000+ users</Text>
        </View>
        <View style={customeStyles.FooterText}>
          <Text style={{ color: "#F9FAFB" }}>
            Made with{" "}
            <Image
              contentFit={"contain"}
              source={require("../assets/heart.svg")}
              height={scaleHeight(9)}
              width={scaleWidth(9)}
            />{" "}
            in India
          </Text>
        </View>
      </View>
    </>
  );
}
