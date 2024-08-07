import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "./store";

export default function HomeLayout() {
  return (
    <Provider store={store}>
      <Stack />
    </Provider>
  );
}
