import axios from 'axios';

const clientOrdersListURL = 'http://127.0.0.1:5000/api/client_orders/';
const clientOrderAddURL = 'http://127.0.0.1:5000/api/client_order/add/';
const singleClientOrderURL = 'http://127.0.0.1:5000/api/client_orders/';


const state = {
  listClientOrders: [],
  singleClientOrder: [],
  // isNewClientOrder: true,
};
const getters = {
  GET_LIST_CLIENT_ORDERS: (state) => state.listClientOrders,
  GET_SINGLE_CLIENT_ORDER: (state) => state.singleClientOrder,
  // GET_IS_NEW_CLIENT_ORDER: (state) => state.isNewClientOrder,
  /* eslint no-shadow: ["error", { "allow": ["state"] }] */
};
const mutations = {
  SET_LIST_CLIENT_ORDERS: (state, payload) => {
    state.listClientOrders = payload;
  },
  ADD_CLIENT_ORDER: (state, payload) => {
    state.listClientOrders.push(payload);
  },
  SET_SINGLE_CLIENT_ORDER: (state, payload) => {
    state.singleClientOrder = payload;
  },
  // SET_IS_NEW_CLIENT_ORDER: (state, payload) => {
  //   state.isNewClientOrder = payload;
  // },
};
const actions = {
  GET_LIST_CLIENT_ORDERS: async (context) => {
    const { data } = await axios.get(clientOrdersListURL);
    context.commit('SET_LIST_CLIENT_ORDERS', data);
  },
  GET_SINGLE_CLIENT_ORDER: async (context, id) => {
    const { data } = await axios.get(singleClientOrderURL + id);
    context.commit('SET_SINGLE_CLIENT_ORDER', data);
    context.dispatch('GET_SINGLE_CLIENT', data.client);
  },
  ADD_CLIENT_ORDER: async (context, requestData) => {
    const { data } = await axios.post(clientOrderAddURL, requestData);
    axios.get(`http://localhost:5000/api/client_orders/${data.id}`).then((response) => {
      context.commit('ADD_CLIENT_ORDER', response.data);
    });
  },
  // ADD_CLIENT_ORDER: async (context, requestData) => {
  //   const { data } = await axios.post(clientOrderAddURL, requestData);
  //   axios.get(`http://localhost:5000/api/client_orders/${data.id}`).then((response) => {
  //     context.commit('ADD_CLIENT_ORDER', response.data);
  //   });
  // },
};
export default {
  state,
  getters,
  mutations,
  actions,
};
