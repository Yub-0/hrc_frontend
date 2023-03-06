import user from '.'

export function SET_USER_DATA (state, { ...user }) {
  state.user = user
}
export function SET_USER_TOKEN (state, data) {
  state.auth = data
}

export function SET_BOOK_INFO (state, data) {
  state.book = data
}
