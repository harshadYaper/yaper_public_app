import { router } from "expo-router";

export default function DataRoute({ user, setComponent, Component }) {
  if (!user.first_name) {
    setComponent([Component, {}]);
  } else {
    router.replace({
      pathname: "/",
    });
  }
}
