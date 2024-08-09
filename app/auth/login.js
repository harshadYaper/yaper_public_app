import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";

import Input from "../common/input";
import { FullButton } from "../common/button";
import {
  scaleFont,
  scaleHeight,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { login } from "../api";
import OTP from "./otp";
import { Image } from "expo-image";

export default function Login({ setComponent, mobile }) {
  const [mobileNumber, setMobileNumber] = useState(mobile);
  const [countryCode, setCountryCode] = useState(91);
  const [validData, setValidData] = useState(false);
  const [loading, setLoading] = useState(false);
  const MOBILE_NUMBER_LENGTH = 10;

  const mobileValid = (val) => {
    setMobileNumber(val?.replace(/[^0-9]/g, ""));
  };

  useEffect(() => {
    setValidData(mobileNumber?.length == MOBILE_NUMBER_LENGTH);
  }, [mobileNumber]);

  const handleLogin = async () => {
    setLoading(true);
    let response = await login({
      mobile_number: `${countryCode}${mobileNumber}`,
    });
    setLoading(false);
    console.log(response);
    if (response.response_message !== "success") {
      Alert.alert(response.response_message);
    } else {
      setComponent([OTP, { mobile_number: `${countryCode}${mobileNumber}` }]);
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
      <View>
        <Text
          style={{
            fontSize: 20,

            fontWeight: "500",
            marginBottom: "10%",
            marginTop: "20%",
            ...scalePadding(6),
          }}
        >
          Log in or sign up
        </Text>
        <Input
          inputArray={[mobileNumber]}
          onChange={mobileValid}
          hint="Mobile number linked to your credit cards is required"
          placeholder="enter 10-digit mobile number"
          label="Mobile Number"
          keyboardType="numeric"
          maxLength={10}
          errorMessage=""
          style={{
            Input: {
              paddingLeft: scaleWidth(72),
            },
          }}
          leftComponent={<CountryInfo countryCode={countryCode} />}
          rightComponent={
            mobileNumber && <Cross setMobileNumber={setMobileNumber} />
          }
        />
      </View>
      <FullButton disabled={!validData || loading} onPress={handleLogin} />
    </View>
  );
}

function CountryInfo({ countryCode }) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        position: "absolute",
        justifyContent: "center",
        alignContent: "center",
        left: 10,
        zIndex: 10,
      }}
    >
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Image
          source={require("../../assets/india-flag.svg")}
          style={{ height: scaleHeight(20), width: scaleWidth(24) }}
        />
      </View>
      <Text
        style={{
          fontSize: scaleFont(16),
          textAlign: "center",
          textAlignVertical: "center",
        }}
      >
        {" "}
        +{countryCode}{" "}
      </Text>
    </View>
  );
}

function Cross({ setMobileNumber }) {
  return (
    <TouchableOpacity
      onPress={() => setMobileNumber()}
      style={{
        position: "absolute",
        right: 10,
        zIndex: 10,
      }}
    >
      <Image
        source={require("../../assets/icons/XCircle.svg")}
        style={{
          height: scaleHeight(20),
          width: scaleWidth(20),
        }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  CROSS: {},
});
