import axios from "axios";
import { clearData, getData } from "../storage";
import { getNetworkStateAsync } from "expo-network";
import { getAppVariables } from "../utils/environment";
import { router } from "expo-router";
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

export async function makeRequest({
  baseURL,
  url,
  payload,
  method,
  customHeaders,
  data,
  transformRequest,
}) {
  try {
    !TOKEN_EXEMPT_URLS.includes(url) && (await checkToken());

    if (await getConnection()) {
      let headers = { "Content-Type": "application/json" };
      !TOKEN_EXEMPT_URLS.includes(url) &&
        (headers["session-id"] = (await getData("TOKEN"))?.token);

      return await axios({
        baseURL: baseURL || `${(await getAppVariables()).baseUrl}/api`,
        timeout: 20000,
        headers: { ...headers, ...customHeaders },
        cancelToken: axios.CancelToken.source().token,
        method,
        url,
        params: payload,
        data,
        transformRequest,
      })
        .then((r) => r?.data)
        .catch((r) => r?.response?.data);
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

  trackEvent("Api Failures", { responseCode: 500, message: error.message });
}
