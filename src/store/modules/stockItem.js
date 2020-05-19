import axios from 'axios';
/* eslint no-shadow: ["error", { "allow": ["state"] }] */

const ListAllItemsURL = 'http://127.0.0.1:5000/api/stock_items/';
const ListItemsByClientOrderURL = 'http://127.0.0.1:5000/api/stock_items/client_order/';

const state = {
  listStockItems: [],
  deleteListItems: [],
  isNewStockItem: true,
};
const getters = {
  GET_LIST_STOCK_ITEMS: (state) => state.listStockItems,
  GET_TEST_LIST: (state) => state.testList,
};
const mutations = {
  SET_LIST_STOCK_ITEMS: (state, payload) => {
    state.listStockItems = payload;
  },
  ADD_ITEM_TO_LIST_STOCK_ITEMS: (state, payload) => {
    state.listStockItems.push(payload);
  },
  MOVE_ITEM_TO_DELETE_LIST: (state, payload) => {
    state.deleteListItems.push(payload);
    state.listStockItems.splice(payload.id, 1);
  },
  SET_IS_NEW_STOCK_ITEM: (state, payload) => {
    state.isNewStockItem = payload;
  },
};
const actions = {
  SAVE_TO_LIST_ITEMS: (context, data) => {
    console.info(context);
    console.info(data);
    context.commit('ADD_TO_TEST_LIST', data);
  },
  RESET_LIST_ITEMS: (context) => {
    context.commit('SET_LIST_STOCK_ITEMS', []);
  },
  GET_ALL_STOCK_ITEMS: async (context) => {
    const { data } = await axios.get(ListAllItemsURL);
    context.commit('SET_LIST_STOCK_ITEMS', data);
  },
  GET_LIST_STOCK_ITEMS_CLIENT_ORDER: async (context, id) => {
    const requestData = { client_order: id };
    const { data } = await axios.post(ListItemsByClientOrderURL, requestData);
    context.commit('SET_LIST_STOCK_ITEMS', data);
  },
  SET_IS_NEW_STOCK_ITEM: (context, bool) => {
    context.commit('SET_IS_NEW_STOCK_ITEM', bool);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
