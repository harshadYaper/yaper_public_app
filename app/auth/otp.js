import { Alert, Keyboard, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useRef, useState } from "react";

import Input from "../common/input";
import { FullButton } from "../common/button";
import {
  scaleFont,
  scaleHeight,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { array_generator, isDigit } from "../utils/helper";
import { login, otp_verify } from "../api";
import DataRoute from "./data_route";
import saveData from "./save_data";
import { useDispatch } from "react-redux";
import Timer from "../common/timer";
import BasicInfo from "./basicInfo";
import { mapUserInSegment } from "../utils/analytics";
import { isIOS } from "../utils/environment";
import { Image } from "expo-image";

export default function OTP({ mobile_number, setComponent, setLogin }) {
  const OTP_LENGTH = 4;
  const [otp, setOtp] = useState(array_generator(OTP_LENGTH, undefined));
  const [validOTP, setValidOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const ref = useRef([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setValidOTP(otp.filter((o) => o).length == OTP_LENGTH);
  }, [otp]);

  useEffect(() => {
    resendTimer > 0 &&
      setTimeout(() => {
        setResendTimer((t) => (t > 0 ? t - 1 : 0));
      }, 1000);
  }, [resendTimer]);

  const otpValid = (val, ind) => {
    setOtp([
      ...otp.slice(0, ind),
      isDigit(val) ? val : undefined,
      ...otp.slice(ind + 1, otp.length),
    ]);

    ref.current[ind + (isDigit(val) ? 1 : -1)]?.focus();
  };

  const handleSubmit = async () => {
    setLoading(true);
    let response = await otp_verify({
      otp: otp.join(""),
      mobile_number,
    });
    setLoading(false);
    if (response.response_message !== "success") {
      Alert.alert("error", response.response_message);
    } else {
      await saveData({ dispatch, user: response.user });
      await mapUserInSegment(response.user);
      DataRoute({ user: response.user, setComponent, Component: BasicInfo });
    }
  };

  const handleResend = async () => {
    setLoading(true);
    let response = await login({ mobile_number, resent: true });
    setLoading(false);
    if (response.response_message !== "success") {
      Alert.alert("error", response.response_message);
    } else {
      setResendTimer(120);
    }
  };

  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: isIOS && Keyboard.isVisible() ? "65%" : "100%",
      }}
    >
      <View
        style={{
          display: "flex",
          width: "100%",
          paddingTop: scaleHeight(60),
        }}
      >
        <TouchableOpacity
          onPress={() => setLogin()}
          style={{ ...scalePadding(16), paddingBottom: scaleHeight(0) }}
        >
          <Image
            source={require("../../assets/icons/CaretLeft.svg")}
            style={{
              height: scaleHeight(24),
              width: scaleWidth(24),
              tintColor: "#101828",
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            display: "flex",
            width: "100%",
            ...scalePadding(24),
          }}
        >
          <Text
            style={{
              ...scaleFont(20),
              fontWeight: "500",
              ...scalePadding(6),
              paddingBottom: scaleHeight(40),
            }}
          >
            We have sent you an OTP
          </Text>

          <Input
            inputArray={otp}
            usageType="OTP"
            reference={ref}
            onChange={otpValid}
            hint={`${OTP_LENGTH} digit OTP sent on +${mobile_number}`}
            keyboardType="numeric"
            maxLength={1}
            errorMessage=""
            width={44}
            style={{
              Input: {
                textAlign: "center",
                marginRight: scaleWidth(12),
              },
              InputGroup: {
                justifyContent: "flex-start",
              },
            }}
            autofocusInd={0}
          />
          <TouchableOpacity
            onPress={handleResend}
            disabled={!(resendTimer == 0)}
          >
            <Timer
              time={resendTimer}
              styles={{
                ...scaleFont(12),
                color: resendTimer == 0 ? "#336AB4" : "#ABB0BC",
                ...scalePadding(6),
                textAlign: "",
              }}
              content={resendTimer == 0 && "Resend code"}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ paddingBottom: scaleHeight(24) }}>
        <FullButton disabled={!validOTP || loading} onPress={handleSubmit} />
      </View>
    </View>
  );
}
