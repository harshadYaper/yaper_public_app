import {
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  scaleBorder,
  scaleFont,
  scaleHeight,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { Image, ImageBackground } from "expo-image";
import { RUPEE } from "../constants";
import Loading from "./loading";
import { exportWallet } from "../api";
import showToast from "../utils/toast";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { isEmpty } from "../utils/helper";

export default function Transactions({
  data,
  openFilters,
  setPageNumber,
  fetching,
  fetchData,
  endOfData,
}) {
  return (
    <FlatList
      contentContainerStyle={{}}
      showsVerticalScrollIndicator={false}
      style={{
        width: "100%",
        opacity: openFilters ? 0.1 : 1,
        marginBottom: scaleHeight(90),
        ...scalePadding(12),
      }}
      data={data || []}
      renderItem={({
        item: {
          time,
          status,
          order_info,
          amount,
          closing_balance,
          tds_description,
        },
        index,
      }) => {
        return (
          <>
            <View
              style={{
                ...{
                  backgroundColor: "#FFFFFF",
                  ...scalePadding(16),
                  borderColor: "#E4E4E4",
                  borderRadius: scaleBorder(8),
                  borderWidth: scaleWidth(2),
                },
                ...(index == 0 ? {} : { marginTop: scaleHeight(16) }),
              }}
            >
              {status == "payment received" && (
                <>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        marginBottom: scaleHeight(4),
                        ...scaleFont(12),
                        fontWeight: "500",
                        color: "#025ACE",
                      }}
                    >
                      {order_info.split(" ").slice(-1)[0]}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          marginBottom: scaleHeight(4),
                          ...scaleFont(12),
                          fontWeight: "500",
                          color: "#039855",
                          marginRight: scaleWidth(8),
                        }}
                      >
                        {amount}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          console.log(tds_description);
                        }}
                      >
                        <Image
                          source={require("../../assets/Info.svg")}
                          style={{
                            height: scaleHeight(20),
                            width: scaleWidth(20),
                            tintColor: "#667085",
                            marginRight: scaleWidth(8),
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      backgroundColor: "#D0D5DD",
                      height: scaleHeight(2),
                      marginTop: scaleHeight(8),
                      marginBottom: scaleHeight(16),
                    }}
                  />
                  <View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          paddingBottom: scaleHeight(8),
                        }}
                      >
                        <Image
                          source={require("../../assets/icons/CheckCircle.svg")}
                          style={{
                            height: scaleHeight(24),
                            width: scaleWidth(24),
                            tintColor: "#039855",
                          }}
                        />
                        <Text
                          style={{
                            fontWeight: "500",
                            color: "#101828",
                            ...scaleFont(14),
                            paddingLeft: scaleWidth(8),
                          }}
                        >
                          Amount added in wallet
                        </Text>
                      </View>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <View
                        style={{
                          width: scaleWidth(2),
                          height: scaleHeight(48),
                          backgroundColor: "#D0D5DD",
                          marginLeft: scaleWidth(11),
                        }}
                      ></View>

                      <Text
                        style={{
                          paddingLeft: scaleWidth(20),
                          ...scaleFont(10),
                          color: "#667085",
                        }}
                      >
                        {time}
                      </Text>
                    </View>

                    <View
                      style={{
                        display: "flex",
                        width: "100%",
                        paddingTop: scaleHeight(8),
                      }}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
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
                        <Text
                          style={{
                            marginBottom: scaleHeight(4),
                            fontWeight: "500",
                            color: "#667085",
                            ...scaleFont(14),
                          }}
                        >
                          Amount transferred to bank
                        </Text>
                      </View>
                      <Text
                        style={{
                          paddingLeft: scaleWidth(30),
                          ...scaleFont(10),
                          color: "#667085",
                        }}
                      >
                        Amount will be released once the order is delivered
                      </Text>
                    </View>
                  </View>
                </>
              )}
              {status == "payment cancelled" && (
                <>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: scaleHeight(16),
                    }}
                  >
                    <Text
                      style={{
                        color: "#101828",
                        fontWeight: "500",
                        ...scaleFont(14),
                      }}
                    >
                      Order Cancelled
                    </Text>
                    <Text
                      style={{
                        color: "#F04438",
                        ...scaleFont(12),
                        fontWeight: "500",
                      }}
                    >
                      {amount}
                    </Text>
                  </View>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#025ACE",
                        ...scaleFont(12),
                        fontWeight: "500",
                      }}
                    >
                      Yaper Order ID : {order_info.split(" ").slice(-1)[0]}
                    </Text>
                    <Text
                      style={{
                        color: "#667085",
                        ...scaleFont(10),
                      }}
                    >
                      {time}
                    </Text>
                  </View>
                </>
              )}
            </View>
            <Loading
              reachedEnd={data.length - 1 == index}
              fetching={fetching}
            />
          </>
        );
      }}
      keyExtractor={({ order_info, status, time }) =>
        `Transaction ${order_info}- ${status} - ${time}`
      }
      onEndReached={() => !endOfData && setPageNumber((p) => p + 1)}
      refreshControl={
        <RefreshControl
          refreshing={fetching}
          onRefresh={() => fetchData({ resetData: true })}
        />
      }
    />
  );
}

