import { Image } from "expo-image";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {
  scaleHeight,
  scaleMargin,
  scalePadding,
  scaleWidth,
} from "./utils/getScaledDimensions";
import { range } from "./utils/helper";
import { FullButton } from "./common/button";
import { putData } from "./storage";
import { router } from "expo-router";
import { useDispatch } from "react-redux";

export default function Welcome() {
  const [screen, setScreen] = useState(0);
  const dispatch = useDispatch();

  const handleDone = async () => {
    await putData("SHOWED_INTRO", true);
    dispatch({
      type: "SHOWED_INTRO",
      payload: {
        intro: true,
      },
    });
    router.navigate({ pathname: "/" });
  };

  const WELCOME_DATA = [
    {
      title: "Welcome to Yaper!",
      image: require("../assets/welcome/screen1.svg"),
      description:
        "With Yaper, you can use your credit card to buy products for us and earn real rewards! It's simple and rewarding.",
      next_message: "Get Started",
      onPress: () => {
        setScreen((p) => p + 1);
      },
    },

    {
      title: "Instant Wallet Credit!",
      image: require("../assets/welcome/screen2.svg"),
      description:
        "As soon as you place an order, the amount you spent is instantly credited to your Yaper wallet.",
      next_message: "Next",
      onPress: () => {
        setScreen((p) => p + 1);
      },
    },
    {
      title: "Earn Real Money!",
      image: require("../assets/welcome/screen3.svg"),
      description:
        "Once the order is delivered, the amount you spent, plus the reward money, is transferred directly to your bank account. It’s that easy!",
      next_message: "Start Earning",
      onPress: handleDone,
    },
  ];

  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "100%",
        justifyContent: "space-around",
        ...scalePadding(24),
      }}
    >
      <TouchableOpacity onPress={handleDone} style={{ width: "100%" }}>
        <Text
          style={{
            fontWeight: "500",
            color: "#025ACE",
            textAlign: "right",
            width: "100%",
            ...scalePadding(12),
          }}
        >
          Skip
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 20,

          fontWeight: "500",
          color: "#101828",
        }}
      >
        {WELCOME_DATA[screen].title}
      </Text>
      <Image
        source={WELCOME_DATA[screen].image}
        style={{
          height: scaleHeight(240),
          width: scaleWidth(240),
        }}
      />
      <Text
        style={{
          color: "#667085",
        }}
      >
        {WELCOME_DATA[screen].description}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {range(WELCOME_DATA.length).map((ind) => (
          <View
            key={"WELCOME_DATA" + ind}
            style={{
              width: scaleWidth(ind == screen ? 32 : 4),
              height: scaleHeight(4),
              borderRadius: 2,
              backgroundColor: "#667085",
              ...scaleMargin(8),
            }}
          ></View>
        ))}
      </View>
      <FullButton
        title={WELCOME_DATA[screen].next_message}
        onPress={WELCOME_DATA[screen].onPress}
      />
    </View>
  );
}
