/* eslint no-shadow: ["error", { "allow": ["state"] }] */
// import axios from 'axios';
import _ from 'lodash';

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
  SET_SINGLE_PAYMENT: (state, emptyPayment) => {
    state.singlePayment = emptyPayment;
  },
  SET_IS_NEW_PAYMENT: (state, bool) => {
    state.isNewPayment = bool;
  },
};
const actions = {
  RESET_SINGLE_PAYMENT: async (context) => {
    const emptyPayment = await _.cloneDeep(context.getters.GET_EMPTY_PAYMENT);
    await context.commit('SET_SINGLE_PAYMENT', emptyPayment);
  },
  SET_NEW_PAYMENT_FOR_CLIENT_ORDER: async (context) => {
    const emptyPayment = await _.cloneDeep(context.getters.GET_EMPTY_PAYMENT);
    const currentClientOrder = await context.getters.GET_SINGLE_CLIENT_ORDER;
    emptyPayment.client_order = currentClientOrder.id;
    await context.commit('SET_SINGLE_PAYMENT', emptyPayment);
    // console.log(emptyPayment);
    // console.log(currentClientOrder);
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
