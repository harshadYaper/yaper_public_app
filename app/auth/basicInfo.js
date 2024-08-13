import { Text, View } from "react-native";
import { useEffect, useState } from "react";

import Input from "../common/input";
import { FullButton } from "../common/button";
import { scaleHeight, scalePadding } from "../utils/getScaledDimensions";
import { isEmpty } from "../utils/helper";
import { saveUserData } from "../api";
import DataRoute from "./data_route";
import saveData from "./save_data";
import { useDispatch } from "react-redux";
import StaticPage from "../profile/static-page";

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
  const [showStaticPage, setShowStaticPage] = useState();

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    let response = await saveUserData(
      data
        .map(({ key, value }) => ({ [key]: value }))
        .reduce((val1, val2) => ({ ...val1, ...val2 }))
    );
    console.log(response);
    if (response.response_message == "success") {
      await saveData({ dispatch, user: response.user, dispatchToken: true });
      DataRoute({ user: response.user, setComponent });
    }
  };

  useEffect(() => {
    setValidData(data.map((d) => !isEmpty(d.value)).reduce((a, b) => a && b));
  }, [data]);

  return (
    <>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          ...scalePadding(24),
          opacity: showStaticPage ? 0.1 : 1,
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
                  data.map((d) =>
                    d.label !== label ? d : { ...d, value: val }
                  )
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
            By clicking on next, you are indicating that you have read and
            agreed to our{" "}
            <Text
              onPress={() => setShowStaticPage("Terms and Conditions")}
              style={{
                textDecorationLine: "underline",
              }}
            >
              terms of service{" "}
            </Text>
            and{" "}
            <Text
              onPress={() => setShowStaticPage("Privacy Policy")}
              style={{
                textDecorationLine: "underline",
              }}
            >
              privacy policy.
            </Text>
          </Text>
        </View>
      </View>
      {showStaticPage && (
        <StaticPage
          showStaticPage={showStaticPage}
          setShowStaticPage={setShowStaticPage}
        />
      )}
    </>
  );
}
