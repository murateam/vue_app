<template>
    <b-container fluid>
      <b-row align-h="start" class="mt-3">
        <b-col cols="2">
          <b-button
            class="btn btn-dark"
            @click="backHome"
          >На главную</b-button>
          <!-- <router-link
          class="btn btn-dark"
          to="/">На главную</router-link> -->
        </b-col>
      </b-row>
      <div v-if="isListExpanded == false">
        <b-row>
          <b-col v-if="role == 2">
            <stock-item-modal ref="stock-item-modal"></stock-item-modal>
            <b-button
              class="mt-3"
              @click="showStockItemModal">Добавить позицию</b-button>
          </b-col>
        </b-row>
        <b-row><b-col>
          <stock-table class="mt-3"></stock-table>
        </b-col></b-row>
      </div>
      <div  v-else>
        <b-row class="mt-3">
          <b-col>
            <stock-table-expanded></stock-table-expanded>
          </b-col>
        </b-row>
      </div>
      <!-- {{ isListExpanded }} -->
    </b-container>
</template>

<script>
import stockTable from './stockTable.vue';
import stockItemModal from './stockItemModal.vue';
import stockTableExpanded from './stockTableExpanded.vue';

export default {
  name: 'stockList',
  components: {
    stockTable,
    stockItemModal,
    stockTableExpanded,
  },
  data() {
    return {
    };
  },
  methods: {
    backHome() {
      this.$store.dispatch('SET_IS_LIST_EXPANDED', false);
      this.$router.push('/');
    },
    showStockItemModal() {
      this.$refs['stock-item-modal'].show();
    },
  },
  // mounted() {
  //   this.$store.dispatch('GET_ALL_ITEMS');
  // },
  computed: {
    role() {
      return this.$store.getters.GET_AUTHOR;
    },
    isListExpanded() {
      return this.$store.getters.GET_IS_LIST_EXPANDED;
    },
    listItems() {
      return this.$store.getters.GET_LIST_STOCK_ITEMS;
    },
    listDelete() {
      return this.$store.getters.GET_DELETE_LIST_ITEMS;
    },
    currentStockItem() {
      return this.$store.getters.GET_CURRENT_STOCK_ITEM;
    },
  },
};
</script>
