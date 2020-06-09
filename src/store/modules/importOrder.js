/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import axios from 'axios';
import _ from 'lodash';

const listImportOrderURL = 'http://127.0.0.1:5000/api/import_orders/';

const state = {
  empryImportOrder: {
    id: null,
    import_number: null,
    created: null,
    updated: null,
    KW: null,
    AB_num: null,
    AB_file: null,
    VAITEK_order: null,
    VAITEK_payment: null,
    bill: null,
    TTN: null,
    TRID: null,
    amount_place: 0,
    volume: 0,
    weight: 0,
    container_num: null,
    comment: null,
  },
  listImportOrders: [],
  singleImportOrder: {},
};
const getters = {
  GET_EMPTY_IMPORT_ORDER: (state) => state.empryImportOrder,
  GET_LIST_IMPORT_ORDERS: (state) => state.listImportOrders,
  GET_SINGLE_IMPORT_ORDER: (state) => state.singleImportOrder,
};
const mutations = {
  SET_LIST_IMPORT_ORDERS: (state, listImportOrders) => {
    state.listImportOrders = listImportOrders;
  },
  SET_SINGLE_IMPORT_ORDER: (state, payload) => {
    state.singleImportOrder = payload;
  },
};
const actions = {
  GET_LIST_IMPORT_ORDERS: async (context) => {
    const response = await axios.get(listImportOrderURL);
    context.commit('SET_LIST_IMPORT_ORDERS', response.data);
  },
  RESET_SINGLE_IMPORT_ORDER: async (context) => {
    const emptyImportOrder = await _.cloneDeep(context.getters.GET_EMPTY_IMPORT_ORDER);
    await context.commit('SET_SINGLE_IMPORT_ORDER', emptyImportOrder);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
