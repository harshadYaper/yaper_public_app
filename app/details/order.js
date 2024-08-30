import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { customRequest, getOrder, putOrder } from "../api";
import DealBox from "../home/deal_box";
import GetDetails from "./get_details";
import Offers from "./offers";
import Earnings from "./earnings";
import { Image, ImageBackground } from "expo-image";
import {
  scaleBorder,
  scaleFont,
  scaleHeight,
  scaleMargin,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { snakeToTitleize, titleize } from "../utils/helper";
import Input from "../common/input";
import { FullButton } from "../common/button";
import { WHITE } from "../constants/colors";
import { getDocumentAsync } from "expo-document-picker";
import { PrimaryCheckBox } from "../common/checkbox";
import { PrimaryRadio } from "../common/radio";
import Timer from "../common/timer";
import { useSelector } from "react-redux";
import { putData } from "../storage";
import OrderPlaced from "./order_placed";

export default function Order({ setComponent, setOrderComponent }) {
  const { id, order_number, variant_id } = useLocalSearchParams();
  const [order, setOrder] = useState({});
  const [expanded, setExpanded] = useState();
  const [modal, setModal] = useState([]);
  const [Modal] = modal;

  const {
    store,
    bank,
    offer,
    items,
    logo,
    name,
    properties,
    color_code,
    color,
    order_states,
    order_meta,
    fields,
    button,
    secondary_button,
    third_button,
    deal_id,
  } = GetDetails(order?.items);

  useEffect(() => {
    (async () => {
      setOrder((await getOrder({ yaper_id: order_number }))?.data);
    })();
  }, []);

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: "#F9FAFB",
          width: "100%",
          height: "100%",
          opacity: Modal ? 0.1 : 1,
          ...scalePadding(12),
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
            price={properties.find((p) => p.label == "price/unit").value}
            quantity={properties.find((p) => p.label == "quantity").value}
            showCancel={{
              label: "Cancel Order",
              onCancel: () =>
                setModal([
                  () => (
                    <Pressable
                      style={{
                        display: "flex",
                        width: "100%",
                        position: "absolute",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onPress={() => setModal([])}
                    >
                      <View
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          opacity: 0.7,
                          backgroundColor: "#101828",
                        }}
                      />
                      <Pressable
                        style={{
                          display: "flex",
                          backgroundColor: WHITE,
                          justifyContent: "center",
                          alignItems: "center",
                          width: "80%",
                          ...scalePadding(24),
                          borderRadius: 8,
                        }}
                      >
                        <Text
                          style={{
                            color: "#000000",
                            ...scaleFont(14),
                            fontWeight: "500",
                            paddingBottom: scaleHeight(20),
                          }}
                        >
                          Reason for Cancellation
                        </Text>
                        <View
                          style={{
                            paddingBottom: scaleHeight(16),
                            paddingTop: scaleHeight(16),
                          }}
                        >
                          {[
                            "Cashback too less",
                            "Price Mismatch",
                            "Pin code Not Serviceable",
                            "Out of Stock",
                            "Other",
                          ].map((reason, ind) => (
                            <View
                              key={reason}
                              style={{
                                ...{
                                  width: "80%",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                },
                                ...(ind !== 0 && {
                                  paddingTop: scaleHeight(24),
                                }),
                              }}
                            >
                              <Text
                                style={{
                                  ...scaleFont(12),
                                  fontWeight: "400",
                                  color: "#101828",
                                }}
                              >
                                {reason}
                              </Text>
                              <PrimaryCheckBox
                                onPress={async () => {
                                  await customRequest({
                                    url: third_button.request.href,
                                    method: third_button.request.type,
                                    payload: { variant_id },
                                  });
                                  router.back();
                                }}
                              />
                            </View>
                          ))}
                        </View>
                        <Pressable onPress={() => setModal([])}>
                          <Text
                            style={{
                              ...scaleFont(14),
                              fontWeight: "500",
                              color: "#025ACE",
                              paddingTop: scaleHeight(24),
                            }}
                          >
                            Submit
                          </Text>
                        </Pressable>
                      </Pressable>
                    </Pressable>
                  ),
                ]),
            }}
          />
        )}
        <DealStatus
          order_states={order_states}
          yaper_id={order_number}
          variant_id={variant_id}
          setOrder={setOrder}
          fields={fields}
          order_meta={order_meta}
          setModal={setModal}
          button={button}
          secondary_button={secondary_button}
          remaining_time={order?.meta?.timer?.remaining_time}
          current_state={order?.state}
          deal_id={deal_id}
          deal_name={name}
          setComponent={setComponent}
          setOrderComponent={setOrderComponent}
        />

        {offer && bank && (
          <Offers
            offer={offer}
            bank={bank}
            expanded={expanded == "offer"}
            onExpand={() =>
              setExpanded((p) => (p == "offer" ? undefined : "offer"))
            }
          />
        )}
        {items && (
          <Earnings
            items={items}
            expanded={expanded == "earning"}
            onExpand={() =>
              setExpanded((p) => (p == "earning" ? undefined : "earning"))
            }
          />
        )}
        <View style={{ height: scaleHeight(50) }}></View>
      </ScrollView>
      {Modal && <Modal />}
    </>
  );
}

