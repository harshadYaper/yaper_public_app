import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { getTickets } from "../api";
import {
  scaleBorder,
  scaleFont,
  scalePadding,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { router } from "expo-router";
import { isEmpty } from "../utils/helper";

export default function Tickets({}) {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [endOfData, setEndOfData] = useState(false);

  const fetchData = async ({ resetData = false }) => {
    let apiData = (await getTickets({ page_number: pageNumber }))?.data;
    let empty = isEmpty(apiData);
    setEndOfData(empty);
    setData((p) => (resetData ? apiData : [...p, ...apiData]));
  };

  useEffect(() => {
    fetchData({ resetData: true });
  }, [pageNumber]);

  return (
    <View>
      <FlatList
        contentContainerStyle={{ width: "100%" }}
        data={data}
        onEndReached={() => !endOfData && setPageNumber((p) => p + 1)}
        renderItem={({ item: { title, created_at, id } }) => (
          <View
            style={{
              ...scalePadding(4),
            }}
          >
            <TouchableOpacity
              style={{
                width: "100%",
                backgroundColor: "#FFF",
                borderRadius: scaleBorder(8),
                borderWidth: scaleWidth(2),
                ...scalePadding(8),
              }}
              onPress={() => {
                router.push({
                  pathname: "/support",
                  params: { title, ticket_id: id },
                });
              }}
            >
              <Text style={{ ...scaleFont(16) }}>{title}</Text>
              <Text style={{ ...scaleFont(16) }}>
                {TimeFormatter({ time: Date.now() - Date.parse(created_at) })}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

function TimeFormatter({ time }) {
  let oneSec = 1000;
  let oneMin = 60 * oneSec;
  let oneHour = 60 * oneMin;
  let oneDay = 24 * oneHour;
  return time / oneDay > 1
    ? Math.round(time / oneDay, 0) + " days ago"
    : time / oneHour > 1
    ? Math.round(time / oneHour, 0) + " hours ago"
    : time / oneMin > 1
    ? Math.round(time / oneMin, 0) + " minutes ago"
    : Math.round(time / oneSec, 0) + " seconds ago";
}
