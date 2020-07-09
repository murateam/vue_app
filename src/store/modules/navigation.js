/* eslint no-shadow: ["error", { "allow": ["state"] }] */
const state = {
  currentStep: '/',
};
const getters = {
  GET_CURRENT_STEP: (state) => state.currentStep,
  GET_BACK_STEP: (state) => {
    let whereGo = '';
    if (state.cameFrom === 'mainDemoProject') {
      whereGo = '/';
    } else if (state.cameFrom === '/manageTab') {
      whereGo = 'mainDemoProject';
    } else if (state.cameFrom === '/singleClientOrder') {
      whereGo = '/manageTab';
    }
    return whereGo;
  },
};
const mutations = {
  SET_CURRENT_STEP: (state, payload) => {
    state.cameFrom = payload;
  },
};
const actions = {
  SET_CURRENT_STEP: (context, adr) => {
    context.commit('SET_CURRENT_STEP', adr);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
