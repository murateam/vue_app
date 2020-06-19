/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import axios from 'axios';

const ListNameFactoriesURL = 'http://127.0.0.1:5000/api/factories/list_names/';
const ListNameFactoryCollectionsURL = 'http://127.0.0.1:5000/api/factories/collections/list_names/';
const ListNumberFactoryItemsURL = 'http://127.0.0.1:5000/api/factories/items/list_numbers/';
// const factoriesURL = 'http://127.0.0.1:5000/api/factories/';
// const collectionURL = 'http://127.0.0.1:5000/api/factories/collecitons/';
// const factoryItemsURL = 'http://127.0.0.1:5000/api/factories/items/';

const state = {
  emptyFactory: { id: null, name: '' },
  emptyCollection: {
    id: null,
    factory: null,
    name: '',
    is_made: [],
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
  currentFacrotyItem: {},
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
  GET_CURRENT_FACTORY_ITEM: (state) => state.currentFacrotyItem,
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
    state.currentFacrotyItem = payload;
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
  SET_CURRENT_FACTORY_ITEM: async (context, item) => {
    const factoryType = await context.getters.GET_TYPE_FACTORY_ITEM;
    if (factoryType === 'factory') {
      if (item === 'empty') {
        const emptyFactory = await context.getters.GET_EMPTY_FACTORY;
        await context.commit('SET_CURRENT_FACTORY', emptyFactory);
      } else {
        console.log(item);
        await context.commit('SET_CURRENT_FACTORY', item);
      }
    }
  },
  SAVE_NEW_FACTORY: () => {
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