const DealStatus = ({
  order_states = [],
  yaper_id,
  variant_id,
  setOrder,
  fields,
  order_meta,
  setModal,
  button,
  secondary_button,
  remaining_time,
  current_state,
  deal_id,
  deal_name,
  setComponent,
  setOrderComponent,
}) => {
  const getData = (key) =>
    fields?.find((f) => f.key == key) || order_meta?.find((o) => o.key == key);

  const orderNumber = getData("order_number");
  const userNote = getData("user_note_details");
  const trackingNumber = getData("tracking_number");
  const deliverySupport = getData("delivery_support");
  const addDeliverySupport = getData("add_delivery_support");
  const uploadInvoice = getData("invoice");
  const warrenty = getData("warrenty");

  return (
    <View
      style={{ paddingTop: scaleHeight(24), paddingBottom: scaleHeight(32) }}
    >
      <Text
        style={{
          ...scaleFont(14),
          color: "#667085",
          ...scalePadding(8),
          paddingBottom: scaleHeight(16),
          fontWeight: "500",
        }}
      >
        Deal Status
      </Text>
      {order_states.map(({ green, label, state_at }, ind) => (
        <View key={label} style={{ paddingTop: ind !== 0 ? 16 : 0 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              paddingBottom: scaleHeight(8),
            }}
          >
            {green ? (
              <Image
                source={require("../../assets/icons/CheckCircle.svg")}
                style={{
                  height: scaleHeight(24),
                  width: scaleWidth(24),
                  tintColor: "#039855",
                }}
              />
            ) : (
              <ImageBackground
                source={require("../../assets/ellipse.svg")}
                style={{
                  height: scaleHeight(24),
                  width: scaleWidth(22),
                  tintColor: "#D0D5DD",
                  marginRight: scaleWidth(8),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {order_states.find((o) => !o.green).label !== label && (
                  <Image
                    source={require("../../assets/icons/LockSimple.svg")}
                    style={{
                      height: scaleHeight(14),
                      width: scaleWidth(14),
                      tintColor: "#D0D5DD",
                    }}
                  />
                )}
              </ImageBackground>
            )}
            <Text
              style={{
                fontWeight: "500",
                color: green
                  ? "#101828"
                  : order_states.find((o) => !o.green).label !== label
                  ? "#D0D5DD"
                  : "#667085",
                ...scaleFont(14),
                paddingLeft: scaleWidth(8),
              }}
            >
              {titleize(snakeToTitleize(label))}
            </Text>
          </View>
          {ind !== order_states.length - 1 && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: scaleWidth(2),
                  backgroundColor: "#D0D5DD",
                  height: "100%",
                  ...scaleMargin(12),
                  marginTop: scaleHeight(24),
                }}
              />
              <View style={{ display: "flex" }}>
                {state_at && (
                  <Text
                    style={{
                      ...scaleFont(10),
                      fontStyle: "normal",
                      fontWeight: "400",
                      color: "#667085",
                      paddingBottom: scaleHeight(16),
                      paddingLeft: scaleWidth(8),
                    }}
                  >
                    {state_at}
                  </Text>
                )}
                {{
                  accepted: label == "accepted" && current_state == "accepted",
                  ordered: orderNumber || userNote,
                  shipped:
                    trackingNumber || deliverySupport || addDeliverySupport,
                  delivered: uploadInvoice || warrenty || fields.length == 0,
                }[label] && (
                  <OrderComponent
                    state={label}
                    yaper_id={yaper_id}
                    variant_id={variant_id}
                    setOrder={setOrder}
                    order_meta={order_meta}
                    setModal={setModal}
                    button={button}
                    secondary_button={secondary_button}
                    orderNumber={orderNumber}
                    userNote={userNote}
                    trackingNumber={trackingNumber}
                    deliverySupport={deliverySupport}
                    addDeliverySupport={addDeliverySupport}
                    uploadInvoice={uploadInvoice}
                    warrenty={warrenty}
                    remaining_time={remaining_time}
                    deal_id={deal_id}
                    deal_name={deal_name}
                    setComponent={setComponent}
                    setOrderComponent={setOrderComponent}
                  />
                )}
              </View>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const OrderComponent = ({
  state,
  yaper_id,
  variant_id,
  setOrder,
  setModal,
  button,
  secondary_button,
  orderNumber,
  userNote,
  trackingNumber,
  deliverySupport,
  addDeliverySupport,
  uploadInvoice,
  warrenty,
  remaining_time,
  deal_id,
  deal_name,
  setComponent,
  setOrderComponent,
}) => {
  const [val, setVal] = useState({});

  const [expand, setExpand] = useState(!orderNumber.value);
  const { pan_verified } = useSelector((state) => state.user) || {};

  const {
    editable,
    key,
    label = "",
    value,
    placeholder,
    regex,
    drop_down_data,
  } = { ordered: orderNumber, shipped: trackingNumber }[state] || {};

  const [trackingPlatform, setTrackingPlatform] = useState();

  return (
    <View
      style={{
        paddingLeft: scaleWidth(8),
        paddingBottom: scaleHeight(16),
        paddingTop: scaleHeight(16),
      }}
    >
      <View
        style={{
          ...{
            backgroundColor: "#FFFFFF",
            borderColor: "#D0D5DD",
            borderRadius: scaleBorder(8),
            borderWidth: scaleWidth(2),
            justifyContent: "center",
          },
          ...(state == "accepted"
            ? { ...scalePadding(12), backgroundColor: "#F6E3C0" }
            : {
                paddingLeft: scaleWidth(expand ? 12 : 16),
                paddingRight: scaleWidth(expand ? 12 : 16),
                paddingTop: scaleHeight(expand ? 12 : 16),
                paddingBottom: scaleHeight(expand ? 12 : 16),
              }),
        }}
      >
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            minWidth: scaleWidth(282),
          }}
          onPress={() => {
            setExpand((e) => !e);

            uploadInvoice &&
              setVal({
                info: {
                  // type: `Only allowed ${uploadInvoice.file_type.join()}`,
                  size: uploadInvoice.info_text,
                },
              });
          }}
        >
          {state == "accepted" && (
            <View
              style={{
                borderWidth: scaleBorder(4),
                borderColor: "#667085",
                borderRadius: 20,
                height: scaleHeight(44),
                width: scaleWidth(40),
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <Timer
                time={remaining_time}
                showMins={false}
                styles={{ color: "#667085" }}
              />
            </View>
          )}
          <Text
            style={{
              ...{
                ...scaleFont(expand ? 10 : 12),
                color: expand ? "#667085" : "#101828",
                flex: 1,
                fontWeight: expand ? "400" : "500",
              },
              ...(state == "accepted"
                ? {
                    paddingLeft: scaleWidth(12),
                    ...scaleFont(12),
                    fontWeight: "500",
                    color: "#101828",
                  }
                : {
                    ...scalePadding(4),
                    paddingRight: scaleWidth(8),
                    paddingBottom: scaleHeight(8),
                  }),
            }}
          >
            {
              {
                accepted:
                  "Complete this deal by ordering before it gets expired.",
                ordered: `Enter your ${label.replace(
                  "#",
                  "number"
                )} from your order details`,
                shipped: "Your Shipping Order details",
                delivered: "Your Delivery Details",
              }[state]
            }
          </Text>
          {state !== "accepted" && (
            <Image
              source={
                expand
                  ? require("../../assets/icons/CaretCircleUp.svg")
                  : require("../../assets/icons/CaretCircleDown.svg")
              }
              style={{
                height: scaleHeight(20),
                width: scaleWidth(20),
              }}
            />
          )}
        </TouchableOpacity>
        {expand &&
          {
            ordered: (
              <>
                <Pressable
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    ...scalePadding(4),
                    paddingBottom: scaleHeight(8),
                  }}
                >
                  <Text
                    style={{
                      ...scaleFont(12),
                      fontWeight: "500",
                      color: "#101828",
                      paddingRight: scaleHeight(8),
                    }}
                  >
                    {label}
                  </Text>
                  <Image
                    source={require("../../assets/Info.svg")}
                    style={{
                      height: scaleHeight(20),
                      width: scaleWidth(20),
                    }}
                  />
                </Pressable>
                {value && val[key] === undefined ? (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      ...scalePadding(4),
                    }}
                  >
                    <Text
                      style={{
                        ...scaleFont(14),
                        fontWeight: "500",
                        color: "#101828",
                        paddingRight: scaleWidth(8),
                      }}
                    >
                      {value}
                    </Text>
                    {editable && (
                      <Pressable onPress={() => setVal({ [key]: value })}>
                        <Image
                          source={require("../../assets/PencilSimple.svg")}
                          style={{
                            height: scaleHeight(16),
                            width: scaleWidth(16),
                          }}
                        />
                      </Pressable>
                    )}
                  </View>
                ) : (
                  <>
                    <Input
                      inputArray={[val[key]]}
                      width={280}
                      onChange={(val) => {
                        setVal({ [key]: val });
                      }}
                      placeholder={placeholder}
                      style={{
                        Input: {
                          ...scalePadding(8),
                          marginBottom: scaleHeight(16),
                        },
                      }}
                    />
                    {button && (
                      <FullButton
                        width={scaleWidth(280)}
                        onPress={async () => {
                          let response = await putOrder({
                            yaper_id,
                            [key]: val[key],
                            variant_id,
                            context: "order_details",
                          });

                          if (response?.order_number == val[key]) {
                            if (response?.show_success_screen)
                              setComponent([
                                OrderPlaced,
                                {
                                  setOrderComponent,
                                  orderNumber: response?.order_number,
                                  walletAmount: response?.wallet_amount,
                                },
                              ]);
                            else {
                              setOrder((await getOrder({ yaper_id }))?.data);
                              setVal({});
                            }
                          }
                        }}
                        disabled={
                          val[key] == undefined || !val[key].match(regex)
                        }
                        title={button.label}
                      />
                    )}
                    {secondary_button && (
                      <Pressable
                        onPress={async () => {
                          await putData("PARAMS", {
                            deal_id,
                            deal_name,
                          });
                          router.navigate({
                            pathname: pan_verified ? "/ecommerce-view" : "/kyc",
                          });
                        }}
                      >
                        <Text
                          style={{
                            ...scaleFont(14),
                            fontWeight: "500",
                            color: "#025ACE",
                            width: "100%",
                            textAlign: "center",
                            textAlignVertical: "center",
                            paddingTop: scaleHeight(16),
                          }}
                        >
                          Not yet ordered, Order Now
                        </Text>
                      </Pressable>
                    )}
                  </>
                )}
                {userNote && (
                  <>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        ...scalePadding(4),
                        paddingTop: scaleHeight(16),
                      }}
                    >
                      <Text
                        style={{
                          ...scaleFont(12),
                          fontWeight: "500",
                          color: "#101828",
                          paddingRight: scaleHeight(8),
                        }}
                      >
                        {userNote?.label}
                      </Text>
                      <Image
                        source={require("../../assets/icons/Info.svg")}
                        style={{
                          height: scaleHeight(20),
                          width: scaleWidth(20),
                        }}
                      />
                    </View>
                    {userNote.value && val[userNote.key] === undefined ? (
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          ...scalePadding(4),
                        }}
                      >
                        <Text
                          style={{
                            ...scaleFont(14),
                            fontWeight: "500",
                            color: "#101828",
                            paddingRight: scaleWidth(8),
                          }}
                        >
                          {userNote.value}
                        </Text>
                        {userNote.editable && (
                          <Pressable
                            onPress={() =>
                              setVal({
                                [userNote.key]: userNote.value,
                              })
                            }
                          >
                            <Image
                              source={require("../../assets/PencilSimple.svg")}
                              style={{
                                height: scaleHeight(16),
                                width: scaleWidth(16),
                              }}
                            />
                          </Pressable>
                        )}
                      </View>
                    ) : (
                      <>
                        <Input
                          inputArray={[val[userNote.key]]}
                          width={280}
                          onChange={(val) => {
                            setVal({ [userNote.key]: val });
                          }}
                          placeholder={userNote?.placeholder}
                          style={{
                            Input: {
                              ...scalePadding(8),
                              marginBottom: scaleHeight(16),
                            },
                          }}
                        />
                        <FullButton
                          width={scaleWidth(280)}
                          onPress={async () => {
                            await putOrder({
                              yaper_id,
                              [userNote.key]: val[userNote.key],
                              variant_id,
                              context: "order_details",
                            });

                            setOrder((await getOrder({ yaper_id }))?.data);
                            setVal({});
                          }}
                          disabled={
                            val[userNote.key] == undefined ||
                            !val[userNote.key].match(userNote.regex)
                          }
                          title={button.label}
                        />
                      </>
                    )}
                  </>
                )}
              </>
            ),
            shipped: (
              <>
                {drop_down_data && (
                  <Pressable
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      ...scalePadding(4),
                      paddingBottom: scaleHeight(16),
                    }}
                    onPress={() =>
                      setModal([
                        () => (
                          <Pressable
                            style={{
                              display: "flex",
                              width: "100%",
                              position: "absolute",
                              height: "100%",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            onPress={() => setModal([])}
                          >
                            <View
                              style={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                backgroundColor: "#101828",
                                opacity: 0.6,
                              }}
                            />
                            <View
                              style={{
                                display: "flex",
                                backgroundColor: WHITE,
                                justifyContent: "center",
                                alignItems: "center",
                                ...scalePadding(24),
                                borderRadius: 20,
                                width: "80%",
                              }}
                            >
                              <Text
                                style={{
                                  ...scaleFont(14),
                                  fontWeight: "500",
                                  color: "#000000",
                                  paddingBottom: scaleHeight(36),
                                }}
                              >
                                Select Courier Service
                              </Text>
                              {drop_down_data.map(
                                ({ label, regex, value }, ind) => (
                                  <Pressable
                                    key={label + value}
                                    style={{
                                      ...{
                                        // backgroundColor: "red",
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                      },
                                      ...(ind == 0
                                        ? {}
                                        : {
                                            paddingTop: scaleHeight(24),
                                          }),
                                    }}
                                  >
                                    <Text
                                      style={{
                                        ...scaleFont(12),
                                        fontWeight: "400",
                                      }}
                                    >
                                      {label}
                                    </Text>
                                    <PrimaryRadio
                                      onPress={() =>
                                        setTrackingPlatform({ regex, value })
                                      }
                                      selected={
                                        trackingPlatform &&
                                        trackingPlatform.value == value
                                      }
                                    />
                                  </Pressable>
                                )
                              )}
                              <Pressable onPress={() => setModal([])}>
                                <Text
                                  style={{
                                    color: "#025ACE",
                                    ...scaleFont(14),
                                    fontWeight: "500",
                                    paddingTop: scaleHeight(24),
                                  }}
                                >
                                  Submit
                                </Text>
                              </Pressable>
                            </View>
                          </Pressable>
                        ),
                      ])
                    }
                  >
                    <>
                      <Text
                        style={{
                          ...{
                            ...scaleFont(12),
                            fontWeight: "500",
                            color: "#101828",
                            paddingRight: scaleHeight(8),
                          },
                          ...(trackingPlatform?.value
                            ? { textDecorationLine: "underline" }
                            : {}),
                        }}
                      >
                        {trackingPlatform?.value || "Select Tracking  ID"}
                      </Text>
                      <Image
                        source={require("../../assets/CaretDown.svg")}
                        style={{
                          height: scaleHeight(20),
                          width: scaleWidth(20),
                        }}
                      />
                    </>
                  </Pressable>
                )}
                {(trackingPlatform?.value || value) && (
                  <>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        ...scalePadding(4),
                        paddingBottom: scaleHeight(
                          value && val[key] === undefined ? 4 : 12
                        ),
                      }}
                    >
                      <Text
                        style={{
                          ...scaleFont(12),
                          fontWeight: "500",
                          color: "#101828",
                          paddingRight: scaleHeight(8),
                        }}
                      >
                        {label}
                      </Text>
                      <Image
                        source={require("../../assets/Info.svg")}
                        style={{
                          height: scaleHeight(20),
                          width: scaleWidth(20),
                        }}
                      />
                    </View>
                    {value && val[key] === undefined ? (
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          ...scalePadding(4),
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: "500",
                            color: "#101828",
                            paddingRight: scaleWidth(8),
                          }}
                        >
                          {value}
                        </Text>
                        {editable && (
                          <Pressable onPress={() => setVal({ [key]: value })}>
                            <Image
                              source={require("../../assets/PencilSimple.svg")}
                              style={{
                                height: scaleHeight(16),
                                width: scaleWidth(16),
                              }}
                            />
                          </Pressable>
                        )}
                      </View>
                    ) : (
                      <>
                        <Input
                          inputArray={[val[key]]}
                          width={280}
                          onChange={(val) => {
                            setVal({ [key]: val });
                          }}
                          placeholder={placeholder}
                          style={{
                            Input: {
                              ...scalePadding(8),
                              marginBottom: scaleHeight(16),
                            },
                          }}
                        />
                        <FullButton
                          width={scaleWidth(280)}
                          onPress={async () => {
                            let response = await putOrder({
                              yaper_id,
                              [key]: val[key],
                              variant_id,
                              context: "order_details",
                            });
                            setOrder((await getOrder({ yaper_id }))?.data);
                            setVal({});
                          }}
                          disabled={
                            val[key] == undefined ||
                            !val[key].match(trackingPlatform?.regex)
                          }
                          title={button.label}
                        />
                      </>
                    )}

                    {deliverySupport && (
                      <>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            ...scalePadding(4),
                            paddingTop: scaleHeight(20),
                          }}
                        >
                          <Text
                            style={{
                              ...scaleFont(12),
                              fontWeight: "500",
                              color: "#101828",
                              paddingRight: scaleHeight(8),
                              paddingBottom: scaleHeight(
                                deliverySupport.value &&
                                  val[deliverySupport.key] === undefined
                                  ? 4
                                  : 12
                              ),
                            }}
                          >
                            {deliverySupport.label}
                          </Text>
                          <Image
                            source={require("../../assets/Info.svg")}
                            style={{
                              height: scaleHeight(20),
                              width: scaleWidth(20),
                            }}
                          />
                        </View>
                        {deliverySupport.value &&
                        val[deliverySupport.key] === undefined ? (
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              ...scalePadding(4),
                            }}
                          >
                            <Text
                              style={{
                                ...scaleFont(14),
                                fontWeight: "500",
                                color: "#101828",
                                paddingRight: scaleWidth(8),
                              }}
                            >
                              {deliverySupport.value}
                            </Text>
                            {deliverySupport.editable && (
                              <Pressable
                                onPress={() =>
                                  setVal({
                                    [deliverySupport.key]:
                                      deliverySupport.value,
                                  })
                                }
                              >
                                <Image
                                  source={require("../../assets/PencilSimple.svg")}
                                  style={{
                                    height: scaleHeight(16),
                                    width: scaleWidth(16),
                                  }}
                                />
                              </Pressable>
                            )}
                          </View>
                        ) : (
                          <>
                            <Input
                              inputArray={[val[deliverySupport.key]]}
                              width={280}
                              onChange={(val) => {
                                setVal({ [deliverySupport.key]: val });
                              }}
                              placeholder={deliverySupport.placeholder}
                              style={{
                                Input: {
                                  ...scalePadding(8),
                                  marginBottom: scaleHeight(16),
                                },
                              }}
                            />
                            <FullButton
                              width={scaleWidth(280)}
                              onPress={async () => {
                                let response = await putOrder({
                                  yaper_id,
                                  [deliverySupport.key]:
                                    val[deliverySupport.key],
                                  variant_id,
                                  context: "order_details",
                                });
                                setOrder((await getOrder({ yaper_id }))?.data);
                                setVal({});
                              }}
                              disabled={
                                val[deliverySupport.key] == undefined ||
                                !val[deliverySupport.key].match(
                                  deliverySupport.regex
                                )
                              }
                              title={button.label}
                            />
                          </>
                        )}
                      </>
                    )}

                    {addDeliverySupport && (
                      <>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            ...scalePadding(4),
                          }}
                        >
                          <Text
                            style={{
                              ...scaleFont(12),
                              fontWeight: "500",
                              color: "#101828",
                              paddingRight: scaleHeight(8),
                            }}
                          >
                            {addDeliverySupport?.label}
                          </Text>
                          <Image
                            source={require("../../assets/icons/Info.svg")}
                            style={{
                              height: scaleHeight(20),
                              width: scaleWidth(20),
                            }}
                          />
                        </View>
                        {addDeliverySupport.value &&
                        val[addDeliverySupport.key] === undefined ? (
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              ...scalePadding(4),
                            }}
                          >
                            <Text
                              style={{
                                ...scaleFont(14),
                                fontWeight: "500",
                                color: "#101828",
                                paddingRight: scaleWidth(8),
                              }}
                            >
                              {addDeliverySupport.value}
                            </Text>
                            {addDeliverySupport.editable && (
                              <Pressable
                                onPress={() =>
                                  setVal({
                                    [addDeliverySupport.key]:
                                      addDeliverySupport.value,
                                  })
                                }
                              >
                                <Image
                                  source={require("../../assets/PencilSimple.svg")}
                                  style={{
                                    height: scaleHeight(16),
                                    width: scaleWidth(16),
                                  }}
                                />
                              </Pressable>
                            )}
                          </View>
                        ) : (
                          <>
                            <Input
                              inputArray={[val[addDeliverySupport.key]]}
                              width={280}
                              onChange={(val) => {
                                if (val.match(addDeliverySupport.regex)) {
                                  setVal({ [addDeliverySupport.key]: val });
                                }
                              }}
                              placeholder={addDeliverySupport?.placeholder}
                              style={{
                                Input: {
                                  ...scalePadding(8),
                                  marginBottom: scaleHeight(16),
                                },
                              }}
                            />
                            <FullButton
                              width={scaleWidth(280)}
                              onPress={async () => {
                                let response = await putOrder({
                                  yaper_id,
                                  [addDeliverySupport.key]:
                                    val[addDeliverySupport.key],
                                  variant_id,
                                  context: "order_details",
                                });
                                setOrder((await getOrder({ yaper_id }))?.data);
                                setVal({});
                              }}
                              title={button.label}
                            />
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            ),
            delivered: (
              <>
                {button && button.button_type == "order_delivered" && (
                  <View style={{ paddingTop: scaleHeight(12) }}>
                    <FullButton
                      width={scaleWidth(280)}
                      onPress={async () => {
                        let response = await customRequest({
                          payload: {
                            variant_id,
                            context: "order_details",
                          },
                          url: button.request.href,
                          method: button.request.type,
                        });
                        setOrder((await getOrder({ yaper_id }))?.data);
                        setVal({});
                      }}
                      title={button.label}
                    />
                  </View>
                )}
                {uploadInvoice &&
                  (!uploadInvoice.complex_value &&
                  button &&
                  button.button_type == "save" ? (
                    <UploadFile
                      label={"Upload Invoice to confirm delivery"}
                      tag={uploadInvoice.key}
                      max_file_size={uploadInvoice.max_file_size}
                      max_file_size_error={uploadInvoice.max_file_size_error}
                      val={val}
                      setVal={setVal}
                      setOrder={setOrder}
                      buttonLabel={button.label}
                    />
                  ) : (
                    <ShowFile
                      complex_value={uploadInvoice.complex_value}
                      setModal={setModal}
                    />
                  ))}

                {warrenty &&
                  (!warrenty.complex_value &&
                  button &&
                  button.button_type == "save" ? (
                    <UploadFile
                      label={"Upload Warranty Card"}
                      tag={warrenty.key}
                      max_file_size={warrenty.max_file_size}
                      max_file_size_error={warrenty.max_file_size_error}
                      val={val}
                      setVal={setVal}
                      setOrder={setOrder}
                      buttonLabel={button.label}
                    />
                  ) : (
                    <ShowFile
                      complex_value={warrenty.complex_value}
                      setModal={setModal}
                    />
                  ))}
              </>
            ),
          }[state]}
      </View>
    </View>
  );
};

