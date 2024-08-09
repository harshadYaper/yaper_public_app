import axios from "axios";
import { clearData, getData } from "../storage";
import { getNetworkStateAsync } from "expo-network";
import { getAppVariables } from "../utils/environment";
import { router } from "expo-router";
import Toast from "../utils/toast";
import { sendReport, trackEvent } from "../utils/analytics";
import { isEmpty } from "../utils/helper";

const TOKEN_EXEMPT_URLS = [
  "/v1/sessions",
  "/v1/sessions/verify_otp",
  "/v1/cards",
];

export const getConnection = async () =>
  (await getNetworkStateAsync())?.isInternetReachable;

export const checkToken = async () => {
  let token = await getData("TOKEN");
  (isEmpty(token) || Date.now() >= token.expire_at) &&
    (await clearData({})) &&
    router.replace({ pathname: "/auth" });
};

export async function makeRequest({ baseURL, url, payload, method }) {
  try {
    !TOKEN_EXEMPT_URLS.includes(url) && (await checkToken());

    if (await getConnection()) {
      let headers = { "Content-Type": "application/json" };
      !TOKEN_EXEMPT_URLS.includes(url) &&
        (headers["session-id"] = (await getData("TOKEN"))?.token);

      const request = axios.create({
        baseURL: baseURL || `${(await getAppVariables()).baseUrl}/api`,
        timeout: 20000,
        headers,
        cancelToken: axios.CancelToken.source().token,
      });

      switch (method) {
        case "POST":
          return await request.post(url, payload).then((r) => r.data);
        case "PUT":
          return await request.put(url, payload).then((r) => r.data);
        case "PATCH":
          return await request.patch(url, payload).then((r) => r.data);
        case "DELETE":
          return await request.delete(url, payload).then((r) => r.data);
        case "GET":
          return await request.get(url, payload).then((r) => r.data);
      }
    } else {
      throw new Error("No internet connection");
    }
  } catch (error) {
    return requestErrorHandler({ url, payload, method }, error);
  }
}

async function requestErrorHandler({ method, url, payload }, error) {
  console.log(error);
  console.log(method, url, payload);
  sendReport(error);
  Toast(
    (await getAppVariables()).env == "staging" ? error : "Something Went Wrong"
  );
  trackEvent("Api Failures", { responseCode: 500, message: error.message });
}
