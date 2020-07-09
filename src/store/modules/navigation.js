/* eslint no-shadow: ["error", { "allow": ["state"] }] */
const state = {
  navClassChoices: {
    home: 'home',
    project: 'project',
  },
  depth: 1,
  currentNavClass: 'home',
  cameFrom: '/',
  needMoveUp: false,
};
const getters = {
  GET_CHOICES: (state) => state.navClassChoices,
  GET_NAV: (state) => state.currentNavClass,
  GET_DEPTH: (state) => state.depth,
  GET_CAME_FROM: (state) => state.cameFrom,
  GET_NEED_MOVE_UP: (state) => state.needMoveUp,
};
const mutations = {
  SET_NAV: (state, payload) => {
    state.currentNavClass = payload;
  },
  SET_DEPTH: (state, payload) => {
    state.depth = payload;
  },
  SET_CAME_FROM: (state, payload) => {
    state.cameFrom = payload;
  },
  SET_NEED_MOVE_UP: (state, payload) => {
    state.needMoveUp = payload;
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
  SET_CAME_FROM: (context, adr) => {
    context.commit('SET_CAME_FROM', adr);
  },
  SET_NEED_MOVE_UP: (context, bool) => {
    context.commit('SET_NEED_MOVE_UP', bool);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