function FileInfo({ val, styles }) {
  if (val)
    return (
      <View>
        {val.type && (
          <Text
            style={{
              ...scaleFont(12),
              color: "#F04438",
              fontWeight: "500",
              paddingTop: scaleHeight(4),
              paddingBottom: scaleHeight(8),
              ...styles,
            }}
          >
            {val.type}
          </Text>
        )}
        {val.size && (
          <Text
            style={{
              ...scaleFont(12),
              color: "#F04438",
              fontWeight: "500",
              paddingTop: scaleHeight(4),
              paddingBottom: scaleHeight(8),
              ...styles,
            }}
          >
            {val.size}
          </Text>
        )}
      </View>
    );
}

function UploadedFileModal({ value, setModal }) {
  return (
    <Pressable
      style={{
        display: "flex",
        width: "100%",
        position: "absolute",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => setModal([])}
    >
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.7,
          backgroundColor: "#101828",
        }}
      />
      <View
        style={{
          display: "flex",
          backgroundColor: WHITE,
          justifyContent: "center",
          alignItems: "center",
          ...scalePadding(8),
        }}
      >
        <Image
          source={{ uri: value }}
          style={{
            height: scaleHeight(600),
            width: scaleWidth(300),
          }}
          alt="invoice image"
        />
      </View>
    </Pressable>
  );
}

