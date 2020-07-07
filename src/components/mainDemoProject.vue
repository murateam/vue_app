<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <navbar>
          </navbar>
        </b-col>
      </b-row>
        <h3 class="mt-5 mb-5">Demo project</h3>
        <b-card-group deck>
                  <b-card
                    :img-src="require('../assets/01.svg')"
                    img-alt="image"
                    img-top
                  >
                    <b-list-group flush>
                      <b-list-group-item>
                        <b-button
                          variant="success"
                          @click="manageTab"
                        >Clients orders
                        </b-button>
                      </b-list-group-item>
                    </b-list-group>
                </b-card>
                <b-card
                  :img-src="require('../assets/02.svg')"
                  img-alt="image"
                  img-top
                >
                  <b-list-group flush>
                    <b-list-group-item>
                      <b-button @click="accountantTab">Payments for orders</b-button>
                    </b-list-group-item>
                  </b-list-group>
                </b-card>
                <b-card
                  :img-src="require('../assets/04.svg')"
                  img-alt="image"
                  img-top
                >
                  <b-list-group flush>
                    <b-list-group-item>
                      <b-button
                        @click="listStockAll">Warehouse
                      </b-button>
                    </b-list-group-item>
                  </b-list-group>
                </b-card>
                <b-card
                    :img-src="require('../assets/03.svg')"
                    img-alt="image"
                    img-top
                >
                  <b-list-group flush>
                    <b-list-group-item>
                      <b-button
                        @click="importOrdersTab"
                        cols="3">Import Orders
                      </b-button>
                    </b-list-group-item>
                    <b-list-group-item>
                      <b-button
                        class="mt-3"
                        @click="stockTableExpanded"
                      >Products for import</b-button>
                    </b-list-group-item>
                  </b-list-group>
                </b-card>
        </b-card-group>
    </b-container>
  </div>
</template>

<script>
import navbar from './myPage/navbar.vue';

export default {
  name: 'Home',
  components: {
    navbar,
  },
  methods: {
    async manageTab() {
      await this.$store.dispatch('SET_AUTHOR', 'seller');
      this.$router.push('/manageTab');
    },
    async listStockAll() {
      await this.$store.dispatch('SET_IS_LIST_EXPANDED', false);
      await this.$store.dispatch('SET_AUTHOR', 'import');
      this.$store.dispatch('GET_ALL_STOCK_ITEMS');
      this.$router.push('/stockList');
    },
    async accountantTab() {
      await this.$store.dispatch('SET_AUTHOR', 'accountant');
      this.$router.push('/manageTab');
    },
    async importOrdersTab() {
      await this.$store.dispatch('SET_AUTHOR', 'import');
      await this.$store.dispatch('GET_LIST_IMPORT_ORDERS');
      this.$store.dispatch('SET_BOOL_CHOOSING_IMPORT_ORDERS', false);
      this.$store.dispatch('SET_BOOL_CHOOSING_STOCK_ITEMS', false);
      this.$router.push('/importTab');
    },
    async stockTableExpanded() {
      await this.$store.dispatch('SET_AUTHOR', 'import');
      await this.$store.dispatch('SET_IS_LIST_EXPANDED', true);
      this.$store.dispatch('SET_IS_LIST_USED_IN_IMPORT_ORDER', false);
      this.$store.dispatch('GET_STOCK_ITEMS_EXP');
      this.$router.push('/stockList');
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
