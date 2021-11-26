import Vue from "vue";
import Vuex from "vuex";

import error from "./modules/error";
import loading from "./modules/loading";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    error,
    loading,
  },
});
