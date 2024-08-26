import {
  Alert,
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  scaleBorder,
  scaleFont,
  scaleHeight,
  scaleMargin,
  scalePadding,
  scaleWidth,
} from "../../utils/getScaledDimensions";
import Input from "../../common/input";
import { useState } from "react";
import { CARD_IMAGES } from "../../constants/images";
import { Image, ImageBackground } from "expo-image";
import { MiniButton, SmallButton } from "../../common/button";
import { WHITE } from "../../constants/colors";
import { FULL_WIDTH } from "../../constants";
import { getUser, saveCards } from "../../api";
import saveData from "../../auth/save_data";
import { useDispatch } from "react-redux";
import { sleep } from "../../utils/helper";

export default function AddCards({
  selectedCards,
  cards,
  setSelectedCards,
  setMyCards,
}) {
  const [searchCardString, setSearchCardString] = useState("");
  const [filterBanks, setFilterBanks] = useState([]);

  const getFilteredCard = () => {
    return cards?.cards?.credit.filter(
      (c) => filterBanks.length == 0 || filterBanks.includes(c.bank?.name)
    );
  };
  const dispatch = useDispatch();

  const handleAddCard = async () => {
    let response = await saveCards({
      cardIds: selectedCards.map((s) => s.id),
      cardType: "credit",
    });

    if (response.response_message !== "success") {
      Alert.alert(response.response_message);
    } else {
      await saveData({
        dispatch,
        user: (await getUser({}))?.user,
      });
      sleep(2000);
      setMyCards();
    }
  };

  return (
    <>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          ...scalePadding(16),
        }}
      >
        <Text
          style={{
            ...scaleFont(20),
            fontWeight: "500",
            paddingBottom: scaleHeight(20),
          }}
        >
          Select all your credit cards
        </Text>

        <Input
          inputArray={[searchCardString]}
          onChange={setSearchCardString}
          placeholder="Enter bank/card name"
          keyboardType="numeric"
          errorMessage=""
          style={{ InputGroup: { justifyContent: "flex-start" } }}
        />

        <TouchableOpacity onPress={() => setMyCards()}>
          <Text
            style={{
              ...scaleFont(14),
              fontWeight: "500",
              color: "#025ACE",
              fontWeight: "500",
              paddingTop: scaleHeight(20),
              paddingBottom: scaleHeight(20),
            }}
          >
            Skip, I don't own any credit card
          </Text>
        </TouchableOpacity>
        <FlatList
          data={["SBI", "Axis Bank", "HDFC Bank", "ICICI Bank"]}
          horizontal
          contentContainerStyle={{
            paddingTop: scaleHeight(20),
            paddingBottom: scaleHeight(40),
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                filterBanks.includes(item)
                  ? setFilterBanks((p) => p.filter((i) => i !== item))
                  : setFilterBanks((p) => [...p, item]);
              }}
            >
              <View
                style={{
                  height: scaleHeight(40),
                  marginRight: scaleWidth(8),
                  borderRadius: scaleBorder(8),
                  borderColor: "#D0D5DD",
                  borderWidth: scaleWidth(2),
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingBottom: scaleHeight(10),
                  paddingTop: scaleHeight(10),
                  paddingLeft: scaleWidth(16),
                  paddingRight: scaleWidth(16),
                  backgroundColor: filterBanks.includes(item)
                    ? "#025ACE"
                    : WHITE,
                }}
              >
                <Text
                  style={{
                    fontWeight: "600",
                    color: filterBanks.includes(item) ? WHITE : "#344054",
                    ...scaleFont(14),
                  }}
                >
                  {item}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
        <FlatList
          contentContainerStyle={{
            paddingBottom: scaleHeight(selectedCards.length > 0 ? 100 : 50),
            minHeight: "100%",
          }}
          data={getFilteredCard()}
          renderItem={({ item: { bank, cards } }) => {
            let filtered_cards = cards.filter(
              ({ keywords, id }) =>
                keywords.toLowerCase().includes(searchCardString) &&
                !selectedCards.map((s) => s.id).includes(id)
            );

            if (filtered_cards.length != 0)
              return (
                <View style={{ marginTop: scaleHeight(12) }}>
                  <Text
                    style={{
                      paddingBottom: scaleHeight(16),
                      ...scaleFont(10),
                      fontWeight: "500",
                      color: "#646675",
                    }}
                  >
                    {bank?.name}
                  </Text>
                  <FlatList
                    horizontal
                    data={filtered_cards}
                    renderItem={({
                      item: { id, slug, display_name, keywords },
                    }) => (
                      <View
                        style={{
                          marginRight: scaleWidth(12),
                          marginBottom: scaleHeight(12),
                        }}
                      >
                        <Text
                          style={{
                            paddingBottom: scaleHeight(8),
                            ...scaleFont(9),
                            fontWeight: "300",
                            color: "#0D1F3C",
                          }}
                        >
                          {display_name}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedCards((p) => [...p, { id, slug }]);
                          }}
                        >
                          <Image
                            contentFit={"contain"}
                            source={
                              slug && CARD_IMAGES[slug]
                                ? CARD_IMAGES[slug].uri
                                : CARD_IMAGES.placeholder_card.uri
                            }
                            style={{
                              height: scaleHeight(111),
                              width: scaleWidth(160),
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                    keyExtractor={({ slug }) => slug}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              );
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={({ bank, cards }) => bank?.name}
        />
      </View>
      {selectedCards.length > 0 && (
        <View
          style={{
            height: scaleHeight(108),
            width: FULL_WIDTH,
            backgroundColor: WHITE,
            position: "absolute",
            bottom: 0,
            borderTopLeftRadius: scaleBorder(20),
            borderTopRightRadius: scaleBorder(20),
            paddingLeft: scaleWidth(24),
            paddingRight: scaleWidth(24),
            paddingBottom: scaleHeight(12),
          }}
        >
          <Text
            style={{
              ...scalePadding(12),
              color: "#667085",
              ...scaleFont(10),
            }}
          >
            your cards
          </Text>
          <FlatList
            data={selectedCards}
            horizontal
            contentContainerStyle={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item: { id, slug }, index }) => (
              <Pressable
                key={"My cards" + id}
                onPress={() => {
                  setSelectedCards((p) => [...p.filter((i) => i.id !== id)]);
                }}
                style={{
                  position: "relative",
                  marginRight: scaleWidth(8),
                }}
              >
                {index <= 2 && (
                  <>
                    <ImageBackground
                      contentFit={"contain"}
                      source={
                        slug && CARD_IMAGES[slug]
                          ? CARD_IMAGES[slug].uri
                          : CARD_IMAGES.placeholder_card.uri
                      }
                      style={{
                        height: scaleHeight(40),
                        width: scaleWidth(64),
                      }}
                    >
                      <Image
                        source={require("../../../assets/cross.svg")}
                        style={{
                          ...scaleMargin(3),
                          color: WHITE,
                          height: scaleHeight(14),
                          width: scaleWidth(12),
                          position: "absolute",
                          top: -scaleHeight(7),
                          right: -scaleWidth(6),
                        }}
                      />
                    </ImageBackground>
                  </>
                )}
                {index == 3 && (
                  <View
                    style={{
                      height: scaleHeight(40),
                      width: scaleWidth(64),
                      backgroundColor: "#B5BBC9",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        ...scaleFont(20),
                        fontWeight: "500",
                        color: WHITE,
                      }}
                    >
                      +{selectedCards.length - 3}
                    </Text>
                  </View>
                )}
              </Pressable>
            )}
            ListFooterComponent={
              selectedCards.length >= 3 ? (
                <MiniButton onPress={handleAddCard} />
              ) : (
                <SmallButton onPress={handleAddCard} />
              )
            }
            ListFooterComponentStyle={{
              position: "absolute",
              right: 0,
            }}
          />
        </View>
      )}
    </>
  );
}
