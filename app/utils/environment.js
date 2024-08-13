import { APP_VARIABLES } from "../env";
import { clearData, getData, putData } from "../storage";
import { reloadAsync } from "expo-updates";

// const DEFAULT_ENVIRONMENT = "production";
const DEFAULT_ENVIRONMENT = "staging";

export const getEnvironment = async () => {
  let env = await getData("ENVIRONMENT");
  if (!env) {
    await putData("ENVIRONMENT", DEFAULT_ENVIRONMENT);
    return DEFAULT_ENVIRONMENT;
  } else {
    return env;
  }
};

export const setEnvironment = async (environment) => {
  await putData("ENVIRONMENT", environment);
  await clearData({});
  await reloadAsync();
};

export const getAppVariables = async () =>
  APP_VARIABLES[await getEnvironment()];
