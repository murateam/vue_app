/* eslint no-shadow: ["error", { "allow": ["state"] }] */
const state = {
  successClientOrderMessCountDown: 0,
  unSuccessClientOrderMessCountDown: 0,
};
const getters = {
  GET_SUCCESS_MESSAGE_COUNT_DOWN: (state) => state.successClientOrderMessCountDown,
  GET_UNSUCCESS_MESSAGE_COUNT_DOWN: (state) => state.unSuccessClientOrderMessCountDown,
};
const mutations = {
  SET_COUNT_FOR_SUCCESS_OF_CLIENT_ORDER: (state, payload) => {
    state.successClientOrderMessCountDown = payload;
  },
  SET_COUNT_FOR_UNSUCCESS_OF_CLIENT_ORDER: (state, payload) => {
    state.unSuccessClientOrderMessCountDown = payload;
  },
};
const actions = {
  SET_COUNT_FOR_SUCCESS_OF_CLIENT_ORDER: (context, seconds) => {
    context.commit('SET_COUNT_FOR_SUCCESS_OF_CLIENT_ORDER', seconds);
  },
  SET_COUNT_FOR_UNSUCCESS_OF_CLIENT_ORDER: (context, seconds) => {
    context.commit('SET_COUNT_FOR_UNSUCCESS_OF_CLIENT_ORDER', seconds);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
