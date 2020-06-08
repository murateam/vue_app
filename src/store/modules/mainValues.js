/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import axios from 'axios';

const currentRateURL = 'http://127.0.0.1:5000/api/current_rate/';
const savedRateURL = 'http://127.0.0.1:5000/api/saved_rate/';

const state = {
  eurRate: {},
};
const getters = {
  GET_EUR_RATE: (state) => state.eurRate,
};
const mutations = {
  SET_EUR_RATE: (state, payload) => {
    state.eurRate = payload;
  },
};
const actions = {
  GET_CURRENT_RATE: async (context) => {
    // axios.get(currentRateURL).then((response) => {
    //   context.commit('SET_EUR_RATE', response.data);
    // });
    const response = await axios.get(currentRateURL);
    await context.commit('SET_EUR_RATE', response.data);
  },
  GET_SAVED_RATE: (context, id) => {
    axios.get(savedRateURL + id).then((response) => {
      context.commit('SET_EUR_RATE', response.data);
    });
  },
};
export default {
  state,
  getters,
  mutations,
  actions,
};
