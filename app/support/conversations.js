import { useLocalSearchParams } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";
import Input from "../common/input";
import { useEffect, useState } from "react";
import {
  scaleBorder,
  scaleFont,
  scaleHeight,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { Image, ImageBackground } from "expo-image";
import { getDocumentAsync } from "expo-document-picker";
import { createConversation, createTicket, getConversations } from "../api";
import { isEmpty, sleep } from "../utils/helper";
import Loading from "../home/loading";
import WebView from "../common/web-view";

export default function Conversations() {
  const { title, ticket_id } = useLocalSearchParams();
  const [data, setData] = useState([]);
  const [ticket, setTicket] = useState(ticket_id);
  const [message, setMessage] = useState();
  const [fetching, setFetching] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [endOfData, setEndOfData] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [modal, setModal] = useState();

  const fetchConversations = async ({ resetData = false }) => {
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

      !empty && setData((p) => (resetData ? apiData : [...p, ...apiData]));
      setFetching(false);
    }
  };

  useEffect(() => {
    (async () => await fetchConversations({}))();
    pageNumber !== 1 && clearInterval();
  }, [pageNumber]);

  useEffect(() => {
    (async () => await fetchConversations({ resetData: true }))();
    setInterval(async () => {
      pageNumber == 1 && (await fetchConversations({ resetData: true }));
    }, 1000);
  }, [ticket]);

  const handleSendMessage = async ({ ticket_id }) => {
    clearInterval();
    let chatResponse = await createConversation({
      ticket_id: ticket_id || ticket,
      documents,
      message,
    });

    if (chatResponse?.response_message == "success") {
      await fetchConversations({ resetData: true });
      setMessage();
    }
  };

  return (
    <>
      <View
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "flex-end",
        }}
      >
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
                alignItems: user_type == "user" ? "flex-end" : "flex-start",
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
                          height: scaleHeight(50),
                          width: "100%",
                          borderWidth: scaleBorder(1),
                          borderRadius: 8,
                        }}
                      >
                        <View style={{ flex: 1, ...scalePadding(4) }}>
                          <WebView uri={url} />
                        </View>
                      </Pressable>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}
          keyExtractor={({ id }) => `TICKET: ${ticket} CONVERSATION: ${id}`}
        />
        <View
          style={{
            width: "100%",
            ...scalePadding(8),
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
                    style={{ height: scaleHeight(30), width: scaleWidth(30) }}
                  />
                </Pressable>
                <Pressable
                  style={{ ...scalePadding(4) }}
                  disabled={!message}
                  onPress={async () => {
                    if (!ticket) {
                      let response = await createTicket({ title });
                      if (response.response_message == "success") {
                        setTicket(response.ticket_id);
                        setEndOfData(false);
                        sleep(1000);

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
                      ...(message && { tintColor: "#025ACE" }),
                    }}
                  />
                </Pressable>
              </View>
            }
          />
        </View>
      </View>
      {modal && (
        <View style={{ position: "absolute", width: "100%", height: "100%" }}>
          <Pressable
            style={{
              ...scalePadding(50),
              backgroundColor: "#101828",
              width: "100%",
              height: "100%",
            }}
            onPress={() => setModal()}
          >
            <Pressable style={{ flex: 1, ...scalePadding(4) }}>
              <WebView uri={modal} />
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
            </Pressable>
          </Pressable>
        </View>
      )}
    </>
  );
}
