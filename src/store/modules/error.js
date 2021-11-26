const state = () => ({
  title: "",
  content: "",
  subtitle: "",
});

const mutations = {
  UPDATE_ERROR(state, payload) {
    state.title = payload.title;
    state.content = payload.content;
    state.subtitle = payload.subtitle;
  },
  RESET_ERROR(state) {
    state.title = "";
    state.content = "";
    state.subtitle = "";
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
  isError: (state) => Boolean(state.title) || Boolean(state.content),
  title: (state) => state.title,
  content: (state) => state.content,
  subtitle: (state) => state.subtitle,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
