/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import axios from 'axios';

const listImportOrderURL = 'http://127.0.0.1:5000/api/import_orders/';

const state = {
  empryImportOrder: {
    id: 1,
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
    count_place: 0,
    volume: 0,
    wight: 0,
    container_num: null,
  },
  listImportOrders: [],
  currentImportOrder: {},
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
