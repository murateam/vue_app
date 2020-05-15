import Vue from 'vue';
import Vuex from 'vuex';
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
    client,
    clientOrder,
    stockItem,
  },
});
