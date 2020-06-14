/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import axios from 'axios';

const ListNameFactoriesURL = 'http://127.0.0.1:5000/api/factories/list_names/';
const ListNameFactoryCollectionsURL = 'http://127.0.0.1:5000/api/factories/collections/list_names/';
const ListNumberFactoryItemsURL = 'http://127.0.0.1:5000/api/factories/items/list_numbers/';

const state = {
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
};

export default {
  state,
  getters,
  mutations,
  actions,
};
