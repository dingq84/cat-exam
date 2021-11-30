import Vue from "vue";
import Vuex from "vuex";

import error from "./modules/error";
import loading from "./modules/loading";
import i18n from "./modules/i18n";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    i18n,
    error,
    loading,
  },
});
