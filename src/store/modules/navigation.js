/* eslint no-shadow: ["error", { "allow": ["state"] }] */

// ///////// scenarios for routes /////////////////
//   / mainDemoProject -> manageTab -> singleClientOrder (clinetOrder) \
//   |                                                                 |
// 1<  mainDemoProject -> manageTab -> singleClientOrder (payment)      > 1
//   |                                                                 |
//   \ mainDemoProject -> stockList(all) (warehouse)                   /


//   / mainDemoProject -> importTab      -> importOrder -> stockItemExp > 2
//   |
// 2<                  -> stocklist(all) -> importOrder -> stockItemExp > 3
//   |
//   \                                   -> stockItemExp                > 4
// ////////// End ///////////
function firstRoute(currentURL) {
  let whereGo = '';
  if (currentURL === '/mainDemoProject') {
    whereGo = '/';
  } else if (currentURL === '/manageTab') {
    whereGo = '/mainDemoProject';
  } else if (currentURL === '/singleClientOrder') {
    whereGo = '/manageTab';
  } else if (currentURL === '/stockList') {
    whereGo = '/mainDemoProject';
  } else {
    whereGo = '/';
  }
  return whereGo;
}

function secondRoute(currentURL, route) {
  let whereGo = '';
  if (currentURL === '/mainDemoProject') {
    whereGo = '/';
  } else if (currentURL === '/importTab') {
    whereGo = '/mainDemoProject';
  } else if (currentURL === '/stockList') {
    whereGo = '/mainDemoProject';
  } else if (currentURL === '/importOrder' && route === 2) {
    whereGo = '/importTab';
  } else if (currentURL === '/importOrder' && route === 3) {
    whereGo = '/stockList'; // all
  } else if (currentURL === '/stockItemExp' && route === 2) {
    whereGo = '/importOrder';
  } else if (currentURL === '/stockItemExp' && route === 3) {
    whereGo = '/importOrder';
  } else if (currentURL === '/stockItemExp' && route === 4) {
    whereGo = '/stockList'; // all
  }
  return whereGo;
}

const state = {
  currentStep: '/',
  route: 1, // scenarios for routes
};
const getters = {
  GET_CURRENT_STEP: (state) => state.currentStep,
  GET_BACK_STEP: (state) => {
    let url = '';
    if (state.route === 1) {
      url = firstRoute(state.currentStep);
    } else {
      url = secondRoute(state.currentStep, state.route);
    }
    return url;
  },
};
const mutations = {
  SET_NAV_ROUTE: (state, payload) => {
    state.route = payload;
  },
  SET_CURRENT_STEP: (state, payload) => {
    state.currentStep = payload;
  },
};
const actions = {
  SET_NAV_ROUTE: (context, route) => {
    context.commit('SET_NAV_ROUTE', route);
  },
  SET_CURRENT_STEP: (context, adr) => {
    context.commit('SET_CURRENT_STEP', adr);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
