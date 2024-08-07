import { Modal, Pressable, Text, TouchableOpacity } from "react-native";
import Input from "../common/input";
import {
  scaleHeight,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { useEffect, useState } from "react";

export default function WebToken({
  showWebToken,
  handleModal,
  handleWebLogin,
}) {
  const [refresh, setRefresh] = useState();

  useEffect(() => {
    refresh > 0 && timer();
    console.log(refresh);
  }, [refresh]);

  const timer = () => {
    setTimeout(() => {
      setRefresh((p) => (p > 0 ? p - 1 : 0));
    }, 1000);
  };

  useEffect(() => {
    let timer = Math.round(
      (Date.parse(showWebToken.expire_at) - Date.now()) / 1000
    );
    setRefresh(timer > 0 ? timer : 1);
  }, []);

  return (
    <Modal animationType="slide" transparent>
      <Pressable
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => handleModal()}
      >
        <Pressable
          onPress={() => handleModal(showWebToken)}
          style={{
            display: "flex",
            width: "80%",
            height: scaleHeight(300),
            ...scalePadding(24),
            backgroundColor: "#FFFFFF",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "500",
              color: "#000000",
              marginBottom: scaleHeight(24),
            }}
          >
            Login to Yaper Web
          </Text>

          <Text
            style={{
              fontSize: 12,
              color: "#667085",
              marginBottom: scaleHeight(24),
            }}
          >
            Open website https://yaper.co and hit the Sign In
          </Text>

          <Text
            style={{
              fontSize: 12,

              fontWeight: "500",
              color: "#101828",
              marginBottom: scaleHeight(24),
            }}
          >
            Enter the below code in your browser
          </Text>
          <Input
            inputArray={showWebToken.webToken.split("")}
            maxLength={1}
            usageType="LOGIN CODE"
            errorMessage=""
            width={"18%"}
            style={{
              Input: {
                textAlign: "center",
                textAlignVertical: "center",
                marginRight: scaleWidth(12),
                marginBottom: scaleHeight(24),
                fontSize: 18,
                fontWeight: "500",
                color: "#202131",
              },
            }}
            editable={false}
          />
          <TouchableOpacity
            onPress={() => {
              handleModal();
              handleWebLogin();
            }}
          >
            {refresh !== 0 ? (
              <Text>
                {Math.floor(refresh / 60) < 10 ? "0" : ""}
                {Math.floor(refresh / 60)}:{refresh % 60 < 10 ? "0" : ""}
                {Math.floor(refresh % 60)}
              </Text>
            ) : (
              <Text
                style={{
                  fontWeight: "500",
                  color: "#667085",
                }}
              >
                Not able to login?{" "}
                <Text
                  style={{
                    color: "#025ACE",
                  }}
                >
                  {" "}
                  Refresh the code
                </Text>
              </Text>
            )}
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
