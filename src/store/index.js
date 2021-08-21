import Vue from 'vue';
import Vuex from 'vuex';
import { userConf } from "./modules/userConf";

Vue.use(Vuex)
import createPersistedState from 'vuex-persistedstate'


export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      userConf
    },
    plugins: [createPersistedState({
      key: "arvanCloudTest"
    })],
    strict: process.env.DEV
  })

  return Store
}
