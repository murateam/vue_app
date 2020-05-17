/* eslint no-shadow: ["error", { "allow": ["state"] }] */

const state = {
  author: 1,
};
const getters = {
  GET_AUTHOR: (state) => state.author,
};
const mutations = {
  SET_AUTHOR: (state, payload) => {
    state.author = payload;
  },
};
const actions = {
  SET_AUTHOR: (context, data) => {
    context.commit('SET_AUTHOR', data);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
