import Vue from 'vue';
import VueRouter from 'vue-router';
import mainDemoProject from '../components/mainDemoProject.vue';
import tabOfClientOrder from '../components/tabOfClientOrder.vue';
import singleClientOrder from '../components/singleClientOrder.vue';
import stockList from '../components/stockList.vue';
import factoryOrderTab from '../components/factoryOrderTable.vue';
import factoryOrder from '../components/factoryOrder.vue';
import stockItemExpanded from '../components/stockItemExp.vue';
import main from '../components/myPage/main.vue';
import aboutProject from '../components/myPage/aboutProject.vue';
import contact from '../components/myPage/contact.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'main',
    component: main,
  },
  {
    path: '/aboutProject',
    name: 'aboutProject',
    component: aboutProject,
  },
  {
    path: '/contact',
    name: 'contact',
    component: contact,
  },
  {
    path: '/mainDemoProject',
    name: 'mainDemoProject',
    component: mainDemoProject,
  },
  {
    path: '/tabOfClientOrder',
    name: 'tabOfClientOrder',
    component: tabOfClientOrder,
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
    path: '/factoryOrderTable',
    name: 'factoryOrderTable',
    component: factoryOrderTab,
  },
  {
    path: '/factoryOrder',
    name: 'factoryOrder',
    component: factoryOrder,
  },
  {
    path: '/stockItemExp',
    name: 'stockItemExp',
    component: stockItemExpanded,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
