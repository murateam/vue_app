<template>
    <b-container>
        <h3 class="mt-3">Главная страница</h3>
        <b-row align-h="start" class="mt-3">
            <b-col cols="3">
                <router-link
                class="btn btn-success"
                to="manageTab">Менеджер</router-link>
            </b-col>
            <b-col cols="3">
              <b-button @click="accountantTab">Оплата</b-button>
            </b-col>
            <b-col cols="3">
                <b-button
                @click="listStockAll">Склад</b-button>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    listStockAll() {
      this.$store.dispatch('GET_ALL_STOCK_ITEMS');
      this.$router.push('/stockList');
    },
    accountantTab() {
      // this.$store.dispatch('SET_AUTHOR', 'seller');
    },
  },
  mounted() {
    // this.$store.dispatch('SET_EMPTY_STOCK_ITEM');
  },
};
// EXAMPLES //
// //////////////////////////////
// const anonym = function () {
//   console.log('you are anonymous');
// };
// const anonym = () => console.log('are you anonymous');
// const anonym = () => 'we are anonymous';
// const anonym = (message) => {
//   const count = 2;
//   return message + count;
// };
// console.log(anonym('you are anonymous'));
// ////////////////////////////////
// (function () {
//   console.log('Я буду стрелочной функцией');
// })();
// ((message) => console.log(message))('я стрелочная функция');
// ///////////////////////////
// ///////////////////////////
//  async function main() {
//    let user = await getUser(1);
//    console.log(user);
//  };
//  main();
// ///////////////////////////
//  async function getUser(id) {
//     let data = await axios(url);
//     return data;
//  };
// ///////////////////////////
//  const getUser = async function(id) {
//    let data = await axios(url);
//    return data;
//  };
// //////////////////////////////
//  const getUser = async (id) => {
//    let data = await axios(url);
//    return data;
//  };
// /////////////////////////////
//  (async function main() {
//    let user = await getUser(1);
//    console.log(user);
//  })();
// //////////////////////////////
//  (async () => {
//    let user = await getUser(1);
//    console.log(user);
//  })();
// //////////////////////////////

</script>
