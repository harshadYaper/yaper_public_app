import { makeRequest } from "./common/make-request";

export async function login({ mobile_number, resent }) {
  return await makeRequest({
    method: "POST",
    url: "/v1/sessions",
    payload: { mobile: mobile_number, resent },
  });
}

export async function otp_verify({ otp, mobile_number }) {
  return await makeRequest({
    method: "POST",
    url: "/v1/sessions/verify_otp",
    payload: { otp, mobile: mobile_number },
  });
}

export async function getCards({}) {
  return await makeRequest({
    method: "GET",
    url: "/v1/cards",
  });
}

export async function saveCards({ cardIds, cardType, monthlySpend }) {
  return await makeRequest({
    method: "POST",
    url: "/v1/users/save_cards",
    payload: {
      card_ids: cardIds,
      card_type: cardType,
      monthly_spend: monthlySpend,
    },
  });
}

export async function saveUserData({
  email,
  firstName,
  lastName,
  mobile,
  referralCode,
  userType,
}) {
  return await makeRequest({
    method: "POST",
    url: "/v1/users/me",
    payload: {
      email,
      first_name: firstName,
      last_name: lastName,
      mobile,
      referrer_code: referralCode,
      user_type: userType,
    },
  });
}

export async function getUser({}) {
  return await makeRequest({
    method: "GET",
    url: "/v1/users/get_me",
  });
}

export async function getDeals({ filters }) {
  return await makeRequest({
    method: "POST",
    url: "/v3/deals",
    payload: { filters },
  });
}

export async function getDeal({ id }) {
  return await makeRequest({
    method: "GET",
    url: `/v3/deals/${id}`,
  });
}

export async function getOrders({ page_number, filters }) {
  return await makeRequest({
    method: "POST",
    url: `/v3/orders/filter?page_number=${page_number}`,
    payload: { filters },
  });
}

export async function createOrder({ deal_id }) {
  return await makeRequest({
    method: "POST",
    url: "/v2/orders",
    payload: { deal_id },
  });
}

export async function getOrder({ yaper_id, params }) {
  let url = "/v2/orders/";
  yaper_id && (url += yaper_id);
  params && (url += params);

  return await makeRequest({
    method: "GET",
    url,
  });
}

export async function putOrder({
  yaper_id,
  order_number,
  variant_id,
  context,
  tracking_number,
  delivery_support,
  add_delivery_support,
  invoice,
  warrenty,
}) {
  let formData = new FormData();

  formData.append("variant_id", variant_id);
  formData.append("order_number", order_number);
  formData.append("context", context);
  formData.append("tracking_number", tracking_number);
  formData.append("delivery_support", delivery_support);
  formData.append("add_delivery_support", add_delivery_support);
  formData.append("invoice", invoice);
  formData.append("warrenty", warrenty);

  return await makeRequest({
    method: "PUT",
    url: `/v2/orders/${yaper_id}`,
    data: formData,
    customHeaders: { "Content-Type": "multipart/form-data" },
    transformRequest: (data) => data,
  });
}

export async function customRequest({ payload, method, url }) {
  return await makeRequest({
    method,
    url,
    payload,
  });
}

export async function getWallet({ page_number, filters }) {
  return await makeRequest({
    method: "GET",
    url: `/v1/wallets?page_number=${page_number}`,
    payload: { ...filters },
  });
}

export async function exportWallet({ from, to }) {
  return await makeRequest({
    method: "POST",
    url: "/v1/wallets/export",
    payload: { from, to },
  });
}

export async function getWebToken({}) {
  return await makeRequest({
    method: "POST",
    url: "/v2/sessions/generate_web_token",
  });
}

export async function getSupportChats({}) {
  return await makeRequest({
    method: "GET",
    url: "/v2/support/chat_support",
  });
}

export async function getInfoCards({}) {
  return await makeRequest({
    method: "GET",
    url: "/v2/info_card/card",
  });
}

export async function getMobileVersion({}) {
  return await makeRequest({
    method: "GET",
    url: "/v1/mobile_versions",
  });
}

export async function getVideos({}) {
  return await makeRequest({
    method: "GET",
    url: "/v1/videos",
  });
}

export async function updateUserStatus({ whatsapp_consent }) {
  return await makeRequest({
    method: "POST",
    url: "/v2/sessions/update_user_status_params",
    payload: { whatsapp_consent },
  });
}

export async function saveAddress({
  first_name,
  last_name,
  address_line1,
  address_line2,
  pincode,
  city,
  state,
}) {
  return await makeRequest({
    method: "POST",
    url: "/v1/addresses",
    payload: {
      first_name,
      last_name,
      address_line1,
      address_line2,
      pincode,
      city,
      state,
    },
  });
}

export async function updateKYC({
  account_number,
  account_number_confirmation,
  account_holder_name,
  ifsc_code,
  bank_name,
  gst_number,
}) {
  return await makeRequest({
    method: "POST",
    url: "/v2/bank_account_details",
    payload: {
      account_number,
      account_number_confirmation,
      account_holder_name,
      ifsc_code,
      bank_name,
      gst_number,
    },
  });
}

export async function updatePAN({ account_holder_name, pan_number }) {
  return await makeRequest({
    method: "POST",
    url: "/v2/bank_account_details/update_pan",
    payload: {
      account_holder_name,
      pan_number,
    },
  });
}

export async function getStaticPages({}) {
  return await makeRequest({
    method: "GET",
    url: "/v1/static_pages",
  });
}

export async function getStaticMeta({}) {
  return await makeRequest({
    method: "GET",
    url: "/v1/static_meta",
  });
}

export async function getBank({ ifsc_code }) {
  return await makeRequest({
    baseURL: "https://ifsc.razorpay.com",
    method: "GET",
    url: `/${ifsc_code}`,
  });
}

export async function getTickets({ page_number }) {
  return await makeRequest({
    method: "GET",
    url: "/v1/tickets",
    payload: { page_number },
  });
}

export async function createTicket({ object_type, object_id, title }) {
  return await makeRequest({
    method: "POST",
    url: "/v1/tickets",
    payload: { object_type, object_id, title },
  });
}

export async function createConversation({ ticket_id, message, documents }) {
  let formData = new FormData();

  documents.map(async (document) => formData.append("documents[]", document));
  formData.append("ticket_id", ticket_id);
  formData.append("message", message);

  return await makeRequest({
    method: "POST",
    url: "/v1/conversations",
    data: formData,
    customHeaders: { "Content-Type": "multipart/form-data" },
    transformRequest: (data) => data,
  });
}

export async function getConversations({ ticket_id, page_number }) {
  return await makeRequest({
    method: "GET",
    url: "/v1/conversations",
    payload: { ticket_id, page_number },
  });
}
