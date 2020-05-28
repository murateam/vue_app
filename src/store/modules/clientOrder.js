import axios from 'axios';
import _ from 'lodash';

const clientOrdersListURL = 'http://127.0.0.1:5000/api/client_orders/';
const clientOrderAddURL = 'http://127.0.0.1:5000/api/client_order/add/';
const singleClientOrderURL = 'http://127.0.0.1:5000/api/client_orders/';


const state = {
  emptyClientOrder: {
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
  listClientOrders: [],
  singleClientOrder: {},
  canChangeClient: true,
};
const getters = {
  GET_EMPTY_CLIENT_ORDER: (state) => state.emptyClientOrder,
  GET_LIST_CLIENT_ORDERS: (state) => state.listClientOrders,
  GET_SINGLE_CLIENT_ORDER: (state) => state.singleClientOrder,
  GET_CAN_CHANGE_CLIENT: (state) => state.canChangeClient,
  /* eslint no-shadow: ["error", { "allow": ["state"] }] */
};
const mutations = {
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
  SET_LIST_CLIENT_ORDERS: (state, payload) => {
    state.listClientOrders = payload;
  },
  SET_SINGLE_CLIENT_ORDER: (state, payload) => {
    state.singleClientOrder = payload;
  },
  SET_CAN_CHANGE_CLIENT: (state, payload) => {
    state.canChangeClient = payload;
  },
  SET_PRICE_FOR_CLIENT_ORDER: (state, payload) => {
    state.singleClientOrder.price = payload;
  },
  RESET_CLIENT_ORDER: (state, payload) => {
    state.singleClientOrder = payload;
  },
};
const actions = {
  CALCULATE_PRICE_FOR_CLIENT_ORDER: async (context) => {
    const clientOrder = context.getters.GET_SINGLE_CLIENT_ORDER;
    console.log(clientOrder.d_percent);
    console.log(context.getters.GET_CURRENT_EUR_RATE);
    // if (clientOrder.eur_rate !== context.GET_EUR_RATE.current_rate) {
    //   await context.dispatch('GET_SAVED_RATE');
    // }
    const StockItems = context.getters.GET_LIST_STOCK_ITEMS;
    const listPriceAndAmount = StockItems.map((item) => item.current_price_ru * item.items_amount);
    const inValue = 0;
    let sum = listPriceAndAmount.reduce(
      (accum, item) => accum + item, inValue,
    );
    sum = sum * context.getters.GET_EUR_RATE.current_rate + clientOrder.d_percent;
    await context.commit('SET_PRICE_FOR_CLIENT_ORDER', sum);
  },
  CALCULATE_PRICE_SYNC: async (context) => {
    console.log(context);
  },
  GET_CURRENT_EUR_RATE: (context) => {
    console.log(context);
  },
  GET_LIST_CLIENT_ORDERS: async (context) => {
    const { data } = await axios.get(clientOrdersListURL);
    context.commit('SET_LIST_CLIENT_ORDERS', data);
  },
  GET_SINGLE_CLIENT_ORDER: async (context, id) => {
    const { data } = await axios.get(singleClientOrderURL + id);
    // console.log(data);
    // if (data.state === 'published') {
    //   context.dispatch('GET_SAVED_RATE', data.eur_rate);
    // } else {
    //   context.dispatch('GET_CURRENT_RATE');
    // }
    await context.commit('SET_SINGLE_CLIENT_ORDER', data);
    await context.dispatch('GET_SINGLE_CLIENT', data.client);
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
  SET_CAN_CHANGE_CLIENT: (context, bool) => {
    context.commit('SET_CAN_CHANGE_CLIENT', bool);
  },
  RESET_CLIENT_ORDER: (context) => {
    const emptyClientOrder = _.cloneDeep(context.getters.GET_EMPTY_CLIENT_ORDER);
    context.commit('RESET_CLIENT_ORDER', emptyClientOrder);
  },
};
export default {
  state,
  getters,
  mutations,
  actions,
};
