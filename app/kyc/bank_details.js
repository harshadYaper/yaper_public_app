import { View } from "react-native";
import Input from "../common/input";
import { useEffect, useState } from "react";
import { scaleHeight, scalePadding } from "../utils/getScaledDimensions";
import { FullButton } from "../common/button";
import { getBank, getUser, updateKYC, updatePAN } from "../api";
import saveData from "../auth/save_data";
import { sleep } from "../utils/helper";
import { useDispatch } from "react-redux";
import { router } from "expo-router";

export default function BankDetails({ setComponent, account_holder_name }) {
  const [data, setData] = useState({ account_holder_name });
  const [validData, setValidData] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setValidData(true);
    (async () => {
      if (data?.ifsc_code && data.ifsc_code.length == 11) {
        let response = await getBank(data);
        if (response?.IFSC == data?.ifsc_code) {
          setData((p) => ({ ...p, bank_name: response?.BANK }));
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
        ...scalePadding(20),
      }}
    >
      <View>
        {PAN_DETAILS.map(({ label, placeholder, key, editable }) => (
          <Input
            editable={editable}
            inputArray={[data[key]]}
            onChange={(val) => setData((p) => ({ ...p, [key]: val }))}
            label={label}
            placeholder={placeholder}
            style={{
              InputGroup: {
                marginBottom: scaleHeight(20),
              },
            }}
          />
        ))}
      </View>
      <FullButton
        // disabled={validData}
        onPress={async () => {
          let response = await updateKYC(data);
          console.log(":::", response);

          if (
            response?.message == "Bank Account Details successfully updated"
          ) {
            await saveData({
              dispatch,
              user: (await getUser({}))?.user,
            });
            sleep(2000);
            router.navigate({
              pathname: "/ecommerce-view",
            });
          }
        }}
      />
    </View>
  );
}
