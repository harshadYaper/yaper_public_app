import { Image, ImageBackground } from "expo-image";
import {
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CARD_IMAGES } from "../../constants/images";
import {
  scaleBorder,
  scaleFont,
  scaleHeight,
  scalePadding,
  scaleWidth,
} from "../../utils/getScaledDimensions";
import AddCards from "./add-cards";
import { truncate } from "../../utils/helper";

export default function MyCards({
  cards,
  selectedCards,
  setComponent,
  setSelectedCards,
}) {
  return (
    <FlatList
      numColumns={2}
      contentContainerStyle={{
        display: "flex",
        paddingBottom: scaleHeight(12),
        paddingTop: scaleHeight(12),
        paddingLeft: scaleWidth(10),
        paddingRight: scaleWidth(10),
        width: "100%",
        height: "100%",
      }}
      style={{}}
      data={cards?.cards?.credit
        .map((c) => c.cards)
        .reduce((c1, c2) => [...c1, ...c2])
        .filter((cc) => selectedCards?.map((c) => c.id)?.includes(cc.id))
        .concat({ id: -1, slug: "", display_name: "" })}
      renderItem={({ item: { id, slug, display_name } }) => (
        <>
          {id == -1 ? (
            <TouchableOpacity
              style={{
                width: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ...scalePadding(8),
              }}
              onPress={() => setComponent([AddCards])}
            >
              <Text
                style={{
                  ...scaleFont(10),
                  color: "#667085",
                  paddingBottom: scaleHeight(8),
                  paddingLeft: scaleWidth(10),
                }}
              ></Text>
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: scaleWidth(140),
                  alignItems: "center",
                  borderStyle: "dotted",
                  borderWidth: scaleWidth(2),
                  borderColor: "#667085",
                  height: scaleHeight(100),
                  borderRadius: scaleBorder(6),
                }}
              >
                <Image
                  contentFit={"contain"}
                  source={require("../../../assets/XCircle.svg")}
                  style={{
                    height: scaleHeight(32),
                    width: scaleWidth(32),
                  }}
                />
                <Text
                  style={{
                    ...scaleFont(12),
                    color: "#667085",
                  }}
                >
                  Add Card
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: scaleHeight(12),
                paddingTop: scaleHeight(12),
                paddingLeft: scaleWidth(10),
                paddingRight: scaleWidth(10),
              }}
            >
              <Text
                style={{
                  ...scaleFont(10),
                  color: "#667085",
                  width: "100%",
                  paddingBottom: scaleHeight(8),
                  paddingLeft: scaleWidth(10),
                }}
              >
                {truncate(display_name, 28)}
              </Text>
              <ImageBackground
                contentFit={"contain"}
                source={
                  slug && CARD_IMAGES[slug]
                    ? CARD_IMAGES[slug].uri
                    : CARD_IMAGES.placeholder_card.uri
                }
                style={{
                  height: scaleHeight(100),
                  width: scaleWidth(160),
                }}
              >
                <Pressable
                  onPress={() =>
                    setSelectedCards((p) => p.filter((c) => c.id !== id))
                  }
                >
                  <Image
                    contentFit="contain"
                    source={require("../../../assets/Trash.svg")}
                    style={{
                      height: scaleHeight(18),
                      width: scaleWidth(18),
                      position: "absolute",
                      top: 5,
                      right: 15,
                      backgroundColor: "#F9FAFB",
                      borderRadius: 10,
                    }}
                  />
                </Pressable>
              </ImageBackground>
            </View>
          )}
        </>
      )}
    />
  );
}
