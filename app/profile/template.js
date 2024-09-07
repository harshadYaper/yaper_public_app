import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CategoryView from "./categoryView";
import { useEffect, useState } from "react";
import {
  scaleBorder,
  scaleFont,
  scaleHeight,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { Image } from "expo-image";
import { router } from "expo-router";
import WebToken from "./webToken";
import { getStaticMeta, getUser, getWebToken, updateUserStatus } from "../api";
import { clearData } from "../storage";
import StaticPage from "./static-page";
import saveData from "../auth/save_data";
import Toggle from "../common/toggle";
import { getAppVariables, setEnvironment } from "../utils/environment";
import showToast from "../utils/toast";

export default function Template() {
  const { email, first_name, last_name, phone, whatsapp_consent } =
    useSelector((state) => state.user) || {};

  const [val, setVal] = useState({});
  const [whatsappConsent, setWhatsappConsent] = useState(whatsapp_consent);
  const [showWebToken, setShowWebToken] = useState();
  const [showStaticPage, setShowStaticPage] = useState();
  const [staticMeta, setStaticMeta] = useState();

  useEffect(() => {
    (async () => {
      setStaticMeta(await getStaticMeta({}));
      let { env, log } = await getAppVariables();
      setVal({ env, log: log ? "log_on" : "log_off" });
    })();
  }, []);
  useEffect(() => {
    (async () => {
      if (val && val.env) {
        let { env } = await getAppVariables();
        env !== val.env && setEnvironment(val.env);
      }
    })();
  }, [val]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (whatsapp_consent != whatsappConsent) {
      (async () => {
        let resp = await updateUserStatus({
          whatsapp_consent: whatsappConsent,
        });
        if (resp.response_message == "Data updated succesfully") {
          let newUserData = await getUser({});
          if (newUserData?.response_message == "success") {
            await saveData({ dispatch, user: newUserData.user });
          }
        } else {
          setWhatsappConsent(false);
          showToast({ message: resp.response_message, type: "error" });
        }
      })();
    }
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
      optionPadding: 16,
    },
    account: {
      category: "ACCOUNT MANAGEMENT",
      options: [
        {
          label: "Login in to Yaper Web",
          onPress: handleWebLogin,
        },
        {
          label: "Manage KYC & Bank Account",
          onPress: async () => {
            router.navigate({
              pathname: "/kyc",
            });
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
            router.push({ pathname: "/support" });
          },
        },
        {
          label: "Support Tickets",
          onPress: () => {
            router.push({ pathname: "/support", params: { key: "tickets" } });
          },
        },
        {
          label: "FAQs",
          onPress: () => {
            setShowStaticPage("FAQs");
            // router.push({
            //   pathname: "/profile/static-pages",
            //   params: { showStaticPage: "FAQs" },
            // }),
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
            // router.push({
            //   pathname: "/profile/static-pages",
            //   params: { showStaticPage: "Terms and Conditions" },
            // });
          },
        },
        {
          label: "Privacy Policy",
          onPress: () => {
            setShowStaticPage("Privacy Policy");
            // router.push({
            //   pathname: "/profile/static-pages",
            //   params: { showStaticPage: "Privacy Policy" },
            // });
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
        <View
          style={{
            paddingTop: scaleHeight(12),
            paddingBottom: scaleHeight(12),
          }}
        >
          <View
            style={{
              paddingBottom: scaleHeight(24),
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontWeight: "500",
                color: "#667085",
                ...scaleFont(14),
              }}
            >
              Updates over whatsapp
            </Text>
            <TouchableOpacity
              style={{
                width: scaleWidth(40),
                height: scaleHeight(22),
                borderRadius: scaleBorder(12),
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
        {(staticMeta?.data?.allow_staging_whitelist.includes(email) ||
          true) && (
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              ...scalePadding(16),
            }}
          >
            {[
              { label: "env", options: ["production", "staging"] },
              { label: "log", options: ["log_on", "log_off"] },
            ].map(({ label, options }) => (
              <Toggle
                key={label}
                options={options}
                val={val}
                setVal={setVal}
                parameter={label}
                onChange={(val) => setVal((p) => ({ ...p, [label]: val }))}
              />
            ))}
          </View>
        )}
      </ScrollView>
      {showWebToken && (
        <>
          <View
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#667085",
              opacity: 0.7,
            }}
          ></View>
          <WebToken
            showWebToken={showWebToken}
            handleModal={handleModal}
            handleWebLogin={handleWebLogin}
          />
        </>
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
