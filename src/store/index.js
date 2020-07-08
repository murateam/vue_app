import Vue from 'vue';
import Vuex from 'vuex';
import mainValues from './modules/mainValues';
import alertMessages from './modules/alertMessages';
import author from './modules/author';
import client from './modules/client';
import clientOrder from './modules/clientOrder';
import stockItem from './modules/stockItem';
import payment from './modules/payment';
import importOrder from './modules/importOrder';
import factoryItem from './modules/factoryItem';
import stockItemExp from './modules/stockItemExp';
import navigations from './modules/navigation';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    mainValues,
    alertMessages,
    author,
    client,
    clientOrder,
    stockItem,
    payment,
    importOrder,
    factoryItem,
    stockItemExp,
    navigations,
  },
});