function ShowFile({ complex_value: { header_title, value, text }, setModal }) {
  return (
    <View style={{ ...scalePadding(4) }}>
      <Text
        style={{
          ...scaleFont(12),
          color: "#101828",
          fontWeight: "500",
          paddingTop: scaleHeight(8),
        }}
      >
        {header_title}
      </Text>
      <Pressable
        onPress={() =>
          setModal([
            () => <UploadedFileModal value={value} setModal={setModal} />,
          ])
        }
      >
        <Text
          style={{
            ...scaleFont(14),
            color: "#025ACE",
            fontWeight: "500",
            paddingBottom: scaleHeight(4),
          }}
        >
          {text}
        </Text>
      </Pressable>
    </View>
  );
}

function UploadFile({
  label,
  tag: key,
  max_file_size,
  max_file_size_error,
  val,
  setVal,
  setOrder,
  buttonLabel,
}) {
  return (
    <View style={{ paddingLeft: scaleHeight(4) }}>
      <Text
        style={{
          ...scaleFont(12),
          color: "#667085",
          fontWeight: "400",
          paddingTop: scaleHeight(4),
          paddingBottom: scaleHeight(12),
        }}
      >
        {label}
      </Text>
      <Pressable
        style={{
          height: scaleHeight(100),
          borderColor: "#667085",
          borderWidth: scaleWidth(2),
          borderStyle: "dashed",
          borderRadius: scaleBorder(4),
          ...scalePadding(20),
          marginBottom: scaleHeight(16),
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F9FAFB",
        }}
        onPress={async () => {
          let { assets, canceled } = await getDocumentAsync({});
          if (!canceled) {
            if (assets[0].size / 1024 > max_file_size) {
              setVal({
                error: {
                  // type: uploadInvoice.file_type_error,
                  size: max_file_size_error,
                },
              });
            } else {
              setVal({
                [key]: {
                  uri: assets[0].uri,
                  type: assets[0].mimeType,
                  name: assets[0].name,
                },
              });
            }
          }
        }}
      >
        {val.invoice ? (
          <>
            <ImageBackground
              source={{ uri: val.invoice.uri }}
              style={{
                height: scaleHeight(60),
                width: scaleWidth(40),
                position: "relative",
              }}
            >
              <Image
                source={require("../../assets/icons/cross.svg")}
                style={{
                  height: scaleHeight(20),
                  width: scaleWidth(18),
                  position: "absolute",
                  backgroundColor: "#FFF",
                  right: -10,
                  top: -9,
                }}
              />
            </ImageBackground>
          </>
        ) : (
          <View
            style={{
              height: scaleHeight(32),
              width: scaleWidth(32),
              borderColor: "#667085",
              borderWidth: scaleWidth(2),
              borderRadius: scaleBorder(100),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/icons/upload.svg")}
              style={{
                height: scaleHeight(16),
                width: scaleWidth(16),
              }}
            />
          </View>
        )}
      </Pressable>
      <FileInfo
        val={val.info}
        styles={{
          color: "#101828",
        }}
      />
      <FileInfo val={val.error} />

      <FullButton
        width={scaleWidth(280)}
        onPress={async () => {
          let response = await putOrder({
            yaper_id,
            [key]: val[key],
            variant_id,
            context: "order_details",
          });

          setOrder((await getOrder({ yaper_id }))?.data);
          setVal({});
        }}
        title={buttonLabel}
        disabled={val[key] == undefined}
      />
    </View>
  );
}
