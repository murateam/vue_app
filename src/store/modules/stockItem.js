import axios from 'axios';
import _ from 'lodash';
/* eslint no-shadow: ["error", { "allow": ["state"] }] */

const ListAllItemsURL = 'http://127.0.0.1:5000/api/stock_items/';
const ListItemsByClientOrderURL = 'http://127.0.0.1:5000/api/stock_items/client_order/';
const SaveStockItemsFromClientOrderURL = 'http://127.0.0.1:5000/api/stock_items/save_from_client_order/';

const state = {
  emptyStockItem: {
    id: null,
    client_order: {
      id: null,
      public_num: '',
      author: '',
      client: '',
      state: '',
      status: '',
    },
    factory_item: {
      id: '',
      catalogue_number: '',
      factory_collection: {
        id: '',
        name: '',
        factory: {
          id: '',
          name: '',
        },
        is_made: true,
      },
    },
    import_order: '',
    incorrect_factory: '',
    is_correct: false,
    is_ordered: false,
    is_shipped: false,
    stock_choices: '',
    items_amount: '',
    last_price_ru: '',
    current_price_ru: '',
    last_price_eur: '',
    current_price_eur: '',
    comment: '',
  },
  currentStockItem: {},
  listStockItems: [],
  deleteListItems: [],
  isNewStockItem: true,
};
const getters = {
  GET_LIST_STOCK_ITEMS: (state) => state.listStockItems,
  GET_DELETE_LIST_ITEMS: (state) => state.deleteListItems,
  GET_CURRENT_STOCK_ITEM: (state) => state.currentStockItem,
  GET_EMPTY_STOCK_ITEM: (state) => state.emptyStockItem,
};
const mutations = {
  SET_LIST_STOCK_ITEMS: (state, payload) => {
    state.listStockItems = payload;
  },
  SET_CURRENT_STOCK_ITEM: (state, payload) => {
    state.currentStockItem = payload;
  },
  SET_CURRENT_STOCK_ITEM_BY_INDEX: (state, index) => {
    state.currentStockItem = state.listStockItems[index];
  },
  ADD_ITEM_TO_LIST_STOCK_ITEMS: (state, payload) => {
    state.listStockItems.push(payload);
  },
  MOVE_ITEM_TO_DELETE_LIST: (state, item, index) => {
    state.deleteListItems.push(item);
    state.listStockItems.splice(index, 1);
  },
  SET_IS_NEW_STOCK_ITEM: (state, payload) => {
    state.isNewStockItem = payload;
  },
};
const actions = {
  SET_EMPTY_STOCK_ITEM: (context) => {
    const emptyStockItem = context.getters.GET_EMPTY_STOCK_ITEM;
    context.commit('SET_CURRENT_STOCK_ITEM', emptyStockItem);
  },
  SET_CURRENT_STOCK_ITEM_BY_INDEX: (context, index) => {
    context.commit('SET_CURRENT_STOCK_ITEM_BY_INDEX', index);
  },
  ADD_ITEM_TO_LIST_STOCK_ITEMS: (context) => {
    const data = _.cloneDeep(context.getters.GET_CURRENT_STOCK_ITEM);
    context.commit('ADD_ITEM_TO_LIST_STOCK_ITEMS', data);
  },
  MOVE_ITEM_TO_DELETE_LIST: (context, item, index) => {
    context.commit('MOVE_ITEM_TO_DELETE_LIST', item, index);
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
  SAVE_STOCK_ITEM_FROM_CLIENT_ORDER: (context) => {
    const itemList = context.getters.GET_LIST_STOCK_ITEMS;
    // itemList.forEach((element) => {
    //   console.log(element);
    // });
    axios.post(SaveStockItemsFromClientOrderURL, itemList);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
