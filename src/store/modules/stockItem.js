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
      public_num: null,
      author: null,
      client: null,
      state: 'draft',
      status: 'calculate',
    },
    factory_item: {
      id: null,
      catalogue_number: '',
      factory_collection: {
        id: null,
        name: '',
        factory: {
          id: null,
          name: '',
        },
        is_made: true,
      },
    },
    import_order: null,
    incorrect_factory: '',
    is_correct: false,
    is_ordered: false,
    is_shipped: false,
    stock_choices: 'cencel',
    items_amount: 0,
    last_price_ru: 0,
    current_price_ru: 0,
    last_price_eur: 0,
    current_price_eur: 0,
    comment: '',
  },
  currentStockItem: {},
  listStockItems: [],
  deleteListItems: [],
  incorrect_factory: {
    factory: '',
    factory_collections: '',
    catalogue_number: '',
  },
  isNewStockItem: true,
};
const getters = {
  GET_LIST_STOCK_ITEMS: (state) => state.listStockItems,
  GET_LIST_DELETE_STOCK_ITEMS: (state) => state.deleteListItems,
  GET_CURRENT_STOCK_ITEM: (state) => state.currentStockItem,
  GET_EMPTY_STOCK_ITEM: (state) => state.emptyStockItem,
  GET_IS_NEW_STOCK_ITEM: (state) => state.isNewStockItem,
};
const mutations = {
  SET_LIST_STOCK_ITEMS: (state, payload) => {
    state.listStockItems = payload;
  },
  SET_CURRENT_STOCK_ITEM: (state, payload) => {
    state.currentStockItem = payload;
  },
  ADD_ITEM_TO_LIST_STOCK_ITEMS: (state, payload) => {
    state.listStockItems.push(payload);
  },
  MOVE_ITEM_TO_DELETE_LIST: (state, index) => {
    state.deleteListItems.push(state.listStockItems[index]);
    state.listStockItems.splice(index, 1);
  },
  SET_IS_NEW_STOCK_ITEM: (state, payload) => {
    state.isNewStockItem = payload;
  },
  CHANGE_STOCK_ITEM_IN_LIST: async (state) => {
    const changedStockItem = await _.cloneDeep(state.currentStockItem);
    const arrBefore = state.listStockItems;
    const arrTmp = [];
    arrTmp.push(changedStockItem);
    const arrFinal = arrBefore.map((obj) => arrTmp.find((o) => o.id === obj.id) || obj);
    state.listStockItems = arrFinal;
  },
};
const actions = {
  SET_EMPTY_STOCK_ITEM: (context) => {
    const emptyStockItem = _.cloneDeep(context.getters.GET_EMPTY_STOCK_ITEM);
    context.commit('SET_CURRENT_STOCK_ITEM', emptyStockItem);
  },
  SET_CURRENT_STOCK_ITEM_BY_INDEX: async (context, index) => {
    // context.commit('SET_INDEX_FOR_CURRENT_STOCK_ITEM', index);
    if (context.state.listStockItems[index].id === null) {
      const copyCurrentStockItem = _.cloneDeep(context.state.listStockItems[index]);
      context.commit('SET_CURRENT_STOCK_ITEM', copyCurrentStockItem);
    } else if (context.state.listStockItems[index].incorrect_factory.length === 0) {
      const copyCurrentStockItem = _.cloneDeep(context.state.listStockItems[index]);
      context.commit('SET_CURRENT_STOCK_ITEM', copyCurrentStockItem);
    } else {
      const tmpItem = _.cloneDeep(context.state.listStockItems[index]);
      const tmpIncorrectFactory = context.state.listStockItems[index].incorrect_factory;
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
      await context.commit('SET_CURRENT_STOCK_ITEM', tmpItem);
    }
  },
  ADD_ITEM_TO_LIST_STOCK_ITEMS: (context) => {
    const data = _.cloneDeep(context.getters.GET_CURRENT_STOCK_ITEM);
    context.commit('ADD_ITEM_TO_LIST_STOCK_ITEMS', data);
  },
  MOVE_ITEM_TO_DELETE_LIST: (context, index) => {
    context.commit('MOVE_ITEM_TO_DELETE_LIST', index);
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
    // context.dispatch('CALCULATE_PRICE_OF_CLIENT_ORDER');
  },
  SET_IS_NEW_STOCK_ITEM: (context, bool) => {
    // console.log(bool);
    context.commit('SET_IS_NEW_STOCK_ITEM', bool);
  },
  CHANGE_STOCK_ITEM: (context) => {
    context.commit('CHANGE_STOCK_ITEM_IN_LIST');
  },
  SAVE_STOCK_ITEM_FROM_CLIENT_ORDER: async (context, clientOrder) => {
    const listItems = context.getters.GET_LIST_STOCK_ITEMS;
    const listDelete = context.getters.GET_LIST_DELETE_STOCK_ITEMS;
    const requestData = [];
    requestData.push({ value: clientOrder.id });
    requestData.push({ value: listItems });
    requestData.push({ value: listDelete });
    // itemList.forEach((element) => {
    //   console.log(element);
    // });
    await axios.post(SaveStockItemsFromClientOrderURL, requestData).then((response) => {
      if (response.status === 200) {
        context.commit('SET_COUNT_FOR_SUCCESS_OF_CLIENT_ORDER', 3);
      } else {
        context.commit('SET_COUNT_FOR_UNSUCCESS_OF_CLIENT_ORDER', 3);
      }
      context.commit('SET_LIST_STOCK_ITEMS', response.data);
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
