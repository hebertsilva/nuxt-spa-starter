export const state = () => ({
  detail: null
})

export const getters = {
  // empty
}

export const mutations = {
  updateUser (state, data) {
    state.detail = data
  }
}

export const actions = {
  test ({ commit, dispatch, rootState }, { payload, response, data }) {
    if (response.status === 200) {
      commit('updateUser', data)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
