export function storetoken ({ commit }, data) {
  commit('SET_USER_TOKEN', data)
}

export function storebook ({ commit }, data) {
  commit('SET_BOOK_INFO', data)
}
