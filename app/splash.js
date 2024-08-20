import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import {
  scaleFont,
  scaleHeight,
  scalePadding,
  scaleWidth,
} from "./utils/getScaledDimensions";

export default function Splash() {
  return (
    <>
      <View style={customeStyles.Logo}>
        <Image
          contentFit={"contain"}
          source={require("../assets/yaper-logo.svg")}
          height={scaleHeight(102)}
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
          <Text style={customeStyles.FooterText}>
            Trusted by 100,000+ users
          </Text>
        </View>
        <View style={customeStyles.Footer}>
          <Text style={customeStyles.FooterText}>
            Made with{" "}
            <Image
              contentFit={"contain"}
              source={require("../assets/heart.svg")}
              height={scaleHeight(12)}
              width={scaleWidth(12)}
            />{" "}
            in India
          </Text>
        </View>
      </View>
    </>
  );
}

const customeStyles = StyleSheet.create({
  Logo: {
    height: "85%",
    justifyContent: "center",
  },
  Footer: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  SecureIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    ...scalePadding(8),
  },
  Footer: {
    ...scaleFont(10),
    justifyContent: "center",
    alignItems: "center",
  },
  FooterText: {
    color: "#F9FAFB",
    textAlign: "center",
    textAlignVertical: "center",
  },
});
