import axios from 'axios';
/* eslint no-shadow: ["error", { "allow": ["state"] }] */

const ListAllItemsURL = 'http://127.0.0.1:5000/api/stock_items/';
const ListItemsByClientOrderURL = 'http://127.0.0.1:5000/api/stock_items/client_order/';

const state = {
  listItems: [],
};
const getters = {
  GET_LIST_ITEMS: (state) => state.listItems,
};
const mutations = {
  SET_LIST_ITEMS: (state, payload) => {
    state.listItems = payload;
  },
};
const actions = {
  GET_ALL_ITEMS: async (context) => {
    const { data } = await axios.get(ListAllItemsURL);
    context.commit('SET_LIST_ITEMS', data);
  },
  RESET_LIST_ITEMS: (context) => {
    context.commit('SET_LIST_ITEMS', []);
  },
  GET_LIST_ITEMS_CLIENT_ORDER: async (context, id) => {
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
