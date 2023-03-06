
import { Store } from '../store/index.js'
export function getAuthHeader() {
  const access_token = Store.state.user.auth.access;

  if (access_token) {
    return { Authorization: "Bearer " + access_token };
  } else {
    return {};
  }
}

export function logout() {
  const data = {}
  Store.dispatch('user/storetoken', data)
}