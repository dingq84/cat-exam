const state = () => ({
  enums: {},
});

const mutations = {
  SET_I18N_ENUMS(state, payload) {
    state.enums = payload.data;
  },
  CLEAR_I18N_ENUMS(state) {
    state.enums = [];
  },
};

const actions = {
  setI18nEnums({ commit }, payload) {
    commit("SET_I18N_ENUMS", payload);
  },
  clearI18NEnums({ commit }) {
    commit("CLEAR_I18N_Enums");
  },
};

const getters = {
  i18nEnums: (state) => state.enums,
  i18nValue: (state) => (key) => state.enums[key] || "",
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
