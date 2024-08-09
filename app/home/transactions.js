import { FlatList, Text, TouchableOpacity, View } from "react-native";
import {
  scaleHeight,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { Image, ImageBackground } from "expo-image";

export default function Transactions({ data, openFilters, setPageNumber }) {
  return (
    <FlatList
      contentContainerStyle={{}}
      showsVerticalScrollIndicator={false}
      style={{
        width: "100%",
        opacity: openFilters ? 0.1 : 1,
        marginTop: scaleHeight(10),
        marginBottom: scaleHeight(100),
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
      }) => {
        return (
          <View
            style={{
              backgroundColor: "#FFFFFF",
              marginTop: scaleHeight(16),
              ...scalePadding(16),
              borderColor: "#E4E4E4",
              borderRadius: 8,
              borderWidth: 1,
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
                      fontSize: 12,

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
                        fontSize: 12,

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
                        source={require("../../assets/icons/Info.svg")}
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
                ></View>
                <View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={require("../../assets/icons/CheckCircle.svg")}
                      style={{
                        height: scaleHeight(24),
                        width: scaleWidth(24),
                        tintColor: "#039855",
                        marginRight: scaleWidth(8),
                      }}
                    />
                    <View>
                      <Text
                        style={{
                          marginBottom: scaleHeight(4),
                          fontWeight: "500",
                          color: "#101828",
                        }}
                      >
                        Amount added in wallet
                      </Text>
                      <Text
                        style={{
                          marginBottom: scaleHeight(4),
                          fontSize: 10,

                          color: "#667085",
                        }}
                      >
                        {time}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: scaleWidth(2),
                      height: scaleHeight(48),
                      backgroundColor: "#D0D5DD",
                      marginLeft: scaleWidth(11),
                    }}
                  ></View>

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
                    <View>
                      <Text
                        style={{
                          marginBottom: scaleHeight(4),
                          fontWeight: "500",
                          color: "#667085",
                        }}
                      >
                        Amount transferred to bank
                      </Text>
                      <Text
                        style={{
                          marginBottom: scaleHeight(4),
                          fontSize: 10,

                          color: "#667085",
                        }}
                      >
                        Amount will be released once the order is delivered
                      </Text>
                    </View>
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
                    }}
                  >
                    Order Cancelled
                  </Text>
                  <Text
                    style={{
                      color: "#F04438",
                      fontSize: 12,

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
                      fontSize: 12,

                      fontWeight: "500",
                    }}
                  >
                    Yaper Order ID : {order_info.split(" ").slice(-1)[0]}
                  </Text>
                  <Text
                    style={{
                      color: "#667085",
                      fontSize: 10,
                    }}
                  >
                    {time}
                  </Text>
                </View>
              </>
            )}
            {/* {status == "payment withdrawn" && (
              <>
                <View style={{ backgroundColor: "red", height: 100 }}></View>
              </>
            )} */}
          </View>
        );
      }}
      keyExtractor={({ order_info, status, time }) =>
        `Transaction ${order_info}- ${status} - ${time}`
      }
      onEndReached={() => setPageNumber((p) => p + 1)}
      onEndReachedThreshold={0.2}
    />
  );
}

export function TransactionsHeader() {
  return (
    <ImageBackground
      source={require("../../assets/wallet-bg.svg")}
      style={{
        height: "100%",
        width: "100%",
        marginRight: scaleWidth(8),
        ...scalePadding(16),
        borderRadius: 8,
      }}
    >
      <Text
        style={{
          marginBottom: scaleHeight(12),
          fontSize: 16,

          fontWeight: "500",
          color: "#F9FAFB",
        }}
      >
        Your Balance:
      </Text>
      <Text
        style={{
          marginBottom: scaleHeight(4),
          fontSize: 30,

          fontWeight: "500",
          color: "#FFFFFF",
        }}
      >
        $ XXXXXXXX
      </Text>
    </ImageBackground>
  );
}
