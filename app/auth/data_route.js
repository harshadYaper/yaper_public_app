import { router } from "expo-router";
import BasicInfo from "./basicInfo";

export default function DataRoute({ user, setComponent }) {
  if (!user.first_name) {
    setComponent([BasicInfo, {}]);
  } else {
    router.replace({
      pathname: "/",
    });
  }
}
