/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import axios from 'axios';

const stockItemExpURL = 'http://127.0.0.1:5000/api/stock_items/import/';

const state = {
  listStockItemsExp: [],
};
const getters = {
  GET_LIST_STOCK_ITEMS_EXP: (state) => state.listStockItemsExp,
};
const mutations = {
  SET_LIST_STOCK_ITEMS_EXP: (state, payload) => {
    state.listStockItemsExp = payload;
  },
};
const actions = {
  GET_STOCK_ITEMS_EXP: async (context) => {
    const stockItemExp = await axios.get(stockItemExpURL);
    context.commit('SET_LIST_STOCK_ITEMS_EXP', stockItemExp.data);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
