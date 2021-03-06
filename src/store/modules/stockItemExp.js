/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import axios from 'axios';
import _ from 'lodash';

const backendURL = process.env.VUE_APP_BACKEND_URL;
const stockItemExpURL = 'api/stock_items/import/';
const listStockItemsForImportOrder = 'api/stock_items/import_order/';
const factoryItem = 'api/factories/';

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
  listStockItemsExpBeforeSave: [],
  listStockItemsExpForImportOrder: [],
  isListExpanded: false,
  choosingStockItemsThroughModal: false,
  isListUsedInImportOrder: false,
};
const getters = {
  GET_EMPTY_STOCK_ITEM_EXP: (state) => state.emptyStockItemExp,
  GET_LIST_STOCK_ITEMS_EXP: (state) => state.listStockItemsExp,
  GET_LIST_STOCK_ITEMS_BEFORE_SAVE: (state) => state.listStockItemsExpBeforeSave,
  GET_LIST_STOCK_ITEMS_EXP_FOR_IMPORT_ORDER: (state) => state.listStockItemsExpForImportOrder,
  GET_IS_LIST_EXPANDED: (state) => state.isListExpanded,
  GET_CURRENT_STOCK_ITEM_EXP: (state) => state.currentStockItem,
  GET_BOOL_CHOOSING_STOCK_ITEMS: (state) => state.choosingStockItemsThroughModal,
  GET_IS_LIST_USED_IN_IMPORT_ORDER: (state) => state.isListUsedInImportOrder,
};
const mutations = {
  SET_BOOL_CHOOSING_STOCK_ITEMS: (state, payload) => {
    state.choosingStockItemsThroughModal = payload;
  },
  SET_LIST_STOCK_ITEMS_EXP: (state, payload) => {
    state.listStockItemsExp = payload;
  },
  SET_LIST_STOCK_ITEMS_EXP_FOR_IMPORT_ORDER: (state, payload) => {
    state.listStockItemsExpForImportOrder = payload;
  },
  SET_IS_LIST_EXPANDED: (state, payload) => {
    state.isListExpanded = payload;
  },
  SET_SINGLE_STOCK_ITEM: (state, payload) => {
    state.currentStockItem = payload;
  },
  SET_LIST_STOCK_ITEMS_BEFORE_SAVE: (state, payload) => {
    state.listStockItemsExpBeforeSave = payload;
  },
  ADD_STOCK_ITEM_TO_LIST_IMPORT_ORDER: (state, payload) => {
    state.listStockItemsExpForImportOrder.push(payload);
  },
  ADD_STOCK_ITEM_TO_LIST_EXP: (state, payload) => {
    state.listStockItemsExp.push(payload);
  },
  SET_IS_LIST_USED_IN_IMPORT_ORDER: (state, payload) => {
    state.isListUsedInImportOrder = payload;
  },
  MOVE_STOCK_ITEM_EXP_TO_IMPORT_ORDER_LIST: (state, payload) => {
    const objIndex = state.listStockItemsExp.findIndex(
      ((obj) => obj.id === payload.id),
    );
    state.listStockItemsExp.splice(objIndex, 1);
    state.listStockItemsExpForImportOrder.push(payload);
  },
  MOVE_STOCK_ITEM_EXP_TO_WAITING_LIST: (state, payload) => {
    const objIndex = state.listStockItemsExpForImportOrder.findIndex(
      ((obj) => obj.id === payload.id),
    );
    state.listStockItemsExpForImportOrder.splice(objIndex, 1);
    state.listStockItemsExp.push(payload);
  },
  CHANGE_STOCK_ITEM_EXP_IN_LIST: async (state, item) => {
    let arrBefore = [];
    if (item.import_order === null) {
      arrBefore = state.listStockItemsExp;
    } else {
      arrBefore = state.listStockItemsExpForImportOrder;
    }
    const arrTmp = [];
    arrTmp.push(item);
    const arrFinal = arrBefore.map((obj) => arrTmp.find((o) => o.id === obj.id) || obj);
    if (item.import_order === null) {
      state.listStockItemsExp = arrFinal;
    } else {
      state.listStockItemsExpForImportOrder = arrFinal;
    }
  },
};
const actions = {
  SET_IS_LIST_USED_IN_IMPORT_ORDER: (context, bool) => {
    context.commit('SET_IS_LIST_USED_IN_IMPORT_ORDER', bool);
  },
  SET_BOOL_CHOOSING_STOCK_ITEMS: async (context, bool) => {
    await context.commit('SET_BOOL_CHOOSING_STOCK_ITEMS', bool);
  },
  RESET_STOCK_ITEM_EXP: async (context) => {
    const emptyStockItme = context.getters.GET_EMPTY_STOCK_ITEM_EXP;
    context.commit('SET_SINGE_STOCK_ITEM', emptyStockItme);
  },
  RESET_LIST_STOCK_ITEMS_FOR_IMPORT_ORDER: (context) => {
    context.commit('SET_LIST_STOCK_ITEMS_EXP_FOR_IMPORT_ORDER', []);
  },
  GET_STOCK_ITEMS_EXP: async (context) => {
    const listStockItemsExp = await axios.get(backendURL + stockItemExpURL);
    context.commit('SET_LIST_STOCK_ITEMS_EXP', listStockItemsExp.data);
  },
  GET_STOCK_ITEM_EXP_BY_ID: async (context, id) => {
    const singleStockItemExp = await axios.get(backendURL + stockItemExpURL + id);
    await context.commit('SET_SINGLE_STOCK_ITEM', singleStockItemExp.data);
  },
  GET_LIST_STOCK_ITEMS_EXP_FOR_IMPORT_ORDER: async (context, importOrder) => {
    const listStockItemsResponse = await axios.get(
      backendURL + listStockItemsForImportOrder + importOrder.id,
    );
    context.commit('SET_LIST_STOCK_ITEMS_EXP_FOR_IMPORT_ORDER', listStockItemsResponse.data);
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
  SET_LIST_STOCK_ITEMS_BEFORE_SAVE: (context, items) => {
    context.commit('SET_LIST_STOCK_ITEMS_BEFORE_SAVE', items);
  },
  CALC_FACTOR_STOCK_ITEM: async (context) => {
    // calculate factor
    const currentStockItem = await context.getters.GET_CURRENT_STOCK_ITEM_EXP;
    const factor = currentStockItem.current_price_eur / currentStockItem.factory_price_eur;
    currentStockItem.factor = factor.toFixed(2);
  },
  ADD_ITEMS_TO_IMPORT_ORDER: async (context) => {
    /* eslint no-param-reassign: ["error", { "props": false }] */
    const currentImportOrder = await context.getters.GET_SINGLE_IMPORT_ORDER;
    const stockItemsForSave = await context.getters.GET_LIST_STOCK_ITEMS_BEFORE_SAVE;
    await stockItemsForSave.forEach(
      (async (value) => {
        value.import_order = currentImportOrder.id;
        value.stock_choices = 'processed';
        const response = await axios.put(backendURL + stockItemExpURL + value.id, value);
        // context.commit('ADD_STOCK_ITEM_TO_LIST_IMPORT_ORDER', response.data);
        context.commit('MOVE_STOCK_ITEM_EXP_TO_IMPORT_ORDER_LIST', response.data);
      }),
    );
  },
  SAVE_STOCK_ITEM_EXP_VIA_ARRAY: async (context, item) => {
    const [action, savingItem] = await item;
    const clientOrderID = savingItem.client_order;
    savingItem.client_order = savingItem.client_order.id;
    // const that = this;
    if (action === 'delete') {
      const responseItem = await axios.put(
        backendURL + stockItemExpURL + savingItem.id, savingItem,
      );
      context.commit('MOVE_STOCK_ITEM_EXP_TO_WAITING_LIST', responseItem.data);
    } else if (action === 'save_correct') {
      const responseItem = await axios.put(`${backendURL}${stockItemExpURL}save_factory/${savingItem.id}`, savingItem);
      const savedItem = responseItem.data;
      const responseFactoryItem = await axios.get(
        `${backendURL}${factoryItem}items/${savedItem.factory_item}`,
      );
      const responseFactoryCollection = await axios.get(
        `${backendURL}${factoryItem}collections/${responseFactoryItem.data.factory_collection}`,
      );
      const responseFactory = await axios.get(
        backendURL + factoryItem + responseFactoryCollection.data.factory,
      );
      savedItem.client_order = clientOrderID;
      savedItem.factory_item = responseFactoryItem.data;
      savedItem.factory_item.factory_collection = responseFactoryCollection.data;
      savedItem.factory_item.factory_collection.factory = responseFactory.data;
      context.commit('CHANGE_STOCK_ITEM_EXP_IN_LIST', savedItem);
    }
  },
  MOVE_STOCK_ITEM_EXP_TO_IMPORT_ORDER_LIST: (context, item) => {
    context.commit('MOVE_STOCK_ITEM_EXP_TO_IMPORT_ORDER_LIST', item);
  },
  MOVE_STOCK_ITEM_EXP_TO_WAITING_LIST: (context, item) => {
    context.commit('MOVE_STOCK_ITEM_EXP_TO_WAITING_LIST', item);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
