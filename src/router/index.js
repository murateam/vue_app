import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';
import manageTab from '../components/manageTab.vue';
import stockList from '../components/stockList.vue';


Vue.use(VueRouter);

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home,
  // },
  {
    path: '/manageTab',
    name: 'manageTab',
    component: manageTab,
  },
  {
    path: '/stockList',
    name: 'stockList',
    component: stockList,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
