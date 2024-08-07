import { StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import App from "../../app";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import { getCards } from "../../api";
import { router } from "expo-router";
import MyCards from "./my-cards";

export default function Cards() {
  const user = useSelector((state) => state.user);

  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);

  const [selectedCards, setSelectedCards] = useState([]);
  const [component, setComponent] = useState([MyCards]);

  const [Component] = component;

  useEffect(() => {
    let userCards = user.cards.map((c) => c.card_id);
    cards &&
      userCards &&
      setSelectedCards(
        cards?.cards?.credit
          .map((c) => c.cards)
          .reduce((c1, c2) => [...c1, ...c2])
          .filter((cc) => userCards.includes(cc.id))
          .map((c) => ({ id: c.id, slug: c.slug }))
      );
  }, [cards]);

  useEffect(() => {
    setLoading(false);
    (async () => {
      setCards(await getCards({}));
    })();
  }, []);

  return (
    <App
      Component={
        <Component
          cards={cards}
          selectedCards={selectedCards}
          setComponent={setComponent}
          setSelectedCards={setSelectedCards}
        />
      }
      Splash={<></>}
      styles={customeStyles}
      loading={loading}
      options={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: "#101828",
          fontSize: 16,

          fontWeight: "500",
        },
        headerShown: true,
        title: "My Cards",
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => {
              Component == MyCards ? router.back() : setComponent([MyCards]);
            }}
          >
            <Image
              source={require("../../../assets/icons/CaretLeft.svg")}
              style={{ height: 24, width: 24, tintColor: "#101828" }}
            />
          </TouchableOpacity>
        ),
      }}
    />
  );
}
const customeStyles = StyleSheet.create({});
