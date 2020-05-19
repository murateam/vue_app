<template>
    <b-container>
        <h3>Главная страница</h3>
        <b-row align-h="start">
            <b-col cols="3">
                <router-link
                class="btn btn-success"
                to="manageTab">Договоры с клиентом</router-link>
            </b-col>
            <b-col cols="3">
                <b-button
                @click="listStockAll">Весь склад</b-button>
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
  },
};
</script>
