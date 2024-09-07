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
import { getBank, getUser, updateKYC } from "../api";
import saveData from "../auth/save_data";
import { isEmpty, sleep, snakeToTitleize } from "../utils/helper";
import { useDispatch } from "react-redux";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import { isIOS } from "../utils/environment";
import showToast from "../utils/toast";

export default function BankDetails({ account_holder_name }) {
  const { bank_accounts, pan_holder_name } = useSelector((state) => state.user);

  const [data, setData] = useState(
    bank_accounts
      ? {
          account_holder_name: pan_holder_name,
          ...bank_accounts,
          account_number_confirmation: bank_accounts.account_number,
        }
      : { account_holder_name: account_holder_name || pan_holder_name }
  );
  const [validData, setValidData] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setValidData(true);
    (async () => {
      if (data?.ifsc_code && data.ifsc_code.length == 11 && !data.bank_name) {
        let response = await getBank(data);
        if (response.IFSC == data.ifsc_code) {
          setData((p) => ({ ...p, bank_name: response.BANK }));
        } else {
          Alert.alert("error", "Bank " + response + ` for ${data.ifsc_code}`);
        }
      }
    })();
  }, [data]);

  const PAN_DETAILS = [
    {
      label: "Account Number",
      placeholder: "Enter account number",
      key: "account_number",
    },
    {
      label: "Confirm Account Number",
      placeholder: "Confirm account number",
      key: "account_number_confirmation",
      secureFields: true,
    },
    {
      label: "Account Holder's Name",
      placeholder: "Enter account holder's name",
      key: "account_holder_name",
      editable: false,
    },
    {
      label: "IFSC Code",
      placeholder: "Enter six-digit IFSC Code",
      key: "ifsc_code",
    },
    {
      label: "Bank Name",
      placeholder: "Enter name of bank",
      key: "bank_name",
      editable: false,
    },

    // {
    //     label: "GST Number",
    //     placeholder: "Enter your GST NUmber",
    //     key: "gst_number",
    //   },
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
        {PAN_DETAILS.map(
          ({ label, placeholder, key, editable, secureFields }) => (
            <View key={key} style={{ paddingBottom: scaleHeight(24) }}>
              <Input
                key={label}
                secureFields={secureFields}
                editable={editable}
                inputArray={[data[key]]}
                onChange={(val) =>
                  setData((p) => ({
                    ...p,
                    [key]: val,
                    bank_name: key == "ifsc_code" ? undefined : p.bank_name,
                  }))
                }
                style={{
                  Label: { ...scaleFont(14), paddingLeft: scaleWidth(0) },
                  Input: {
                    paddingLeft: scaleWidth(16),
                    paddingRight: scaleWidth(16),
                    paddingTop: scaleHeight(isIOS ? 5 : 10),
                    paddingBottom: scaleHeight(10),
                  },
                }}
                label={label}
                placeholder={placeholder}
                usageType={"BANK DETAILS"}
              />
            </View>
          )
        )}
      </View>
      <FullButton
        // disabled={validData}
        title="Save"
        onPress={async () => {
          let response = await updateKYC(data);
          if (response.message == "Bank Account Details successfully updated") {
            let routeVariable = isEmpty(bank_accounts);
            if (routeVariable) {
              router.navigate({
                pathname: "/ecommerce-view",
              });
            } else {
              router.back();
            }
            await saveData({
              dispatch,
              user: (await getUser({}))?.user,
            });
            sleep(2000);
            showToast({ message: "Bank details updated", type: "success" });
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
