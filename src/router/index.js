import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home.vue';
import manageTab from '../components/manageTab.vue';
import singleClientOrder from '../components/singleClientOrder.vue';
import stockList from '../components/stockList.vue';
import importTab from '../components/importTable.vue';
import importOrder from '../components/importOrder.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/manageTab',
    name: 'manageTab',
    component: manageTab,
  },
  {
    path: '/singleClientOrder',
    name: 'singleClientOrder',
    component: singleClientOrder,
  },
  {
    path: '/stockList',
    name: 'stockList',
    component: stockList,
  },
  {
    path: '/importTab',
    name: 'importTab',
    component: importTab,
  },
  {
    path: '/importOrder',
    name: 'importOrder',
    component: importOrder,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
