import Vue from 'vue';
import Vuex from 'vuex';
import mainValues from './modules/mainValues';
import author from './modules/author';
import client from './modules/client';
import clientOrder from './modules/clientOrder';
import stockItem from './modules/stockItem';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    mainValues,
    author,
    client,
    clientOrder,
    stockItem,
  },
});
