import axios from 'axios';

const singleClientURL = 'http://127.0.0.1:5000/api/clients/';
const clientCheckURL = 'http://127.0.0.1:5000/api/clients/check/';

const state = {
  singleClient: {
    id: null,
    last_name: '',
    first_name: '',
    middle_name: '',
    birth_date: '',
    phone: '',
    email: '',
    passport: '',
    adress: '',
  },
};

const getters = {
  GET_SINGLE_CLIENT: (state) => state.singleClient,
  GET_IF_CLIENT_EXIST: (state) => {
    const boolClient = state.singleClient;
    return boolClient.id != null;
    // let boolClient;
    // if (state.singleClient.id == null) {
    //   boolClient = false;
    // } else { boolClient = true; }
    // return boolClient;
  },
  /* eslint no-shadow: ["error", { "allow": ["state"] }] */
};

const mutations = {
  SET_SINGLE_CLIENT: (state, payload) => {
    state.singleClient = payload;
  },
};

const actions = {
  GET_SINGLE_CLIENT: async (context, id) => {
    const { data } = await axios.get(singleClientURL + id);
    context.commit('SET_SINGLE_CLIENT', data);
  },
  CHECK_CLIENT(context, requestData) {
    axios.post(clientCheckURL, requestData)
      .then((response) => {
        context.commit('SET_SINGLE_CLIENT', response.data);
      })
      .catch(() => {});
  },
  RESET_CURRENT_CLIENT(context) {
    context.commit('SET_SINGLE_CLIENT',
      {
        id: null,
        last_name: '',
        first_name: '',
        middle_name: '',
        birth_date: '',
        phone: '',
        email: '',
        passport: '',
        adress: '',
      });
  },
  // SAVE_CLIENT: async (context, requestData) => {
  //   if (requestData.id) {
  //     const { data } = await axios.put(singleClientOrderURL + requestData.id, requestData);
  //     axios.get(`http://localhost:5000/api/client_orders/for_list/${data.id}`).then((response) => {
  //       context.commit('CHANGE_CLIENT_ORDER', response.data);
  //     });
  //   } else {
  //     const { data } = await axios.post(clientOrderAddURL, requestData);
  //     axios.get(`http://localhost:5000/api/client_orders/for_list/${data.id}`).then((response) => {
  //       context.commit('ADD_CLIENT_ORDER', response.data);
  //     });
  //   }
  // },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
