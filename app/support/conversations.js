import { useLocalSearchParams } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";
import Input from "../common/input";
import { useEffect, useRef, useState } from "react";
import {
  scaleBorder,
  scaleFont,
  scaleHeight,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { Image, ImageBackground } from "expo-image";
import { getDocumentAsync } from "expo-document-picker";
import {
  createConversation,
  createTicket,
  getConversations,
  getDeals,
  getOrders,
} from "../api";
import { isEmpty, sleep } from "../utils/helper";
import Loading from "../home/loading";
import Orders from "../home/orders";
import Deals from "../home/deals";
import { isIOS } from "../utils/environment";

export default function Conversations() {
  const {
    title = "",
    ticket_id,
    object_id,
    object_type,
  } = useLocalSearchParams();
  const [data, setData] = useState([]);
  const [ticket, setTicket] = useState(ticket_id);
  const [message, setMessage] = useState();
  const [fetching, setFetching] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [endOfData, setEndOfData] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [modal, setModal] = useState();
  const [object, setObject] = useState(
    object_id && object_type && { object_id, object_type }
  );
  const conversationInterval = useRef(null);
  
  const fetchConversations = async ({ resetData = false }) => {
    console.log(resetData);
    if (ticket && !endOfData) {
      setFetching(true);
      let apiData = (
        await getConversations({
          ticket_id: ticket,
          page_number: pageNumber,
        })
      )?.data;

      let empty = isEmpty(apiData);
      pageNumber !== 1 && setEndOfData(empty);
      !empty && setData((p) => (resetData ? [...apiData] : [...p, ...apiData]));
      setFetching(false);
    }
  };

  useEffect(() => {
    (async () => await fetchConversations({ resetData: true }))();
    conversationInterval.current = setInterval(async () => {
      pageNumber == 1 && (await fetchConversations({ resetData: true }));
    }, 5000);
    return () => {
      clearInterval(conversationInterval.current);
    };
  }, [ticket]);

  const handleSendMessage = async ({ ticket_id }) => {
    clearInterval();
    let chatResponse = await createConversation({
      ticket_id: ticket_id || ticket,
      documents,
      message,
    });
    sleep(1000);

    if (chatResponse?.response_message == "success") {
      await fetchConversations({ resetData: true });
      setMessage();
    }
  };

  useEffect(() => {
    !object &&
      (async () => {
        let { data: apiData } = await getObj({ title, setObject });
        setData(apiData);
      })();
  }, []);

  useEffect(() => {
    if (object && object.object_id && object.object_type) {
      setData([]);
      setPageNumber(1);
      setEndOfData(false);
    }
  }, [object]);

  useEffect(() => {
    if (!(object?.object_id || object?.object_type == "General")) {
      pageNumber !== 1 &&
        (async () => {
          setFetching(true);
          let { data: apiData } = await getObj({ title, setObject });
          setEndOfData(isEmpty(apiData));
          !isEmpty(apiData) && setData((p) => [...p, ...apiData]);
          setFetching(false);
        })();
    } else {
      (async () => await fetchConversations({}))();
      pageNumber !== 1 && clearInterval();
    }
  }, [pageNumber]);

  return (
    <>
      {object?.object_id || object?.object_type == "General" ? (
        <>
          <View
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              justifyContent: "flex-end",
            }}
          >
            {object && object.object_type && !isEmpty(data) && (
              <FlatList
                data={data}
                inverted
                onEndReached={() => !endOfData && setPageNumber((p) => p + 1)}
                renderItem={({
                  item: { message, created_at, documents, id, user_type },
                  index,
                }) => (
                  <View
                    style={{
                      display: "flex",
                      width: "100%",
                      alignItems:
                        user_type == "user" ? "flex-end" : "flex-start",
                      ...scalePadding(8),
                      paddingBottom: scaleHeight(20),
                    }}
                  >
                    <Loading
                      reachedEnd={data.length - 1 == index}
                      fetching={fetching && !endOfData}
                    />
                    <View
                      style={{
                        display: "flex",
                        maxWidth: "80%",
                        backgroundColor: "#FFF",
                        ...scalePadding(8),
                        borderRadius: scaleBorder(8),
                        borderWidth: scaleWidth(2),
                      }}
                    >
                      <Text style={{ ...scaleFont(16) }}>{message}</Text>
                      <View style={{ display: "flex" }}>
                        {documents?.map((url, index) => (
                          <View style={{ ...scalePadding(8) }}>
                            <Pressable
                              key={"CHAT DOCUMENT" + message + index}
                              onPress={() => setModal(url)}
                              style={{
                                paddingLeft: scaleWidth(index == 0 ? 0 : 8),
                                width: "100%",
                                borderWidth: scaleBorder(1),
                                borderRadius: 8,
                              }}
                            >
                              <Image
                                source={{ uri: url }}
                                style={{
                                  height: scaleHeight(100),
                                  width: scaleWidth(100),
                                }}
                              />
                            </Pressable>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>
                )}
                keyExtractor={({ id }) =>
                  `TICKET: ${ticket} CONVERSATION: ${id}`
                }
              />
            )}
            <View
              style={{
                width: "100%",
                ...scalePadding(8),
                paddingBottom: scaleHeight(isIOS ? 32 : 8),
              }}
            >
              <Input
                inputArray={[message]}
                placeholder={"write a message"}
                onChange={(val) => setMessage(val)}
                style={{
                  Input: {
                    ...{ width: "100%" },
                    ...(message && { paddingBottom: scaleHeight(40) }),
                  },
                }}
                multiline={true}
                rightComponent={
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      position: "absolute",
                      right: 0,
                      flex: 1,
                      height: "100%",
                      alignItems: "flex-end",
                    }}
                  >
                    <Pressable
                      style={{ ...scalePadding(4) }}
                      onPress={async () => {
                        let { assets, canceled } = await getDocumentAsync({
                          multiple: true,
                        });

                        if (!canceled) {
                          setDocuments([
                            ...assets.map(({ uri, mimeType, name }) => ({
                              uri,
                              type: mimeType,
                              name,
                            })),
                          ]);
                        }
                      }}
                    >
                      <Image
                        source={require("../../assets/icons/upload.svg")}
                        style={{
                          height: scaleHeight(30),
                          width: scaleWidth(30),
                        }}
                      />
                    </Pressable>
                    <Pressable
                      style={{ ...scalePadding(4) }}
                      disabled={!message}
                      onPress={async () => {
                        if (!ticket) {
                          let response = await createTicket({
                            title,
                            object_id: object.object_id,
                            object_type: object.object_type,
                          });

                          if (response.response_message == "success") {
                            setTicket(response.ticket_id);
                            setEndOfData(false);
                            sleep(100);

                            await handleSendMessage({
                              ticket_id: response.ticket_id,
                            });
                          }
                        } else await handleSendMessage({});
                      }}
                    >
                      <Image
                        source={require("../../assets/CaretCircleRight.svg")}
                        style={{
                          ...{ height: scaleHeight(30), width: scaleWidth(30) },
                          ...(message && !fetching && { tintColor: "#025ACE" }),
                        }}
                      />
                    </Pressable>
                  </View>
                }
              />
            </View>
          </View>
          {modal && (
            <View
              style={{ position: "absolute", width: "100%", height: "100%" }}
            >
              <Pressable
                style={{
                  ...scalePadding(20),
                  backgroundColor: "#101828",
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
                onPress={() => setModal()}
              >
                <ImageBackground
                  source={{ uri: modal }}
                  style={{ width: "100%", height: "70%" }}
                >
                  <Pressable
                    onPress={() => setModal()}
                    style={{
                      position: "absolute",
                      top: -10,
                      right: -10,
                    }}
                  >
                    <Image
                      source={require("../../assets/cross.svg")}
                      style={{
                        height: scaleHeight(22),
                        width: scaleWidth(20),
                      }}
                    />
                  </Pressable>
                </ImageBackground>
              </Pressable>
            </View>
          )}
        </>
      ) : (
        <View
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            ...scalePadding(8),
          }}
        >
          {
            {
              Order: (
                <Orders
                  data={data}
                  openFilters={false}
                  setPageNumber={setPageNumber}
                  fetchData={() => {
                    getObj({ title });
                  }}
                  onPress={(order_number) => {
                    setObject((p) => ({ ...p, object_id: order_number }));
                  }}
                  fetching={fetching}
                  endOfData={endOfData}
                  styles={{ marginBottom: 0 }}
                />
              ),
              Deal: (
                <Deals
                  data={data}
                  openFilters={false}
                  setPageNumber={setPageNumber}
                  fetchData={() => {
                    getObj({ title });
                  }}
                  onPress={(deal_id) => {
                    setObject((p) => ({ ...p, object_id: deal_id }));
                  }}
                  fetching={fetching}
                  endOfData={endOfData}
                  styles={{ marginBottom: 0 }}
                />
              ),
            }[object?.object_type]
          }
          <Text
            style={{
              ...scaleFont(16),
              fontWeight: "500",
              color: "",
              ...scalePadding(8),
            }}
          >
            Please select an {object?.object_type || "Order"}
          </Text>
        </View>
      )}
    </>
  );
}

