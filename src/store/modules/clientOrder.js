import axios from 'axios';

const clientOrdersListURL = 'http://127.0.0.1:5000/api/client_orders/';
const clientOrderAddURL = 'http://127.0.0.1:5000/api/client_order/add/';
const singleClientOrderURL = 'http://127.0.0.1:5000/api/client_orders/';


const state = {
  listClientOrders: [],
  singleClientOrder: {
    id: null,
    public_num: '',
    state: '',
    status: '',
    payment_status: '',
    author: '',
    client: '',
    when_published: '',
    created: '',
    updated: '',
    eur_rate: 0,
    price: 0,
    total_payment: 0,
    designer: '',
    d_percent: 0,
    comment: '',
  },
  canChangeClient: true,
};
const getters = {
  GET_LIST_CLIENT_ORDERS: (state) => state.listClientOrders,
  GET_SINGLE_CLIENT_ORDER: (state) => state.singleClientOrder,
  GET_CAN_CHANGE_CLIENT: (state) => state.canChangeClient,
  /* eslint no-shadow: ["error", { "allow": ["state"] }] */
};
const mutations = {
  SET_LIST_CLIENT_ORDERS: (state, payload) => {
    state.listClientOrders = payload;
  },
  ADD_CLIENT_ORDER: (state, payload) => {
    state.listClientOrders.push(payload);
  },
  CHANGE_CLIENT_ORDER: (state, payload) => {
    const objIndex = state.listClientOrders.findIndex(((obj) => obj.id === payload.id));
    state.listClientOrders[objIndex].client = payload.client;
    state.listClientOrders[objIndex].designer = payload.designer;
    state.listClientOrders[objIndex].d_percent = payload.d_percent;
    state.listClientOrders[objIndex].comment = payload.comment;
  },
  SET_SINGLE_CLIENT_ORDER: (state, payload) => {
    state.singleClientOrder = payload;
  },
  RESET_CLIENT_ORDER: (state, payload) => {
    state.singleClientOrder = payload;
  },
  SET_CAN_CHANGE_CLIENT: (state, payload) => {
    state.canChangeClient = payload;
  },
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
  SAVE_CLIENT_ORDER: async (context, requestData) => {
    if (requestData.id) {
      const { data } = await axios.put(singleClientOrderURL + requestData.id, requestData);
      axios.get(`http://localhost:5000/api/client_orders/for_list/${data.id}`).then((response) => {
        context.commit('CHANGE_CLIENT_ORDER', response.data);
        context.dispatch('SAVE_STOCK_ITEM_FROM_CLIENT_ORDER', response.data);
      });
    } else {
      const { data } = await axios.post(clientOrderAddURL, requestData);
      axios.get(`http://localhost:5000/api/client_orders/for_list/${data.id}`).then((response) => {
        context.commit('ADD_CLIENT_ORDER', response.data);
        context.dispatch('SAVE_STOCK_ITEM_FROM_CLIENT_ORDER', response.data);
      });
    }
  },
  // ADD_CLIENT_ORDER: async (context, requestData) => {
  //   const { data } = await axios.post(clientOrderAddURL, requestData);
  //   axios.get(`http://localhost:5000/api/client_orders/${data.id}`).then((response) => {
  //     context.commit('ADD_CLIENT_ORDER', response.data);
  //   });
  // },
  RESET_CLIENT_ORDER: (context) => {
    context.commit('RESET_CLIENT_ORDER', {
      id: null,
      public_num: '',
      state: '',
      status: '',
      payment_status: '',
      author: '',
      client: '',
      when_published: '',
      created: '',
      updated: '',
      eur_rate: 0,
      price: 0,
      total_payment: 0,
      designer: '',
      d_percent: 0,
      comment: '',
    });
  },
  SET_CAN_CHANGE_CLIENT: (context, bool) => {
    context.commit('SET_CAN_CHANGE_CLIENT', bool);
  },
};
export default {
  state,
  getters,
  mutations,
  actions,
};
