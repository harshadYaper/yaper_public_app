import { getData, putData } from "../storage";

export default async function saveData({ dispatch, user }) {
  let expire_at = Date.now() + 1000 * 60 * 60 * 24;

  let token_payload = !user.token
    ? { ...(await getData("TOKEN")), expire_at }
    : {
        token: user.token,
        expire_at,
      };

  await putData("USER", user);
  await putData("TOKEN", token_payload);

  dispatch({ type: "USER", payload: user });
  dispatch({
    type: "TOKEN",
    payload: token_payload,
  });
}
