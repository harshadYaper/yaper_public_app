const extract = (obj, type) => obj?.find((i) => i.type == type) || {};

export default function GetDetails(obj) {
  const { variant, store } = extract(obj, "product_details");
  const { title, bank, offer, deal_id } = extract(obj, "offer_details");
  const { items } = extract(obj, "earning_details");
  const { address } = extract(obj, "delivery_details");
  const {
    type,
    order_states,
    order_meta,
    fields,
    button,
    secondary_button,
    third_button,
  } = extract(obj, "order_details");

  const { logo, name, properties, color, color_code } = variant || {};

  return {
    store,
    title,
    bank,
    offer,
    items,
    deal_id,
    logo,
    name,
    properties,
    address,
    color,
    color_code,
    type,
    order_states,
    order_meta,
    fields,
    button,
    secondary_button,
    third_button,
  };
}
