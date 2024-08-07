import { View } from "react-native";

import { useEffect, useState } from "react";
import { getDeals, getOrders, getSupportChats, getWallet } from "../api";
import Header from "./header";
import Navigation from "./navigation";
import Filters from "./filters";
import AdditionalFilters from "./additional_filters";
import Deals, { DealsHeader } from "./deals";
import Orders from "./orders";
import Transactions, { TransactionsHeader } from "./transactions";
import Supports, { SupportsHeader } from "./supports";
import { scaleHeight } from "../utils/getScaledDimensions";

const navMenu = [
  {
    label: "Home",
    icon: require("../../assets/icons/HouseLine.svg"),
    navigation: "home",
    api: getDeals,
    Component: Deals,
    HeaderComponent: DealsHeader,
  },
  {
    label: "Orders",
    icon: require("../../assets/icons/Package.svg"),
    navigation: "orders",
    api: getOrders,
    Component: Orders,
  },
  {
    label: "Transactions",
    icon: require("../../assets/icons/ArrowsLeftRight.svg"),
    navigation: "transactions",
    api: getWallet,
    Component: Transactions,
    HeaderComponent: TransactionsHeader,
  },
  {
    label: "Support",
    icon: require("../../assets/icons/Question.svg"),
    navigation: "support",
    api: getSupportChats,
    Component: Supports,
    HeaderComponent: SupportsHeader,
    HeaderComponentStyles: { height: scaleHeight(60) },
  },
];

export default function Template({}) {
  const [nav, setNav] = useState(navMenu[1].navigation);
  const [filters, setFilters] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState({ data: [], filter: [] });
  const [openFilters, setOpenFilters] = useState(false);
  const [openFilterOption, setOpenFilterOption] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const { Component } = navMenu.find((n) => n.navigation == nav);

  const fetchData = async () => {
    setFetching(true);

    let apiData = await navMenu
      .find(({ navigation }) => navigation == nav)
      .api({ page_number: pageNumber });

    setData((p) => ({
      data: [
        ...p.data,
        ...(nav == "transactions"
          ? apiData?.data.wallet?.transactions
          : apiData?.data),
      ],
      filter: [...(apiData?.filter || [])],
      otherData: { supportTimings: apiData?.time },
    }));

    setFetching(false);
  };

  useEffect(() => {
    fetchData();
  }, [nav, pageNumber]);

  useEffect(() => {
    data && setOpenFilterOption(data?.filter?.[0]);
  }, [data]);

  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Header
        HeaderComponent={
          navMenu.find(({ navigation }) => navigation == nav).HeaderComponent
        }
        HeaderComponentStyles={
          navMenu.find(({ navigation }) => navigation == nav)
            .HeaderComponentStyles
        }
        HeaderComponentData={data.otherData}
      />

      {openFilterOption && (
        <AdditionalFilters
          setOpenFilters={setOpenFilters}
          setFilters={setFilters}
          filters={filters}
        />
      )}
      {Component && (
        <Component
          data={data?.data || []}
          openFilters={openFilters}
          setPageNumber={setPageNumber}
        />
      )}

      <Navigation
        navMenu={navMenu}
        setNav={setNav}
        nav={nav}
        setData={setData}
      />

      {openFilters && (
        <Filters
          filters={data?.filter}
          setOpenFilters={setOpenFilters}
          openFilterOption={openFilterOption}
          setOpenFilterOption={setOpenFilterOption}
        />
      )}
    </View>
  );
}
