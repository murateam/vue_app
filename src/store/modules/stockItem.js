import axios from 'axios';
/* eslint no-shadow: ["error", { "allow": ["state"] }] */

const ListAllItemsURL = 'http://127.0.0.1:5000/api/stock_items/';
const ListItemsByClientOrderURL = 'http://127.0.0.1:5000/api/stock_items/client_order/';

const state = {
  itemsList: [],
};
const getters = {
  GET_LIST_ITEMS: (state) => state.itemsList,
};
const mutations = {
  SET_LIST_ITEMS: (state, payload) => {
    state.itemsList = payload;
  },
};
const actions = {
  GET_ALL_ITEMS: async (context) => {
    const { data } = await axios.get(ListAllItemsURL);
    context.commit('SET_LIST_ITEMS', data);
  },
  GET_ORDER_ITEMS: async (context, id) => {
    const requestData = { client_order: id };
    const { data } = await axios.post(ListItemsByClientOrderURL, requestData);
    context.commit('SET_LIST_ITEMS', data);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
