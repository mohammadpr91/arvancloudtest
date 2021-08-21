import axios from 'axios';

export const userConf = {
  namespaced: true,
  state: {
    userName: null,
    email: null,
    token: null
  },
  mutations: {
    setUserName (state, payload) {
      state.userName = payload
    },
    setEmail (state, payload) {
      state.email = payload
    },
    setToken (state, payload) {
      state.token = payload
    },
    removeToken (state) {
      state.token = null;
      state.userName = null;
      state.email = null;
    },
  },
  actions: {
    logOut: ({ commit }) => {
      commit("removeToken");
    }
  }
};
  