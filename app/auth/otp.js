import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useRef, useState } from "react";

import Input from "../common/input";
import { FullButton } from "../common/button";
import { scalePadding, scaleWidth } from "../utils/getScaledDimensions";
import { array_generator, isDigit } from "../utils/helper";
import { login, otp_verify } from "../api";
import DataRoute from "./data_route";
import saveData from "./save_data";
import { useDispatch } from "react-redux";

export default function OTP({ mobile_number, setComponent }) {
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

  const timeFormatter = (val) => {
    return val <= 9 ? "0" + val.toString() : val;
  };

  const handleSubmit = async () => {
    setLoading(true);
    let response = await otp_verify({
      otp: otp.join(""),
      mobile_number,
    });
    setLoading(false);
    if (response.response_message !== "success") {
      Alert.alert(response.response_message);
    } else {
      await saveData({ dispatch, user: response.user });
      DataRoute({ user: response.user, checkCard: true, setComponent });
    }
  };

  const handleResend = async () => {
    setLoading(true);
    let response = await login({ mobile_number, resent: true });
    setLoading(false);
    if (response.response_message !== "success") {
      Alert.alert(response.response_message);
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
        height: "100%",
        ...scalePadding(24),
      }}
    >
      <View
        style={{
          display: "flex",
          width: "100%",
          ...scalePadding(8),
        }}
      >
        <Text
          style={{
            fontSize: 20,

            fontWeight: "500",
            marginBottom: "10%",
            marginTop: "20%",
            ...scalePadding(6),
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
        <TouchableOpacity onPress={handleResend} disabled={!(resendTimer == 0)}>
          <Text
            style={{
              fontSize: 12,

              color: resendTimer == 0 ? "#336AB4" : "#ABB0BC",
              ...scalePadding(6),
            }}
          >
            {!(resendTimer == 0)
              ? `${timeFormatter(parseInt(resendTimer / 60))}:${timeFormatter(
                  parseInt(resendTimer % 60)
                )} mins`
              : "Resend code"}
          </Text>
        </TouchableOpacity>
      </View>

      <FullButton disabled={!validOTP || loading} onPress={handleSubmit} />
    </View>
  );
}
