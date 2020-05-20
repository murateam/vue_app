<template>
    <div>
        <stock-item-modal ref="stock-item-modal"></stock-item-modal>
        <b-button
          class="mt-3"
          @click="showStockItemModal">Добавить позицию</b-button>
          <!-- $bvModal.show('stockItemModal') -->
          <!-- <div>{{currentStockItem}}</div> -->
          <div>{{listItems}}</div>
          <div>{{listDelete}}</div>
        <stock-table class="mt-3"></stock-table>
    </div>
</template>

<script>
import stockTable from './stockTable.vue';
import stockItemModal from './stockItemModal.vue';

export default {
  name: 'stockList',
  components: {
    stockTable,
    stockItemModal,
  },
  data() {
    return {
    };
  },
  methods: {
    showStockItemModal() {
      this.$refs['stock-item-modal'].show();
    },
  },
  // mounted() {
  //   this.$store.dispatch('GET_ALL_ITEMS');
  // },
  computed: {
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
