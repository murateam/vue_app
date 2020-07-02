/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import axios from 'axios';
import _ from 'lodash';

const importOrderURL = 'http://127.0.0.1:5000/api/import_orders/';
const saveNewImportOrderURL = 'http://127.0.0.1:5000/api/import_orders/save_new/';

const state = {
  empryImportOrder: {
    id: null,
    status: 'processing',
    import_user: null,
    import_number: null,
    created: null,
    updated: null,
    KW: '',
    AB_num: '',
    AB_file: null,
    VAITEK_order: '',
    VAITEK_payment: null,
    bill: null,
    TTN: null,
    TRID: '',
    amount_place: 0,
    volume: 0,
    weight: 0,
    container_num: '',
    comment: '',
  },
  listImportOrders: [],
  singleImportOrder: {},
  choosingImportOrderThroughModal: false,
};
const getters = {
  GET_EMPTY_IMPORT_ORDER: (state) => state.empryImportOrder,
  GET_LIST_IMPORT_ORDERS: (state) => state.listImportOrders,
  GET_SINGLE_IMPORT_ORDER: (state) => state.singleImportOrder,
  GET_BOOL_CHOOSING_IMPORT_ORDERS: (state) => state.choosingImportOrderThroughModal,
};
const mutations = {
  SET_BOOL_CHOOSING_IMPORT_ORDERS: (state, payload) => {
    state.choosingImportOrderThroughModal = payload;
  },
  SET_LIST_IMPORT_ORDERS: (state, listImportOrders) => {
    state.listImportOrders = listImportOrders;
  },
  SET_SINGLE_IMPORT_ORDER: (state, payload) => {
    state.singleImportOrder = payload;
  },
  ADD_IMPORT_ORDER_TO_LIST: (state, payload) => {
    state.listImportOrders.push(payload);
  },
};
const actions = {
  SET_BOOL_CHOOSING_IMPORT_ORDERS: async (context, bool) => {
    await context.commit('SET_BOOL_CHOOSING_IMPORT_ORDERS', bool);
  },
  RESET_SINGLE_IMPORT_ORDER: async (context) => {
    const emptyImportOrder = await _.cloneDeep(context.getters.GET_EMPTY_IMPORT_ORDER);
    context.commit('SET_SINGLE_IMPORT_ORDER', emptyImportOrder);
  },
  GET_LIST_IMPORT_ORDERS: async (context) => {
    const response = await axios.get(importOrderURL);
    context.commit('SET_LIST_IMPORT_ORDERS', response.data);
  },
  SET_SINGLE_IMPORT_ORDER: (context, item) => {
    context.commit('SET_SINGLE_IMPORT_ORDER', item);
  },
  SAVE_NEW_IMPORT_ORDER: async (context) => {
    const order = context.getters.GET_EMPTY_IMPORT_ORDER;
    const author = context.getters.GET_AUTHOR;
    order.import_user = author;
    const newImportOrder = await axios.post(saveNewImportOrderURL, order);
    await context.dispatch('GET_LIST_IMPORT_ORDERS');
    await context.commit('SET_SINGLE_IMPORT_ORDER', newImportOrder.data);
    await context.commit('ADD_IMPORT_ORDER_TO_LIST', newImportOrder.data);
  },
  SAVE_EXIST_IMPORT_ORDER: async (context) => {
    const importOrder = await context.getters.GET_SINGLE_IMPORT_ORDER;
    if (importOrder.id != null) {
      importOrder.AB_file = null;
      importOrder.TTN = null;
      importOrder.VAITEK_payment = null;
      importOrder.bill = null;
      const importOrderResponse = await axios.put(importOrderURL + importOrder.id, importOrder);
      console.log(importOrderResponse);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
