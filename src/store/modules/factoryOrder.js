/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import axios from 'axios';
import _ from 'lodash';

const backendURL = process.env.VUE_APP_BACKEND_URL;
const importOrderURL = 'api/import_orders/';
const saveNewImportOrderURL = 'api/import_orders/save_new/';

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
  averageFactor: 0,
  allowedStatus: '',
};
const getters = {
  GET_EMPTY_IMPORT_ORDER: (state) => state.empryImportOrder,
  GET_LIST_IMPORT_ORDERS: (state) => state.listImportOrders,
  GET_SINGLE_IMPORT_ORDER: (state) => state.singleImportOrder,
  GET_BOOL_CHOOSING_IMPORT_ORDERS: (state) => state.choosingImportOrderThroughModal,
  GET_AVERAGE_FACTOR: (state) => state.averageFactor,
  GET_ALLOWED_STATUS: (state) => state.allowedStatus,
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
  SET_AVERAGE_FACTOR: (state, payload) => {
    state.averageFactor = payload;
  },
  CHANGE_IMPORT_ORDER_IN_LIST: async (state, item) => {
    const arrBefore = state.listImportOrders;
    const arrTmp = [];
    arrTmp.push(item);
    const arrFinal = arrBefore.map((obj) => arrTmp.find((o) => o.id === obj.id) || obj);
    state.listImportOrders = arrFinal;
  },
  SET_ALLOWED_STATUS: (state, payload) => {
    state.allowedStatus = payload;
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
    const response = await axios.get(backendURL + importOrderURL);
    context.commit('SET_LIST_IMPORT_ORDERS', response.data);
  },
  SET_SINGLE_IMPORT_ORDER: (context, item) => {
    context.commit('SET_SINGLE_IMPORT_ORDER', item);
  },
  SAVE_NEW_IMPORT_ORDER: async (context) => {
    const order = context.getters.GET_EMPTY_IMPORT_ORDER;
    const author = context.getters.GET_AUTHOR;
    order.import_user = author;
    const newImportOrder = await axios.post(
      backendURL + saveNewImportOrderURL, order,
    );
    await context.dispatch('GET_LIST_IMPORT_ORDERS');
    await context.commit('SET_SINGLE_IMPORT_ORDER', newImportOrder.data);
    await context.commit('ADD_IMPORT_ORDER_TO_LIST', newImportOrder.data);
  },
  SAVE_EXIST_IMPORT_ORDER: async (context, status) => {
    const importOrder = await context.getters.GET_SINGLE_IMPORT_ORDER;
    if (importOrder.id != null) {
      importOrder.status = status;
      importOrder.AB_file = null;
      importOrder.TTN = null;
      importOrder.VAITEK_payment = null;
      importOrder.bill = null;
      const importOrderResponse = await axios.put(
        backendURL + importOrderURL + importOrder.id, importOrder,
      );
      context.commit('CHANGE_IMPORT_ORDER_IN_LIST', importOrderResponse.data);
    }
  },
  CALC_AVARAGE_FACTOR_FOR_IMPORT_ORDER: (context) => {
    const listStockItems = context.getters.GET_LIST_STOCK_ITEMS_EXP_FOR_IMPORT_ORDER;
    const sum = listStockItems.reduce((accum, item) => accum + item.factor, 0);
    const average = sum / listStockItems.length;
    context.commit('SET_AVERAGE_FACTOR', average.toFixed(2));
  },
  CHECK_STATUS_IMPORT_ORDER: async (context) => {
    await context.commit('SET_ALLOWED_STATUS', 'processing');
    const currentImportOrder = await context.getters.GET_SINGLE_IMPORT_ORDER;
    const listStockItems = await context.getters.GET_LIST_STOCK_ITEMS_EXP_FOR_IMPORT_ORDER;
    const checkItemsFactor = (items) => {
      const listLength = items.length;
      let result = true;
      for (let i = 0; i < listLength; i += 1) {
        if (items[i].factor < 2.5) {
          result = false;
        }
      }
      return result;
    };
    if (
      currentImportOrder.status === 'processing'
      && listStockItems.length !== 0
      && checkItemsFactor(listStockItems)) {
      await context.commit('SET_ALLOWED_STATUS', 'order to factory');
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
