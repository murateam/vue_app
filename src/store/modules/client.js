/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import axios from 'axios';

const backendURL = process.env.VUE_APP_BACKEND_URL;
const singleClientURL = 'api/clients/';
const clientCheckURL = 'api/clients/check/';
const clientNewURL = 'api/clients/new';

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
    address: '',
  },
  separateClientDetails: {
    passportSeries: '',
    passportNumber: '',
    passportGiven: '',
    addressCountry: '',
    addressArea: '',
    addressCity: '',
    addressStreet: '',
  },
};

const getters = {
  GET_SINGLE_CLIENT: (state) => state.singleClient,
  GET_IF_CLIENT_EXIST: (state) => {
    const boolClient = state.singleClient;
    return boolClient.id != null;
  },
  GET_SEPARATE_CLIENT_DETAILS: (state) => state.separateClientDetails,
};

const mutations = {
  SET_SINGLE_CLIENT: (state, payload) => {
    state.singleClient = payload;
  },
  SET_SEPARATE_CLIENT_DETAILS: (state, payload) => {
    state.separateClientDetails = payload;
  },
};

const actions = {
  GET_SINGLE_CLIENT: async (context, id) => {
    const { data } = await axios.get(backendURL + singleClientURL + id);
    context.commit('SET_SINGLE_CLIENT', data);
    context.commit('SET_SEPARATE_CLIENT_DETAILS', {
      passportSeries: data.passport.split('&')[0],
      passportNumber: data.passport.split('&')[1],
      passportGiven: data.passport.split('&')[2],
      addressCountry: data.address.split('&')[0],
      addressArea: data.address.split('&')[1],
      addressCity: data.address.split('&')[2],
      addressStreet: data.address.split('&')[3],
    });
  },
  CHECK_CLIENT(context, requestData) {
    if (requestData.name.length > 0) {
      axios.post(backendURL + clientCheckURL, requestData)
        .then((response) => {
          context.commit('SET_SINGLE_CLIENT', response.data);
          context.commit('SET_SEPARATE_CLIENT_DETAILS', {
            passportSeries: response.data.passport.split('&')[0],
            passportNumber: response.data.passport.split('&')[1],
            passportGiven: response.data.passport.split('&')[2],
            addressCountry: response.data.address.split('&')[0],
            addressArea: response.data.address.split('&')[1],
            addressCity: response.data.address.split('&')[2],
            addressStreet: response.data.address.split('&')[3],
          });
        })
        .catch(() => {});
    }
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
        address: '',
      });
    context.commit('SET_SEPARATE_CLIENT_DETAILS',
      {
        passportSeries: '',
        passportNumber: '',
        passportGiven: '',
        addressCountry: '',
        addressArea: '',
        addressCity: '',
        addressStreet: '',
      });
  },
  SAVE_CLIENT: async (context, requestData) => {
    if (requestData.id) {
      await axios.put(backendURL + singleClientURL + requestData.id, requestData);
    } else {
      axios.post(backendURL + clientNewURL, requestData).then((response) => {
        context.commit('SET_SINGLE_CLIENT', response.data);
      });
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
