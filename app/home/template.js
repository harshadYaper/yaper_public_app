import { View } from "react-native";

import { useEffect, useState } from "react";
import { getDeals, getOrders, getSupportChats, getWallet } from "../api";
import Header from "./header";
import Navigation from "./navigation";
import Filters from "./filters";
import AdditionalFilters from "./additional_filters";
import Deals, { DealsHeader } from "./deals";
import Orders, { OrdersHeader } from "./orders";
import Transactions, { TransactionsHeader } from "./transactions";
import Supports, { SupportsHeader } from "./supports";
import {
  scaleBorder,
  scaleFont,
  scaleHeight,
  scaleWidth,
} from "../utils/getScaledDimensions";
import { isEmpty } from "../utils/helper";

const navMenu = [
  {
    label: "Home",
    icon: require("../../assets/icons/HouseLine.svg"),
    navigation: "home",
    api: getDeals,
    Component: Deals,
    HeaderComponent: DealsHeader,
    HeaderComponentStyles: {
      display: "flex",
      width: "100%",
    },
    showProfile: true,
    filterStyles: {},
  },
  {
    label: "Orders",
    icon: require("../../assets/icons/Package.svg"),
    navigation: "orders",
    api: getOrders,
    Component: Orders,
    HeaderComponent: OrdersHeader,
    HeaderComponentStyles: {
      display: "flex",
      width: "100%",
      paddingTop: scaleHeight(60),
      paddingBottom: scaleHeight(20),
    },
    filterStyles: {
      Label: { ...scaleFont(16), fontWeight: "600", color: "#344054" },
      Image: {
        height: scaleHeight(20),
        width: scaleWidth(20),
      },
      Filter: {
        borderRadius: scaleBorder(8),
      },
    },
  },
  {
    label: "Transactions",
    icon: require("../../assets/icons/ArrowsLeftRight.svg"),
    navigation: "transactions",
    api: getWallet,
    Component: Transactions,
    HeaderComponent: TransactionsHeader,
    HeaderComponentStyles: {
      display: "flex",
      width: "100%",
      paddingTop: scaleHeight(60),
      paddingBottom: scaleHeight(20),
    },
    filterStyles: {},
  },
  {
    label: "Support",
    icon: require("../../assets/icons/Question.svg"),
    navigation: "support",
    api: getSupportChats,
    Component: Supports,
    HeaderComponent: SupportsHeader,
    HeaderComponentStyles: {
      display: "flex",
      width: "100%",
      paddingTop: scaleHeight(60),
    },
    filterStyles: {},
  },
];

export default function Template({}) {
  const [nav, setNav] = useState(navMenu[0].navigation);
  const [filters, setFilters] = useState({});
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState({ data: [], filter: [] });
  const [openFilterOption, setOpenFilterOption] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const { Component } = navMenu.find((n) => n.navigation == nav);

  const fetchData = async ({ resetData = false }) => {
    setFetching(true);

    let apiData = await navMenu
      .find(({ navigation }) => navigation == nav)
      .api({
        page_number: pageNumber,
        filters: Object.entries(filters)
          .filter(([k, v]) => !["filter", "gst_deals", "emi_deals"].includes(k))
          .map(([k, v]) => ({ [k]: v }))
          .reduce((a, b) => ({ ...a, ...b }), undefined),
      });

    setData((p) => ({
      data: [
        ...(resetData ? [] : p.data),
        ...(nav == "transactions"
          ? apiData?.data.wallet?.transactions
          : apiData?.data),
      ],
      filter: [...(apiData?.filter || [])],
      otherData: {
        supportTimings: apiData?.time,
        balance: apiData?.data.wallet?.current_balance_ui,
      },
    }));

    setFetching(false);
  };

  useEffect(() => {
    fetchData({});
  }, [nav, pageNumber]);

  useEffect(() => {
    if (openFilterOption) {
      let selectedoption = openFilterOption.options
        .filter((o) => o.selected)
        .map((o) => o.id);
      !isEmpty(selectedoption) &&
        setFilters((p) => ({
          ...p,
          [openFilterOption.id]:
            openFilterOption.type == "ms"
              ? selectedoption.join(",")
              : selectedoption[0],
        }));
    }
  }, [openFilterOption]);

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
      {navMenu.find(({ navigation }) => navigation == nav).HeaderComponent && (
        <Header
          HeaderComponent={
            navMenu.find(({ navigation }) => navigation == nav).HeaderComponent
          }
          HeaderComponentStyles={
            navMenu.find(({ navigation }) => navigation == nav)
              .HeaderComponentStyles
          }
          HeaderComponentData={data.otherData}
          showProfile={
            navMenu.find(({ navigation }) => navigation == nav).showProfile
          }
        />
      )}

      {openFilterOption && (
        <AdditionalFilters
          setFilters={setFilters}
          filters={filters}
          fetchData={fetchData}
          navigation={nav}
          filterStyles={
            navMenu.find(({ navigation }) => navigation == nav).filterStyles
          }
        />
      )}

      {Component && (
        <Component
          data={data?.data || []}
          openFilters={filters.filter}
          setPageNumber={setPageNumber}
          fetchData={fetchData}
          fetching={fetching}
        />
      )}
      <Navigation
        navMenu={navMenu}
        setNav={setNav}
        nav={nav}
        setData={setData}
        setFilters={setFilters}
        setPageNumber={setPageNumber}
      />
      {filters.filter && (
        <Filters
          filters={data?.filter}
          selectedFilters={filters}
          setFilters={setFilters}
          fetchData={fetchData}
          openFilterOption={openFilterOption}
          setOpenFilterOption={setOpenFilterOption}
        />
      )}
    </View>
  );
}
