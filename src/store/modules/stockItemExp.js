/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import axios from 'axios';
import _ from 'lodash';

const stockItemExpURL = 'http://127.0.0.1:5000/api/stock_items/import/';

const state = {
  emptyStockItemExp: {
    id: null,
    client_order: null,
    factory_item: null,
    import_order: null,
    incorrect_factory: null,
    is_correct: false,
    is_ordered: false,
    is_shipped: false,
    stock_choices: null,
    items_amount: null,
    last_price_ru: 0,
    current_price_ru: 0,
    last_price_eur: 0,
    current_price_eur: 0,
    created: null,
    comment: null,
    record_history: null,
    bank_euro_rate: 0,
    factory_price_eur: 0,
    factor: 0,
  },
  currentStockItem: {},
  listStockItemsExp: [],
  isListExpanded: false,
};
const getters = {
  GET_EMPTY_STOCK_ITEM_EXP: (state) => state.emptyStockItemExp,
  GET_LIST_STOCK_ITEMS_EXP: (state) => state.listStockItemsExp,
  GET_IS_LIST_EXPANDED: (state) => state.isListExpanded,
  GET_CURRENT_STOCK_ITEM_EXP: (state) => state.currentStockItem,
};
const mutations = {
  SET_LIST_STOCK_ITEMS_EXP: (state, payload) => {
    state.listStockItemsExp = payload;
  },
  SET_IS_LIST_EXPANDED: (state, payload) => {
    state.isListExpanded = payload;
  },
  SET_SINGLE_STOCK_ITEM: (state, payload) => {
    state.currentStockItem = payload;
  },
};
const actions = {
  RESET_STOCK_ITEM_EXP: async (context) => {
    const emptyStockItme = context.getters.GET_EMPTY_STOCK_ITEM_EXP;
    context.commit('SET_SINGE_STOCK_ITEM', emptyStockItme);
  },
  GET_STOCK_ITEMS_EXP: async (context) => {
    const stockItemExp = await axios.get(stockItemExpURL);
    context.commit('SET_LIST_STOCK_ITEMS_EXP', stockItemExp.data);
  },
  SET_IS_LIST_EXPANDED: async (context, bool) => {
    await context.commit('SET_IS_LIST_EXPANDED', bool);
  },
  SET_SINGLE_STOCK_ITEM_EXP: async (context, item) => {
    if (item.incorrect_factory.length === 0) {
      const copyCurrentStockItem = _.cloneDeep(item);
      context.commit('SET_SINGLE_STOCK_ITEM', copyCurrentStockItem);
    } else {
      const tmpItem = _.cloneDeep(item);
      const tmpIncorrectFactory = item.incorrect_factory;
      const [factory, collection, catalogueNumber] = tmpIncorrectFactory.split('&');
      tmpItem.factory_item = {
        catalogue_number: catalogueNumber,
        factory_collection: {
          name: collection,
          factory: {
            name: factory,
          },
        },
      };
      tmpItem.incorrect_factory = '';
      await context.commit('SET_SINGLE_STOCK_ITEM', tmpItem);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
