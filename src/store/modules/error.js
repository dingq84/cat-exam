const state = () => ({
  code: "",
  message: "",
});

const mutations = {
  UPDATE_ERROR(state, payload) {
    state.code = payload.code;
    state.message = payload.message;
  },
  RESET_ERROR(state) {
    state.code = "";
    state.message = "";
  },
};

const actions = {
  updateError({ commit }, payload) {
    commit("UPDATE_ERROR", payload);
  },
  resetError({ commit }) {
    commit("RESET_ERROR");
  },
};

const getters = {
  isError: (state) => Boolean(state.code) || Boolean(state.message),
  code: (state) => state.code,
  message: (state) => state.message,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
