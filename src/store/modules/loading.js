const state = () => ({
  counter: 0,
});

const mutations = {
  ADD_COUNTER(state) {
    state.counter++;
  },
  SUB_COUNTER(state) {
    state.counter = Math.max(state.counter - 1, 0);
  },
};

const actions = {
  addCounter({ commit }) {
    commit("ADD_COUNTER");
  },
  subCounter({ commit }) {
    commit("SUB_COUNTER");
  },
};

const getters = {
  isLoading: (state) => state.counter > 0,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
