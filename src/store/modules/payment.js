/* eslint no-shadow: ["error", { "allow": ["state"] }] */
// import axios from 'axios';

const state = {
  emptyPayment: {
    id: null,
    created: null,
    client_order: null,
    payment_date: null,
    payment_value: null,
    comment: null,
  },
  singlePayment: {},
  listPayments: [],
  isNewPayment: true,
};
const getters = {
  GET_SINGLE_PAYMENT: (state) => state.singlePayment,
  GET_EMPTY_PAYMENT: (state) => state.emptyPayment,
  GET_LIST_PAYMENTS: (state) => state.listPayments,
  GET_IS_NEW_PAYMENT: (state) => state.isNewPayment,
};
const mutations = {
  RESET_SINGLE_PAYMENT: (state, emptyPayment) => {
    state.singlePayment = emptyPayment;
  },
  SET_IS_NEW_PAYMENT: (state, bool) => {
    state.isNewPayment = bool;
  },
};
const actions = {
  RESET_SINGLE_PAYMENT: async (context) => {
    const emptyPayment = await context.getters.GET_EMPTY_PAYMENT;
    await context.commit('RESET_SINGLE_PAYMENT', emptyPayment);
  },
  SET_IS_NEW_PAYMENT: (context, bool) => {
    context.commit('SET_IS_NEW_PAYMENT', bool);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
