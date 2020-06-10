/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import axios from 'axios';

const stockItemExpURL = 'http://127.0.0.1:5000/api/stock_items/import/';

const state = {
  listStockItemsExp: [],
  isListExpanded: false,
};
const getters = {
  GET_LIST_STOCK_ITEMS_EXP: (state) => state.listStockItemsExp,
  GET_IS_LIST_EXPANDED: (state) => state.isListExpanded,
};
const mutations = {
  SET_LIST_STOCK_ITEMS_EXP: (state, payload) => {
    state.listStockItemsExp = payload;
  },
  SET_IS_LIST_EXPANDED: (state, payload) => {
    state.isListExpanded = payload;
  },
};
const actions = {
  GET_STOCK_ITEMS_EXP: async (context) => {
    const stockItemExp = await axios.get(stockItemExpURL);
    context.commit('SET_LIST_STOCK_ITEMS_EXP', stockItemExp.data);
  },
  SET_IS_LIST_EXPANDED: async (context, bool) => {
    await context.commit('SET_IS_LIST_EXPANDED', bool);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
