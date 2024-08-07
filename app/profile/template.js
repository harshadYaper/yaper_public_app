import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CategoryView from "./categoryView";
import { useEffect, useState } from "react";
import {
  scaleHeight,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { Image } from "expo-image";
import { router } from "expo-router";
import WebToken from "./webToken";
import { getUser, getWebToken, updateUserStatus } from "../api";
import { clearData } from "../storage";
import StaticPage from "./static-page";
import saveData from "../auth/save_data";

export default function Template() {
  const { email, first_name, last_name, phone, whatsapp_consent } =
    useSelector((state) => state.user) || {};

  const [val, setVal] = useState({
    on: { label: "on" },
    off: { label: "off" },
  });
  const [whatsappConsent, setWhatsappConsent] = useState(whatsapp_consent);
  const [showWebToken, setShowWebToken] = useState();
  const [showStaticPage, setShowStaticPage] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let resp = await updateUserStatus({
        whatsapp_consent: whatsappConsent,
      });
      if (resp.response_message == "Data updated succesfully") {
        let newUserData = await getUser({});
        if (newUserData?.response_message == "success") {
          await saveData({ dispatch, user: newUserData.user });
        }
      }
    })();
  }, [whatsappConsent]);

  const handleModal = (val) => {
    setShowWebToken(val);
  };

  const handleWebLogin = async () => {
    let res = await getWebToken({});

    if (res.response_code == "200") {
      handleModal({
        webToken: res.web_token,
        expire_at: res.expire_at,
      });
    }
  };

  const PROFILE_OPTIONS = {
    personal: {
      category: "PERSONAL DETAILS",
      backgroundImage: { source: require("../../assets/bg.svg") },
      options: [
        {
          label: first_name + " " + last_name,
        },
        {
          label: `+${phone}`,
        },
        {
          label: email,
        },
      ],
    },
    account: {
      category: "ACCOUNT MANAGEMENT",
      options: [
        {
          label: "Login in to Yaper Web",
          onPress: handleWebLogin,
        },
        // {
        //   label: "Manage Address",
        //   onPress: () => {
        //     console.log("clicked");
        //   },
        // },
        {
          label: "Manage KYC & Bank Account",
          onPress: () => {
            console.log("clicked");
          },
        },
        {
          label: "My Cards",
          onPress: () => {
            router.navigate({ pathname: "/profile/cards" });
          },
        },
        {
          label: "Refer & Earn",
          onPress: () => {
            router.navigate({ pathname: "/profile/refer" });
          },
        },

        {
          label: "Log out",
          onPress: async () => {
            await clearData({});
            dispatch({ type: "LOG_OUT" });
            router.navigate({ pathname: "/" });
          },
        },
      ],
    },
    support: {
      category: "SUPPORT",
      options: [
        {
          label: "Contact Support",
          onPress: () => {
            console.log("clicked");
          },
        },
        {
          label: "Support Tickets",
          onPress: () => {
            console.log("clicked");
          },
        },
        {
          label: "FAQs",
          onPress: () => {
            setShowStaticPage("FAQs");
          },
        },
      ],
    },
    legal: {
      category: "LEGAL",
      options: [
        {
          label: "Terms of Service",
          onPress: () => {
            setShowStaticPage("Terms and Conditions");
          },
        },
        {
          label: "Privacy Policy",
          onPress: () => {
            setShowStaticPage("Privacy Policy");
          },
        },
      ],
    },
  };

  return (
    <>
      <ScrollView
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          opacity: showWebToken || showStaticPage ? 0.1 : 1,
        }}
        contentContainerStyle={{ ...scalePadding(12) }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!(showWebToken || showStaticPage)}
      >
        <CategoryView {...PROFILE_OPTIONS.personal} />
        <View>
          <View
            style={{
              marginTop: scaleHeight(24),
              marginBottom: scaleHeight(24),
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontWeight: "500",
                color: "#667085",
              }}
            >
              Updates over whatsapp
            </Text>
            <TouchableOpacity
              style={{
                width: scaleWidth(40),
                height: scaleHeight(22),
                borderRadius: 12,
                justifyContent: "center",
                alignItems: whatsappConsent ? "flex-end" : "flex-start",
                backgroundColor: whatsappConsent ? "#025ACE" : "#D0D5DD",
              }}
              onPress={() => setWhatsappConsent((wc) => !wc)}
            >
              <Image
                source={require("../../assets/ToggleButton.svg")}
                style={{ height: scaleHeight(20), width: scaleWidth(20) }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{ height: scaleHeight(2), backgroundColor: "#D0D5DD" }}
          ></View>
        </View>
        <CategoryView {...PROFILE_OPTIONS.account} />
        <CategoryView {...PROFILE_OPTIONS.support} />
        <CategoryView {...PROFILE_OPTIONS.legal} />
      </ScrollView>
      {showWebToken && (
        <WebToken
          showWebToken={showWebToken}
          handleModal={handleModal}
          handleWebLogin={handleWebLogin}
        />
      )}
      {showStaticPage && (
        <StaticPage
          showStaticPage={showStaticPage}
          setShowStaticPage={setShowStaticPage}
        />
      )}
    </>
  );
}
