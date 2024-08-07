import AsyncStorage from "@react-native-async-storage/async-storage";
import { isEmpty } from "../utils/helper";

export async function putData(key, value) {
  try {
    !isEmpty(value) && (await AsyncStorage.setItem(key, JSON.stringify(value)));
  } catch (error) {
    console.log("PUT ASYNC STORE :::", error);
  }
}

export async function getData(key) {
  try {
    let val = await AsyncStorage.getItem(key, null);
    return isEmpty(val) ? undefined : JSON.parse(val);
  } catch (error) {
    console.log("GET ASYNC STORE :::", error);
  }
}

export async function clearData({ showedIntro = true }) {
  try {
    await AsyncStorage.clear();
    showedIntro && (await putData("SHOWED_INTRO", true));
    return true;
  } catch (error) {
    console.log("CLEAR ASYNC STORE :::", error);
  }
}
