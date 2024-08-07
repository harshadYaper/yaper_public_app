import { useLocalSearchParams } from "expo-router";
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
  scaleHeight,
  scaleMargin,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { capitalize, snakeToTitleize } from "../utils/helper";
import Input from "../common/input";
import { FullButton } from "../common/button";
import { WHITE } from "../constants/colors";
import { getDocumentAsync } from "expo-document-picker";

export default function Order() {
  const { id, order_number, variant_id } = useLocalSearchParams();
  const [order, setOrder] = useState({});
  const [expanded, setExpanded] = useState();
  const [modal, setModal] = useState([]);
  const [Modal] = modal;
  // need to check deal?.data?.fullfilled for if fullfiled exit

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
    color_code,
    color,
    type,
    order_states,
    order_meta,
    fields,
    button,
    secondary_button,
    third_button,
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
}) => {
  return (
    <View>
      <Text
        style={{
          color: "#667085",
          ...scalePadding(8),
          fontWeight: "500",
        }}
      >
        Deal Status
      </Text>
      {order_states.map(({ green, label, state_at }, ind) => (
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
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
                <Image
                  source={require("../../assets/icons/LockSimple.svg")}
                  style={{
                    height: scaleHeight(14),
                    width: scaleWidth(14),
                    tintColor: "#D0D5DD",
                  }}
                />
              </ImageBackground>
            )}
            <Text style={{ fontWeight: "500", color: "#101828" }}>
              {capitalize(snakeToTitleize(label))}
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
                  height: "80%",
                  ...scaleMargin(12),
                }}
              />
              <View>
                <Text
                  style={{
                    fontSize: 10,
                    fontStyle: "normal",
                    fontWeight: "400",
                    color: "#667085",
                    paddingBottom: scaleHeight(8),
                  }}
                >
                  {state_at}
                </Text>
                <OrderComponent
                  state={label}
                  yaper_id={yaper_id}
                  variant_id={variant_id}
                  setOrder={setOrder}
                  fields={fields}
                  order_meta={order_meta}
                  setModal={setModal}
                  button={button}
                />
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
  fields,
  order_meta,
  setModal,
  button,
}) => {
  const [val, setVal] = useState({});

  const orderNumber =
    fields.find((f) => f.key == "order_number") ||
    order_meta.find((o) => o.key == "order_number");
  const trackingNumber =
    fields.find((f) => f.key == "tracking_number") ||
    order_meta.find((o) => o.key == "tracking_number");

  const deliverySupport =
    fields.find((f) => f.key == "delivery_support") ||
    order_meta.find((o) => o.key == "delivery_support");

  const addDeliverySupport =
    fields.find((f) => f.key == "add_delivery_support") ||
    order_meta.find((o) => o.key == "add_delivery_support");

  const uploadInvoice =
    fields.find((f) => f.key == "invoice") ||
    order_meta.find((o) => o.key == "invoice");

  const [expand, setExpand] = useState(!orderNumber.value);

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
        backgroundColor: "#FFFFFF",
        ...scalePadding(16),
        borderColor: "#D0D5DD",
        borderRadius: 8,
        borderWidth: 1,
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          minWidth: scaleWidth(280),
        }}
        onPress={() => {
          setExpand((e) => !e);

          uploadInvoice &&
            setVal({
              info: {
                file_type: uploadInvoice.file_type,
                info_text: uploadInvoice.info_text,
              },
            });
        }}
      >
        <Text
          style={{
            fontSize: 10,
            color: "#667085",
            ...scalePadding(4),
          }}
        >
          {
            {
              accepted: "Order Acceptance Information",
              ordered: `Enter your ${label.replace(
                "#",
                "number"
              )} from your order details`,
              shipped: "Your Shipping Order details",
              delivered: "Your Delivery Details",
            }[state]
          }
        </Text>
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
                    fontSize: 12,
                    fontWeight: "500",
                    color: "#101828",
                    paddingRight: scaleHeight(8),
                  }}
                >
                  {label}
                </Text>
                <Image
                  source={require("../../assets/icons/Info.svg")}
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
                      if (val.match(regex)) {
                        setVal({ [key]: val });
                      }
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
                          setOrder((await getOrder({ yaper_id }))?.data);
                          setVal({});
                        }
                      }}
                      title={button.label}
                    />
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
                    paddingBottom: scaleHeight(8),
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
                              display: "flex",
                              backgroundColor: WHITE,
                              justifyContent: "center",
                              alignItems: "center",
                              ...scalePadding(8),
                            }}
                          >
                            <Text style={{ fontSize: 16, fontWeight: "400" }}>
                              Select Courier Service
                            </Text>
                            {drop_down_data.map(({ label, regex, value }) => (
                              <Pressable
                                key={label + value}
                                onPress={() => {
                                  setTrackingPlatform(value);
                                  setModal([]);
                                }}
                                style={{
                                  paddingBottom: scaleHeight(4),
                                  paddingTop: scaleHeight(4),
                                }}
                              >
                                <Text
                                  style={{ fontSize: 16, fontWeight: "500" }}
                                >
                                  {label}
                                </Text>
                              </Pressable>
                            ))}
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
                          fontSize: 12,
                          fontWeight: "500",
                          color: "#101828",
                          paddingRight: scaleHeight(8),
                        },
                        ...(trackingPlatform
                          ? { textDecorationLine: "underline" }
                          : {}),
                      }}
                    >
                      {trackingPlatform || "Select Tracking  ID"}
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
              {(trackingPlatform || value) && (
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
                        fontSize: 12,
                        fontWeight: "500",
                        color: "#101828",
                        paddingRight: scaleHeight(8),
                      }}
                    >
                      {label}
                    </Text>
                    <Image
                      source={require("../../assets/icons/Info.svg")}
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
                          if (val.match(regex)) {
                            setVal({ [key]: val });
                          }
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
                          alignItems: "center",
                          ...scalePadding(4),
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: "500",
                            color: "#101828",
                            paddingRight: scaleHeight(8),
                          }}
                        >
                          {deliverySupport?.label}
                        </Text>
                        <Image
                          source={require("../../assets/icons/Info.svg")}
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
                                  [deliverySupport.key]: deliverySupport.value,
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
                              if (val.match(deliverySupport.regex)) {
                                setVal({ [deliverySupport.key]: val });
                              }
                            }}
                            placeholder={deliverySupport?.placeholder}
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
                                [deliverySupport.key]: val[deliverySupport.key],
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
                            fontSize: 12,
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
              )}
              {console.log(button)}
              {uploadInvoice &&
                (button && button.button_type == "save" ? (
                  <View>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#101828",
                        fontWeight: "500",
                        paddingTop: scaleHeight(4),
                        paddingBottom: scaleHeight(8),
                      }}
                    >
                      Upload Invoice to confirm delivery
                    </Text>
                    <Pressable
                      style={{
                        height: scaleHeight(100),
                        width: scaleWidth(280),
                        borderColor: "#667085",
                        borderWidth: 1,
                        borderStyle: "dashed",
                        borderRadius: 4,
                        ...scalePadding(20),
                        marginBottom: scaleHeight(16),
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onPress={async () => {
                        let { assets, canceled } = await getDocumentAsync({});
                        if (!canceled) {
                          if (
                            assets[0].size / 1024 >
                            uploadInvoice.max_file_size
                          ) {
                            setVal({
                              error: {
                                // file_type_error: uploadInvoice.file_type_error,
                                max_file_size_error:
                                  uploadInvoice.max_file_size_error,
                              },
                            });
                          } else {
                            setVal({
                              [uploadInvoice.key]: {
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
                        <Image
                          source={{ uri: val.invoice.uri }}
                          style={{
                            height: scaleHeight(80),
                            width: scaleWidth(40),
                          }}
                        />
                      ) : (
                        <View
                          style={{
                            height: scaleHeight(32),
                            width: scaleWidth(32),
                            borderColor: "#667085",
                            borderWidth: 2,
                            borderRadius: 100,
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

                    {val.info && (
                      <View>
                        <Text
                          style={{
                            fontSize: 12,
                            color: "#101828",
                            fontWeight: "500",
                            paddingTop: scaleHeight(4),
                            paddingBottom: scaleHeight(8),
                          }}
                        >
                          Only allowed {val.info.file_type.join()}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: "#101828",
                            fontWeight: "500",
                            paddingTop: scaleHeight(4),
                            paddingBottom: scaleHeight(8),
                          }}
                        >
                          {" "}
                          {val.info.info_text}
                        </Text>
                      </View>
                    )}

                    {val.error && (
                      <View>
                        <Text
                          style={{
                            fontSize: 12,
                            color: "#F04438",
                            fontWeight: "500",
                            paddingTop: scaleHeight(4),
                            paddingBottom: scaleHeight(8),
                          }}
                        >
                          {val.error.file_type_error}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: "#F04438",
                            fontWeight: "500",
                            paddingTop: scaleHeight(4),
                            paddingBottom: scaleHeight(8),
                          }}
                        >
                          {" "}
                          {val.error.max_file_size_error}
                        </Text>
                      </View>
                    )}

                    <FullButton
                      width={scaleWidth(280)}
                      onPress={async () => {
                        let response = await putOrder({
                          yaper_id,
                          [uploadInvoice.key]: val[uploadInvoice.key],
                          variant_id,
                          context: "order_details",
                        });

                        setOrder((await getOrder({ yaper_id }))?.data);
                        setVal({});
                      }}
                      title={button.label}
                    />
                  </View>
                ) : (
                  <View style={{ ...scalePadding(4) }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#101828",
                        fontWeight: "500",
                        paddingTop: scaleHeight(4),
                        paddingBottom: scaleHeight(4),
                      }}
                    >
                      {uploadInvoice.complex_value.header_title}
                    </Text>
                    <Pressable
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
                                  display: "flex",
                                  backgroundColor: WHITE,
                                  justifyContent: "center",
                                  alignItems: "center",
                                  ...scalePadding(8),
                                }}
                              >
                                <Image
                                  source={{
                                    uri: uploadInvoice.complex_value.value,
                                  }}
                                  style={{
                                    height: scaleHeight(600),
                                    width: scaleWidth(300),
                                  }}
                                />
                              </View>
                            </Pressable>
                          ),
                        ])
                      }
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#025ACE",
                          fontWeight: "500",
                          paddingTop: scaleHeight(4),
                          paddingBottom: scaleHeight(4),
                        }}
                      >
                        {uploadInvoice.complex_value.text}
                      </Text>
                    </Pressable>
                  </View>
                ))}
            </>
          ),
        }[state]}
    </View>
  );
};
