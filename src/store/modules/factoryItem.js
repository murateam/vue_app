/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import axios from 'axios';
import _ from 'lodash';

const ListNameFactoriesURL = 'http://127.0.0.1:5000/api/factories/list_names/';
const ListNameFactoryCollectionsURL = 'http://127.0.0.1:5000/api/factories/collections/list_names/';
const ListNumberFactoryItemsURL = 'http://127.0.0.1:5000/api/factories/items/list_numbers/';
const factoriesURL = 'http://127.0.0.1:5000/api/factories/';
const collectionURL = 'http://127.0.0.1:5000/api/factories/collections/';
const factoryItemsURL = 'http://127.0.0.1:5000/api/factories/items/';

const state = {
  emptyFactory: { id: null, name: '' },
  emptyCollection: {
    id: null,
    factory: null,
    name: '',
    is_made: true,
  },
  emptyFactoryItem: {
    id: null,
    factory_collection: null,
    catalogue_number: '',
    description_rus: '',
    description_de: '',
  },
  currentFactory: {},
  currentCollection: {},
  currentFactoryItem: {},
  listNameFactories: [],
  listNameFactoryCollections: [],
  listNumberFactoryItems: [],
  typeFactoryItem: '',

};
const getters = {
  GET_LIST_NAME_FACTORIES: (state) => state.listNameFactories,
  GET_LIST_NAME_FACTORY_COLLECTIONS: (state) => state.listNameFactoryCollections,
  GET_LIST_NUMBER_FACTORY_ITEMS: (state) => state.listNumberFactoryItems,
  GET_TYPE_FACTORY_ITEM: (state) => state.typeFactoryItem,
  GET_EMPTY_FACTORY: (state) => state.emptyFactory,
  GET_EMPTY_COLLECTION: (state) => state.emptyCollection,
  GET_EMPTY_FACTORY_ITEM: (state) => state.emptyFactoryItem,
  GET_CURRENT_FACTORY: (state) => state.currentFactory,
  GET_CURRENT_COLLECTION: (state) => state.currentCollection,
  GET_CURRENT_FACTORY_ITEM: (state) => state.currentFactoryItem,
};
const mutations = {
  SET_LIST_NAME_FACTORIES: (state, payload) => {
    state.listNameFactories = payload;
  },
  SET_LIST_NAME_FACTORY_COLLECTIONS: (state, payload) => {
    state.listNameFactoryCollections = payload;
  },
  SET_LIST_CATALOGUE_NUMBERS: (state, payload) => {
    state.listNumberFactoryItems = payload;
  },
  SET_TYPE_FACTORY_ITEM: (state, payload) => {
    state.typeFactoryItem = payload;
  },
  RESET_LIST_COLLECTIONS_AND_NUMBERS: (state) => {
    state.listNameFactoryCollections = [];
    state.listNumberFactoryItems = [];
  },
  SET_CURRENT_FACTORY: (state, payload) => {
    state.currentFactory = payload;
  },
  SET_CURRENT_COLLECTION: (state, payload) => {
    state.currentCollection = payload;
  },
  SET_CURRENT_FACTORY_ITEM: (state, payload) => {
    state.currentFactoryItem = payload;
  },
  ADD_FACTORY_ITEM_TO_LIST: (state, payload) => {
    if (state.typeFactoryItem === 'factory') {
      state.listNameFactories.push(payload);
    } else if (state.typeFactoryItem === 'collection') {
      state.listNameFactoryCollections.push(payload);
    } else if (state.typeFactoryItem === 'catalogue-number') {
      state.listNumberFactoryItems.push(payload);
    }
  },
  CHANGE_FACTORY_ITEM_IN_LIST: (state, payload) => {
    let arrBefore = [];
    if (state.typeFactoryItem === 'factory') {
      arrBefore = state.listNameFactories;
    } else if (state.typeFactoryItem === 'collection') {
      arrBefore = state.listNameFactoryCollections;
    } else if (state.typeFactoryItem === 'catalogue-number') {
      arrBefore = state.listNumberFactoryItems;
    }
    const arrTmp = [];
    arrTmp.push(payload);
    const arrFinal = arrBefore.map((obj) => arrTmp.find((o) => o.id === obj.id) || obj);
    state.listStockItems = arrFinal;
    if (state.typeFactoryItem === 'factory') {
      state.listNameFactories = arrFinal;
    } else if (state.typeFactoryItem === 'collection') {
      state.listNameFactoryCollections = arrFinal;
    } else if (state.typeFactoryItem === 'catalogue-number') {
      state.listNumberFactoryItems = arrFinal;
    }
  },
};
const actions = {
  GET_LIST_NAME_FACTORIES: async (context) => {
    const listNamesFactory = await axios.get(ListNameFactoriesURL);
    context.commit('SET_LIST_NAME_FACTORIES', listNamesFactory.data);
  },
  GET_LIST_COLLECTIONS_BY_FACTORY: async (context, factory) => {
    const requestData = [];
    requestData.push({ value: factory });
    const collections = await axios.post(ListNameFactoryCollectionsURL, requestData);
    context.commit('SET_LIST_NAME_FACTORY_COLLECTIONS', collections.data);
  },
  GET_CATALOGUE_NUMBERS_BY_COLLECTION: async (context, collection) => {
    const requestData = [];
    requestData.push({ value: collection });
    const catalogueNumbers = await axios.post(ListNumberFactoryItemsURL, requestData);
    context.commit('SET_LIST_CATALOGUE_NUMBERS', catalogueNumbers.data);
  },
  SET_TYPE_FACTORY_ITEM: (context, type) => {
    context.commit('SET_TYPE_FACTORY_ITEM', type);
  },
  RESET_LIST_COLLECTIONS_AND_NUMBERS: (context) => {
    context.commit('RESET_LIST_COLLECTIONS_AND_NUMBERS');
  },
  SET_CURRENT_FACTORY: async (context, item) => {
    if (item === 'empty') {
      const emptyFactory = await _.cloneDeep(context.getters.GET_EMPTY_FACTORY);
      await context.commit('SET_CURRENT_FACTORY', emptyFactory);
    } else {
      await context.commit('SET_CURRENT_FACTORY', item);
    }
  },
  SET_CURRENT_COLLECTION: async (context, item) => {
    if (item === 'empty') {
      const emptyCollection = await _.cloneDeep(context.getters.GET_EMPTY_COLLECTION);
      await context.commit('SET_CURRENT_COLLECTION', emptyCollection);
    } else {
      await context.commit('SET_CURRENT_COLLECTION', item);
    }
  },
  SET_CURRENT_FACTORY_ITEM: async (context, item) => {
    if (item === 'empty') {
      const emptyCatalogueNumber = await _.cloneDeep(context.getters.GET_EMPTY_FACTORY_ITEM);
      await context.commit('SET_CURRENT_FACTORY_ITEM', emptyCatalogueNumber);
    } else {
      await context.commit('SET_CURRENT_FACTORY_ITEM', item);
    }
  },
  SAVE_FACTORY_ITEM: async (context) => {
    const currentTypeFactoryItem = await context.getters.GET_TYPE_FACTORY_ITEM;
    // console.log(currentTypeFactoryItem);
    const currentFactory = await context.getters.GET_CURRENT_FACTORY;
    const currentCollection = await context.getters.GET_CURRENT_COLLECTION;
    const currentFactoryItem = await context.getters.GET_CURRENT_FACTORY_ITEM;
    if (currentTypeFactoryItem === 'factory') {
      let factoryResponse = {};
      if (currentFactory.id == null) {
        factoryResponse = await axios.post(factoriesURL, currentFactory);
        await context.commit('ADD_FACTORY_ITEM_TO_LIST', factoryResponse.data);
      } else {
        factoryResponse = await axios.put(factoriesURL + currentFactory.id, currentFactory);
        await context.commit('CHANGE_FACTORY_ITEM_IN_LIST', factoryResponse.data);
      }
      // console.log(factoryResponse.data);
      // add to current stock item expanded (will have made it later)
    } else if (currentTypeFactoryItem === 'collection') {
      let collectionResponse = {};
      if (currentCollection.id == null) {
        currentCollection.factory = currentFactory.id;
        collectionResponse = await axios.post(collectionURL, currentCollection);
        await context.commit('ADD_FACTORY_ITEM_TO_LIST', collectionResponse.data);
      } else {
        collectionResponse = await axios.put(
          collectionURL + currentCollection.id, currentCollection,
        );
        await context.commit('CHANGE_FACTORY_ITEM_IN_LIST', collectionResponse.data);
      }
    } else if (currentTypeFactoryItem === 'catalogue-number') {
      let factoryItemResponse = {};
      if (currentFactoryItem.id == null) {
        currentFactoryItem.factory_collection = currentCollection.id;
        factoryItemResponse = await axios.post(factoryItemsURL, currentFactoryItem);
        await context.commit('ADD_FACTORY_ITEM_TO_LIST', factoryItemResponse.data);
      } else {
        factoryItemResponse = await axios.put(
          factoryItemsURL + currentFactoryItem.id, currentFactoryItem,
        );
        await context.commit('CHANGE_FACTORY_ITEM_IN_LIST', factoryItemResponse.data);
      }
    }
  },
  GET_SINGLE_FACTORY_ITEM: async (context) => {
    const currentTypeFactoryItem = context.getters.GET_TYPE_FACTORY_ITEM;
    if (currentTypeFactoryItem === 'factory') {
      const currentFactory = context.getters.GET_CURRENT_FACTORY;
      const factoryResponse = await axios.get(factoriesURL + currentFactory.id);
      context.commit('SET_CURRENT_FACTORY', factoryResponse.data);
    } else if (currentTypeFactoryItem === 'collection') {
      const currentCollection = context.getters.GET_CURRENT_COLLECTION;
      const collectionResponse = await axios.get(collectionURL + currentCollection.id);
      context.commit('SET_CURRENT_COLLECTION', collectionResponse.data);
    } else if (currentTypeFactoryItem === 'catalogue-number') {
      const currentFactoryItem = context.getters.GET_CURRENT_FACTORY_ITEM;
      const factoryItemResponse = await axios.get(factoryItemsURL + currentFactoryItem.id);
      context.commit('SET_CURRENT_FACTORY_ITEM', factoryItemResponse.data);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
