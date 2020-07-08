/* eslint no-shadow: ["error", { "allow": ["state"] }] */
const state = {
  navClassChoices: {
    home: 'home',
    project: 'project',
  },
  depth: 0,
  currentNavClass: 'home',
};
const getters = {
  GET_CHOICES: (state) => state.navClassChoices,
  GET_NAV: (state) => state.currentNavClass,
  GET_DEPTH: (state) => state.depth,
};
const mutations = {
  SET_NAV: (state, payload) => {
    state.currentNavClass = payload;
  },
  SET_DEPTH: (state, payload) => {
    state.depth = payload;
  },
};
const actions = {
  DEPTH_INCREASE: (context) => {
    const newDepth = context.getters.GET_DEPTH + 1;
    context.commit('SET_DEPTH', newDepth);
  },
  DEPTH_DECREASE: (context) => {
    let depth = context.getters.GET_DEPTH;
    if (depth > 0) {
      depth -= 1;
    }
    context.commit('SET_DEPTH', depth);
  },
  DEPTH_RESET: (context) => {
    context.commit('SET_DEPTH', 0);
  },
  SET_CURRENT_NAV_CLASS: (context, newClass) => {
    const choices = context.getters.GET_CHOICES;
    const correctClass = choices[newClass];
    console.log(correctClass);
    context.commit('SET_NAV', correctClass);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
