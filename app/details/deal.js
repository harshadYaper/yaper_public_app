import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { getDeal } from "../api";
import DealBox from "../home/deal_box";
import GetDetails from "./get_details";
import {
  scaleFont,
  scaleHeight,
  scalePadding,
} from "../utils/getScaledDimensions";
import { WHITE } from "../constants/colors";
import Offers from "./offers";
import Earnings from "./earnings";
import FAQs from "./faqs";
import Instructions from "./intructions";
import { FULL_WIDTH } from "../constants";
import { FullButton } from "../common/button";
import { putData } from "../storage";
import { useSelector } from "react-redux";

export default function Deal() {
  const { id } = useLocalSearchParams();
  const [deal, setDeal] = useState();

  const { pan_verified } = useSelector((state) => state.user) || {};

  const {
    store,
    title,
    bank,
    offer,
    items,
    logo,
    name,
    properties,
    address,
    color,
    color_code,
  } = GetDetails(deal?.data?.items);

  useEffect(() => {
    (async () => {
      id && setDeal(await getDeal({ id }));
    })();
  }, []);
  useEffect(() => {
    deal?.data?.fullfilled &&
      (() => {
        Alert.alert("Already Fulfilled");
        router.back();
      })();
  }, [deal]);

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: "#F9FAFB",
          width: "100%",
          height: "100%",
          ...scalePadding(8),
        }}
      >
        {name && (
          <DealBox
            id={id}
            title={name}
            image={logo}
            url={store?.logo}
            bank={bank}
            color_code={color_code}
            color={color}
            disabled={true}
            additionalStyles={{ title: { ...scaleFont(12) } }}
          />
        )}
        {deal && (
          <Instructions instruction={deal?.data?.actions?.infos?.headers?.en} />
        )}
        {offer && bank && <Offers offer={offer} bank={bank} />}
        {items && <Earnings items={items} />}
        {deal && <FAQs videos={deal?.data?.actions?.videos} />}
      </ScrollView>
      {deal && (
        <View
          style={{
            height: scaleHeight(90),
            width: FULL_WIDTH,
            backgroundColor: WHITE,
            position: "absolute",
            bottom: 0,
            ...scalePadding(12),
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FullButton
            title="Accept Deal"
            onPress={async () => {
              await putData("PARAMS", { deal_id: id, deal_name: name });
              router.navigate({
                pathname: pan_verified ? "/ecommerce-view" : "/kyc",
              });
            }}
          />
        </View>
      )}
    </>
  );
}
