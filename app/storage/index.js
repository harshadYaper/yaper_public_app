import AsyncStorage from "@react-native-async-storage/async-storage";
import { isEmpty } from "../utils/helper";

export async function putData(key, value) {
  try {
    let transformedKey =
      key == "ENVIRONMENT" ? key : key + "_" + (await getData("ENVIRONMENT"));
    !isEmpty(value) &&
      (await AsyncStorage.setItem(transformedKey, JSON.stringify(value)));
  } catch (error) {
    console.log("PUT ASYNC STORE :::", error, key);
  }
}

export async function getData(key) {
  try {
    let transformedKey =
      key == "ENVIRONMENT" ? key : key + "_" + (await getData("ENVIRONMENT"));
    let val = await AsyncStorage.getItem(transformedKey, undefined);
    return !isEmpty(val) && JSON.parse(val);
  } catch (error) {
    console.log("GET ASYNC STORE :::", error, key);
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
