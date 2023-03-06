import { LOGIN } from "./index";
import axios from "axios";
import { Store } from "../../../store/index.js";

export function postLogin(credential) {
  return axios.post(LOGIN, credential);
}

export function getMe() {
  return axios.get(ME, {
    headers: { Authorization: `Bearer ${Store.state.user.auth.access}` }
  });
}

// export function postResetPassword(payload = {}) {
//   return axios.post(RESET_PASSWORD, payload);
// }

// export function postchangePassword(payload = {}) {
//   return axios.post(CHANGE_PASSWORD, payload);
// }

// export function refreshAccessToken(refresh_token) {
//   return axios.post(API.REFRESH, refresh_token);
// }