export function TransactionsHeader({ balance }) {
  const { email } = useSelector((state) => state.user);
  const [modal, setModal] = useState();
  const [dates, setDates] = useState({});

  useEffect(() => {
    (async () => {
      if (dates.from && dates.to) {
        let response = await exportWallet({
          from: new Date(dates.from),
          to: new Date(dates.to),
        });

        if (response.response_message == "success") {
          showToast({
            message: `Transactions will be send on ${email}, may take upto 30 mins.`,
            type: "success",
            duration: 3000,
          });
        } else {
          showToast({
            message: response.response_message,
            type: "error",
          });
        }

        setDates({});
        setModal();
      }
    })();
  }, [dates]);

  return (
    <>
      <Text
        style={{
          ...scaleFont(20),
          fontWeight: "500",
          ...scalePadding(4),
          paddingBottom: scaleHeight(16),
          width: "100%",
        }}
      >
        Wallet
      </Text>
      <View style={{ paddingBottom: scaleHeight(40) }}>
        <ImageBackground
          source={require("../../assets/wallet-bg.svg")}
          style={{
            ...scalePadding(16),
            paddingLeft: scaleWidth(24),
            paddingRight: scaleWidth(24),
            borderRadius: scaleBorder(8),
            height: scaleHeight(150),
          }}
        >
          <Text
            style={{
              paddingBottom: scaleHeight(12),
              ...scaleFont(16),
              fontWeight: "500",
              color: "#F9FAFB",
            }}
          >
            Your Balance:
          </Text>
          <Text
            style={{
              paddingBottom: scaleHeight(4),
              ...scaleFont(30),
              fontWeight: "500",
              color: "#FFFFFF",
            }}
          >
            {RUPEE} {balance}
          </Text>
        </ImageBackground>
      </View>
      <View
        style={{
          ...scalePadding(6),
          paddingBottom: scaleHeight(16),
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ ...scaleFont(16), fontWeight: "500", color: "#667085" }}>
          All Transactions
        </Text>
        {modal && (
          <RNDateTimePicker
            mode="date"
            display="calendar"
            value={new Date()}
            maximumDate={new Date()}
            themeVariant="light"
            onChange={({ nativeEvent: { timestamp }, type }) => {
              if (type == "dismissed") {
                setModal();
                setDates({});
              }
              if (type == "set") {
                if (isEmpty(dates.from)) {
                  setDates({ from: timestamp });
                  showToast({
                    message: "Please select To date",
                    type: "info",
                    duration: 5000,
                  });
                } else {
                  setDates((d) => ({
                    ...d,
                    to: timestamp,
                  }));
                }
              }
            }}
          />
        )}
        <Pressable
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: "#FFFFFF",
            ...scalePadding(12),
            borderColor: "#D0D5DD",
            borderWidth: scaleWidth(2),
            borderRadius: scaleBorder(8),
          }}
          onPress={async () => {
            setModal(true);
            showToast({
              message: "Please select From date",
              type: "info",
              duration: 5000,
            });
          }}
        >
          <Image
            source={require("../../assets/Download.svg")}
            style={{
              height: scaleHeight(20),
              width: scaleWidth(20),
              marginRight: scaleWidth(8),
            }}
          />
          <Text style={{ ...scaleFont(12), color: "#101828" }}>Export</Text>
        </Pressable>
      </View>
      <View
        style={{
          paddingTop: scaleHeight(10),
          paddingLeft: scaleWidth(6),
          paddingRight: scaleWidth(6),
        }}
      >
        <View
          style={{
            backgroundColor: "#D0D5DD",
            height: 2,
          }}
        />
      </View>
    </>
  );
}
