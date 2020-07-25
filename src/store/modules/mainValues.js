/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import axios from 'axios';

const backendURL = process.env.VUE_APP_BACKEND_URL;
const bankEurRateURL = 'api/latest';
const currentRateURL = 'api/current_rate/';
const savedRateURL = 'api/saved_rate/';

const state = {
  eurRate: {},
  bankEurRate: {
    rates: {
      RUB: 0,
    },
  },
};
const getters = {
  GET_EUR_RATE: (state) => state.eurRate,
  GET_BANK_EUR_RATE: (state) => state.bankEurRate.rates,
};
const mutations = {
  SET_EUR_RATE: (state, payload) => {
    state.eurRate = payload;
  },
  SET_BANK_EUR_RATE: (state, payload) => {
    state.bankEurRate = payload;
  },
};
const actions = {
  GET_CURRENT_RATE: async (context) => {
    const response = await axios.get(backendURL + currentRateURL);
    await context.commit('SET_EUR_RATE', response.data);
  },
  GET_SAVED_RATE: (context, id) => {
    axios.get(backendURL + savedRateURL + id).then((response) => {
      context.commit('SET_EUR_RATE', response.data);
    });
  },
  GET_BANK_EUR_RATE: async (context) => {
    const response = await axios.get(backendURL + bankEurRateURL);
    context.commit('SET_BANK_EUR_RATE', response.data);
  },
};
export default {
  state,
  getters,
  mutations,
  actions,
};
