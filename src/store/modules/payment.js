/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import axios from 'axios';
import _ from 'lodash';

const PaymentsURL = 'http://127.0.0.1:5000/api/payments/';
const PaymentsForClientOrderURL = 'http://127.0.0.1:5000/api/payments_for_order/';

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
  SET_LIST_PAYMENTS: (state, payload) => {
    state.listPayments = payload;
  },
  ADD_PAYMENT_TO_LIST_PAYMENTS: (state, payment) => {
    state.listPayments.push(payment);
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
  SAVE_PAYMENT_FROM_CLIENT_ORDER: (context) => {
    console.log(context);
  },
  SAVE_NEW_PAYMENT: async (context) => {
    const payment = context.getters.GET_SINGLE_PAYMENT;
    const newPayment = await axios.post(PaymentsURL, payment);
    await context.commit('ADD_PAYMENT_TO_LIST_PAYMENTS', newPayment.data);
    await context.dispatch('CALC_AND_SAVE_TOTAL_PAYMENTS');
  },
  GET_LIST_PAYMENTS_FOR_CLIENT_ORDER: async (context, clientOrder) => {
    const listPayments = await axios.get(PaymentsForClientOrderURL + clientOrder[0].id);
    // console.log(listPayments);
    context.commit('SET_LIST_PAYMENTS', listPayments.data);
  },
  CALC_AND_SAVE_TOTAL_PAYMENTS: (context) => {
    const listPayments = context.getters.GET_LIST_PAYMENTS;
    const singleClientOrder = context.getters.GET_SINGLE_CLIENT_ORDER;
    // console.log(listPayments);
    const inValue = 0;
    const sum = listPayments.reduce(
      (accum, item) => accum + item.payment_value, inValue,
    );
    singleClientOrder.total_payment = sum;
    // console.log(singleClientOrder);
    context.dispatch('SAVE_CLIENT_ORDER', singleClientOrder);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
