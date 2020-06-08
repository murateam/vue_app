/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import axios from 'axios';

const listImportOrderURL = 'http://127.0.0.1:5000/api/import_orders/';

const state = {
  listImportOrders: [],
};
const getters = {
  GET_LIST_IMPORT_ORDERS: (state) => state.listImportOrders,
};
const mutations = {
  SET_LIST_IMPORT_ORDERS: (state, listImportOrders) => {
    state.listImportOrders = listImportOrders;
  },
};
const actions = {
  GET_LIST_IMPORT_ORDERS: async (context) => {
    const response = await axios.get(listImportOrderURL);
    context.commit('SET_LIST_IMPORT_ORDERS', response.data);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
