/* eslint no-param-reassign: "error" */
import axios from 'axios';
import _ from 'lodash';

const clientOrdersListURL = 'http://127.0.0.1:5000/api/client_orders/';
const clientOrderAddURL = 'http://127.0.0.1:5000/api/client_order/add/';
const singleClientOrderURL = 'http://127.0.0.1:5000/api/client_orders/';
const clientOrderToImportURL = 'http://127.0.0.1:5000/api/client_order/to_import';


const state = {
  emptyClientOrder: {
    id: null,
    public_num: '',
    state: 'draft',
    status: '',
    payment_status: '',
    author: '',
    client: '',
    when_published: '',
    created: '',
    updated: '',
    eur_rate: 0,
    price: 0,
    total_payment: 0,
    designer: '',
    d_percent: 0,
    comment: '',
  },
  listClientOrders: [],
  singleClientOrder: {},
  canChangeClient: true,
  designerForModal: {},
};
const getters = {
  GET_EMPTY_CLIENT_ORDER: (state) => state.emptyClientOrder,
  GET_LIST_CLIENT_ORDERS: (state) => state.listClientOrders,
  GET_SINGLE_CLIENT_ORDER: (state) => state.singleClientOrder,
  GET_CAN_CHANGE_CLIENT: (state) => state.canChangeClient,
  GET_DESIGNER_FOR_MODAL: (state) => state.designerForModal,
  /* eslint no-shadow: ["error", { "allow": ["state"] }] */
};
const mutations = {
  ADD_CLIENT_ORDER: (state, payload) => {
    state.listClientOrders.push(payload);
  },
  CHANGE_CLIENT_ORDER: (state, payload) => {
    const objIndex = state.listClientOrders.findIndex(((obj) => obj.id === payload.id));
    state.listClientOrders[objIndex].client = payload.client;
    state.listClientOrders[objIndex].designer = payload.designer;
    state.listClientOrders[objIndex].d_percent = payload.d_percent;
    state.listClientOrders[objIndex].comment = payload.comment;
    state.listClientOrders[objIndex].state = payload.state;
    state.listClientOrders[objIndex].status = payload.status;
    state.listClientOrders[objIndex].payment_status = payload.payment_status;
  },
  SET_LIST_CLIENT_ORDERS: (state, payload) => {
    state.listClientOrders = payload;
  },
  SET_SINGLE_CLIENT_ORDER: (state, payload) => {
    state.singleClientOrder = payload;
  },
  SET_CAN_CHANGE_CLIENT: (state, payload) => {
    state.canChangeClient = payload;
  },
  SET_PRICE_FOR_CLIENT_ORDER: (state, payload) => {
    state.singleClientOrder.price = payload;
  },
  RESET_CLIENT_ORDER: (state, payload) => {
    state.singleClientOrder = payload;
  },
  SET_DESIGNER_FOR_MODAL: (state, payload) => {
    state.designerForModal = payload;
  },
  CHANGE_DESIGNER_IN_CLIENT_ORDER: (state, payload) => {
    state.singleClientOrder.designer = payload.designer;
    state.singleClientOrder.d_percent = payload.d_percent;
  },
};
const actions = {
  CALCULATE_PRICE_FOR_CLIENT_ORDER: async (context, ClientOrder) => {
    await context.dispatch('GET_SINGLE_CLIENT_ORDER', ClientOrder[0].id);
    const clientOrder = context.getters.GET_SINGLE_CLIENT_ORDER;
    await context.dispatch('GET_LIST_STOCK_ITEMS_CLIENT_ORDER', ClientOrder[0].id);
    const StockItems = context.getters.GET_LIST_STOCK_ITEMS;
    const listPriceAndAmount = StockItems.map((item) => item.current_price_eur * item.items_amount);
    const inValue = 0;
    let sum = listPriceAndAmount.reduce(
      (accum, item) => accum + item, inValue,
    );
    sum = sum * context.getters.GET_EUR_RATE.current_rate + clientOrder.d_percent;
    await context.commit('SET_PRICE_FOR_CLIENT_ORDER', sum);
  },
  GET_LIST_CLIENT_ORDERS: async (context) => {
    const { data } = await axios.get(clientOrdersListURL);
    context.commit('SET_LIST_CLIENT_ORDERS', data);
  },
  GET_SINGLE_CLIENT_ORDER: async (context, id) => {
    const { data } = await axios.get(singleClientOrderURL + id);
    if (data.state === 'published') {
      await context.dispatch('GET_SAVED_RATE', data.eur_rate);
    } else {
      await context.dispatch('GET_CURRENT_RATE');
    }
    await context.commit('SET_SINGLE_CLIENT_ORDER', data);
    await context.dispatch('GET_SINGLE_CLIENT', data.client);
  },
  SET_DESIGNER_FOR_MODAL: (context) => {
    const copyCurrentClientOrder = _.cloneDeep(context.getters.GET_SINGLE_CLIENT_ORDER);
    context.commit('SET_DESIGNER_FOR_MODAL', copyCurrentClientOrder);
  },
  SET_DESIGNER_WITH_CALC_PRICE: async (context) => {
    await context.dispatch('CHANGE_DESIGNER_IN_CLIENT_ORDER');
    await context.dispatch('CHANGE_STOCK_ITEMS_WITH_CALC_PRICE');
  //   const clientOrder = context.getters.GET_SINGLE_CLIENT_ORDER;
  //   const StockItems = context.getters.GET_LIST_STOCK_ITEMS;
  //   const listPriceAndAmount = StockItems.map(
  //     (item) => item.current_price_eur * item.items_amount);
  //   const inValue = 0;
  //   let sum = listPriceAndAmount.reduce(
  //     (accum, item) => accum + item, inValue,
  //   );
  //   sum = sum * context.getters.GET_EUR_RATE.current_rate + clientOrder.d_percent;
  //   await context.commit('SET_PRICE_FOR_CLIENT_ORDER', sum);
  },
  CHANGE_STOCK_ITEMS_WITH_CALC_PRICE: async (context) => {
    const clientOrder = context.getters.GET_SINGLE_CLIENT_ORDER;
    const StockItems = context.getters.GET_LIST_STOCK_ITEMS;
    const listPriceAndAmount = StockItems.map((item) => item.current_price_eur * item.items_amount);
    const inValue = 0;
    let sum = listPriceAndAmount.reduce(
      (accum, item) => accum + item, inValue,
    );
    sum = sum * context.getters.GET_EUR_RATE.current_rate + clientOrder.d_percent;
    await context.commit('SET_PRICE_FOR_CLIENT_ORDER', sum);
  },
  CHANGE_DESIGNER_IN_CLIENT_ORDER: async (context) => {
    const newDesigner = context.getters.GET_DESIGNER_FOR_MODAL;
    await context.commit('CHANGE_DESIGNER_IN_CLIENT_ORDER', newDesigner);
  },
  SAVE_CLIENT_ORDER: async (context, requestData) => {
    if (requestData.id) {
      const { data } = await axios.put(singleClientOrderURL + requestData.id, requestData);
      const response = await axios.get(`http://localhost:5000/api/client_orders/for_list/${data.id}`);
      await context.commit('CHANGE_CLIENT_ORDER', response.data);
      await context.dispatch('SAVE_STOCK_ITEM_FROM_CLIENT_ORDER', response.data);
    } else {
      const { data } = await axios.post(clientOrderAddURL, requestData);
      const response = await axios.get(`http://localhost:5000/api/client_orders/for_list/${data.id}`);
      await context.commit('ADD_CLIENT_ORDER', response.data);
      await context.dispatch('SAVE_STOCK_ITEM_FROM_CLIENT_ORDER', response.data);
    }
  },
  SET_CAN_CHANGE_CLIENT: (context, bool) => {
    context.commit('SET_CAN_CHANGE_CLIENT', bool);
  },
  RESET_CLIENT_ORDER: (context) => {
    const emptyClientOrder = _.cloneDeep(context.getters.GET_EMPTY_CLIENT_ORDER);
    context.commit('RESET_CLIENT_ORDER', emptyClientOrder);
  },
  TO_IMPORT: async (context, item) => {
    const idEurRate = await context.getters.GET_EUR_RATE;
    item.eur_rate = idEurRate.id;
    const { data } = await axios.post(clientOrderToImportURL, item);
    axios.get(`http://localhost:5000/api/client_orders/for_list/${data.id}`).then((response) => {
      context.commit('CHANGE_CLIENT_ORDER', response.data);
      // context.dispatch('SAVE_STOCK_ITEM_FROM_CLIENT_ORDER', response.data);
    });
  },
};
export default {
  state,
  getters,
  mutations,
  actions,
};
