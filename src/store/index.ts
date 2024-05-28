import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      user: null
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    setUser({ commit }, user) {
      commit('setUser', user)
    },
    removeUser({ commit }) {
      commit('setUser', null)
    }
  },
  getters: {
    user: (state) => state.user
  }
})

export default store
