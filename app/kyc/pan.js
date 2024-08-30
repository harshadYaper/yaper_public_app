import { Alert, View } from "react-native";
import Input from "../common/input";
import { useEffect, useState } from "react";
import {
  scaleFont,
  scaleHeight,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { FullButton } from "../common/button";
import { getUser, updatePAN } from "../api";
import saveData from "../auth/save_data";
import { sleep } from "../utils/helper";
import BankDetails from "./bank_details";
import { useDispatch } from "react-redux";
import { isIOS } from "../utils/environment";

export default function PAN({ setComponent }) {
  const [data, setData] = useState({});
  const [validData, setValidData] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    // check to see pan num regex, name in char only, dob as date
    setValidData(true);
  }, [data]);

  const PAN_DETAILS = [
    {
      label: "PAN Number",
      placeholder: "Enter 10-digit pan number",
      key: "pan_number",
    },
    {
      label: "PAN Holder Name",
      placeholder: "Enter name as on pan",
      key: "account_holder_name",
    },
    // {
    //   label: "Date of Birth",
    //   placeholder: "Enter date of birth",
    //   key: "dob",
    // },
  ];
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "100%",
        justifyContent: "space-between",
        ...scalePadding(25),
        paddingTop: scaleHeight(32),
      }}
    >
      <View>
        {PAN_DETAILS.map(({ label, placeholder, key }) => (
          <View key={key} style={{ paddingBottom: scaleHeight(24) }}>
            <Input
              key={label}
              inputArray={[data[key]]}
              onChange={(val) => setData((p) => ({ ...p, [key]: val }))}
              label={label}
              placeholder={placeholder}
              style={{
                Label: { ...scaleFont(14), paddingLeft: scaleWidth(0) },
                Input: {
                  paddingLeft: scaleWidth(16),
                  paddingRight: scaleWidth(16),
                  paddingTop: scaleHeight(isIOS ? 5 : 10),
                  paddingBottom: scaleHeight(10),
                },
              }}
            />
          </View>
        ))}
      </View>
      <FullButton
        // disabled={validData}
        onPress={async () => {
          let response = await updatePAN(data);
          //response?.retry
          if (response?.message == "Pan have been successfully verified") {
            await saveData({
              dispatch,
              user: (await getUser({}))?.user,
            });
            sleep(2000);
            setComponent([
              BankDetails,
              "Add Bank Account Details",
              { account_holder_name: data.account_holder_name },
            ]);
          } else {
            Alert.alert(
              "error",
              Object.keys(response.errors)
                .map((key) =>
                  [snakeToTitleize(key) + " "]
                    .concat(response.errors[key])
                    .join(" ")
                )
                .join("\n")
            );
          }
        }}
      />
    </View>
  );
}