const getObj = async ({ title, pageNumber, setObject }) => {
  const dealTitles = [
    "Can't accept a deal",
    "Automation not working while ordering",
    "Price mismatch on Yaper and ecommerce website",
    "Buyer's phone number not available",
  ];

  const generalTitles = [
    "Got a call from us for some details? Fill here",
    "PAN verification issues",
    "App crashed",
    "Login OTP not received",
    "Card not available to select",
    "Enable/Disable user notes",
    "Leaderboard orders are not correct",
    "User account deletion",
    "Can I use a different card than the one shown",
    "Why is PAN required",
    "How to use Yaper?",
    "How can I earn without credit cards?",
    "How can I trust Yaper",
    "Why is TDS deducted?",
    "Can I use a different card than the one shown?",
    "Why is PAN required?",
    "How to use Yaper?",
    "How can I earn without credit cards?",
    "How can I trust Yaper?",
    "Why is TDS deducted?",
    "Non-order related issue",
  ];

  if (dealTitles.map((t) => t.includes(title)).some((t) => t)) {
    setObject && setObject((p) => ({ ...p, object_type: "Deal" }));
    return { data: (await getDeals({ page_number: pageNumber }))?.data };
  } else if (generalTitles.map((t) => t.includes(title)).some((t) => t)) {
    setObject && setObject((p) => ({ ...p, object_type: "General" }));
    return { data: [] };
  } else {
    setObject && setObject((p) => ({ ...p, object_type: "Order" }));
    return { data: (await getOrders({ page_number: pageNumber }))?.data };
  }
};
