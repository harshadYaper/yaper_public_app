import { Text, View } from "react-native";
import { useEffect, useState } from "react";

import Input from "../common/input";
import { FullButton } from "../common/button";
import { scaleHeight, scalePadding } from "../utils/getScaledDimensions";
import { isEmpty } from "../utils/helper";
import { saveUserData } from "../api";
import { router } from "expo-router";

export default function BasicInfo({ setComponent }) {
  const [data, setData] = useState([
    {
      label: "First Name",
      key: "firstName",
    },
    {
      label: "Last Name",
      key: "lastName",
    },
    {
      label: "Email ID",
      key: "email",
    },
  ]);

  const [validData, setValidData] = useState(false);

  const handleSubmit = async () => {
    let response = await saveUserData(
      data
        .map(({ key, value }) => ({ [key]: value }))
        .reduce((val1, val2) => ({ ...val1, ...val2 }))
    );
    console.log(response);
    if (response.response_message == "success") {
      // await saveData({ dispatch, user: response.user });
      // DataRoute({ user: response.user, checkCard: true });
      router.replace({
        pathname: "/profile/cards/add-cards",
      });
    }
  };

  useEffect(() => {
    setValidData(data.map((d) => !isEmpty(d.value)).reduce((a, b) => a && b));
  }, [data]);

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
          Let us know about you
        </Text>
        {data.map(({ label }, ind) => (
          <Input
            key={label}
            inputArray={[data.find((d) => d.label == label)[label]]}
            onChange={(val) => {
              setData((p) =>
                data.map((d) => (d.label !== label ? d : { ...d, value: val }))
              );
            }}
            placeholder={label}
            label={label}
            errorMessage=""
            style={
              ind !== 0 && {
                Label: {
                  marginTop: scaleHeight(32),
                },
              }
            }
          />
        ))}
      </View>
      <View>
        <FullButton disabled={!validData} onPress={handleSubmit} />
        <Text
          style={{
            textAlign: "center",
            fontSize: 10,

            fontWeight: "500",
          }}
        >
          By clicking on next, you are indicating that you have read and agreed
          to our{" "}
          <Text
            onPress={() => {
              console.log("T&C");
            }}
            style={{
              textDecorationLine: "underline",
            }}
          >
            terms of service{" "}
          </Text>
          and{" "}
          <Text
            onPress={() => {
              console.log("PP");
            }}
            style={{
              textDecorationLine: "underline",
            }}
          >
            privacy policy.
          </Text>
        </Text>
      </View>
    </View>
  );
}
