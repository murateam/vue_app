/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import axios from 'axios';
import _ from 'lodash';

const PaymentsURL = 'http://127.0.0.1:5000/api/payments/';
const PaymentsSaveURL = 'http://127.0.0.1:5000/api/payments/save/';
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
  CHANGE_PAYMENT_IN_LIST: async (state, changedPayment) => {
    const arrBefore = state.listPayments;
    const arrTmp = [];
    arrTmp.push(changedPayment);
    const arrFinal = arrBefore.map((obj) => arrTmp.find((o) => o.id === obj.id) || obj);
    state.listPayments = arrFinal;
  },
  DELETE_PAYMENT_FROM_LIST: (state, index) => {
    state.listPayments.splice(index, 1);
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
  },
  SET_IS_NEW_PAYMENT: (context, bool) => {
    context.commit('SET_IS_NEW_PAYMENT', bool);
  },
  SAVE_PAYMENT: async (context, date) => {
    const payment = await context.getters.GET_SINGLE_PAYMENT;
    payment.payment_date = date;
    const savedPayment = await axios.post(PaymentsSaveURL, payment);
    if (context.getters.GET_IS_NEW_PAYMENT === true) {
      await context.commit('ADD_PAYMENT_TO_LIST_PAYMENTS', savedPayment.data);
    } else {
      await context.commit('CHANGE_PAYMENT_IN_LIST', savedPayment.data);
    }
    await context.dispatch('CALC_AND_SAVE_TOTAL_PAYMENTS');
  },
  GET_LIST_PAYMENTS_FOR_CLIENT_ORDER: async (context, clientOrder) => {
    const listPayments = await axios.get(PaymentsForClientOrderURL + clientOrder[0].id);
    context.commit('SET_LIST_PAYMENTS', listPayments.data);
  },
  CALC_AND_SAVE_TOTAL_PAYMENTS: (context) => {
    const listPayments = context.getters.GET_LIST_PAYMENTS;
    const singleClientOrder = context.getters.GET_SINGLE_CLIENT_ORDER;
    const inValue = 0;
    const sum = listPayments.reduce(
      (accum, item) => accum + item.payment_value, inValue,
    );
    if (singleClientOrder.price === 0) {
      singleClientOrder.payment_status = 'waiting for payment';
    } else if (sum < singleClientOrder.price / 2) {
      singleClientOrder.payment_status = 'waiting for payment';
    } else if (sum === singleClientOrder.price) {
      singleClientOrder.payment_status = 'paid';
    } else {
      singleClientOrder.payment_status = 'partially paid';
    }
    singleClientOrder.total_payment = sum;
    console.log(singleClientOrder);
    context.dispatch('SAVE_CLIENT_ORDER', singleClientOrder);
  },
  SET_CURRENT_PAYMENT_BY_INDEX: async (context, index) => {
    const copyPayment = _.cloneDeep(context.state.listPayments[index]);
    context.commit('SET_SINGLE_PAYMENT', copyPayment);
  },
  DELETE_PAYMENT: async (context, index) => {
    const paymentToDelete = _.cloneDeep(context.state.listPayments[index]);
    const response = await axios.delete(PaymentsURL + paymentToDelete.id);
    if (response.status === 204) {
      await context.commit('DELETE_PAYMENT_FROM_LIST', index);
      context.dispatch('CALC_AND_SAVE_TOTAL_PAYMENTS');
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
