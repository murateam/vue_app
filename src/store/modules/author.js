/* eslint no-shadow: ["error", { "allow": ["state"] }] */

const state = {
  choicesRole: {
    anonymous: 0,
    supervisor: 1,
    seller: 2,
    accountant: 3,
    import: 4,
  },
  author: -1,
};
const getters = {
  GET_AUTHOR: (state) => state.author,
  GET_ROLE: (state) => state.choicesRole,
};
const mutations = {
  SET_AUTHOR: (state, payload) => {
    state.author = payload;
  },
};
const actions = {
  SET_AUTHOR: async (context, role) => {
    const roles = context.getters.GET_ROLE;
    const author = roles[role];
    if (roles[role] === 4) {
      context.dispatch('GET_BANK_EUR_RATE');
    }
    await context.commit('SET_AUTHOR', author);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
