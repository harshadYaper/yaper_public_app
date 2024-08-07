import { configureStore } from "@reduxjs/toolkit";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case "USER":
      return { ...state, user: { ...action.payload } };
    case "TOKEN":
      return { ...state, token: { ...action.payload } };
    case "NETWORK":
      return { ...state, network: { ...action.payload } };
    case "LOGS":
      return { ...state, log: { ...action.payload } };
    case "PARAMS":
      return { ...state, params: { ...action.payload } };
    case "SHOWED_INTRO":
      return { ...state, intro: { ...action.payload } };
    case "LOG_OUT":
      return { intro: { intro: true } };
    default:
      return { ...state };
  }
};

export default store = configureStore({ reducer });
