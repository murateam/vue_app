<template>
    <b-modal
      @hide="reset"
      size="xl"
      id="import-madal"
      ref="import-modal"
      hide-footer
    >
      <b-container>
          <h5>IMPORT MODAL</h5>
          <import-table v-if="boolChoosingImportOrders"></import-table>
          <stock-table-expanded
            v-if="boolChoosingStockItems"
          ></stock-table-expanded>
      </b-container>
    </b-modal>
</template>

<script>
import importTable from './importTable.vue';
// import stockTableExpanded from './stockTableExpanded.vue';

export default {
  name: 'importModal',
  components: {
    'import-table': importTable,
    stockTableExpanded: () => import('./stockTableExpanded.vue'),
  },
  methods: {
    show() {
      this.$refs['import-modal'].show();
    },
    hide() {
      this.$refs['import-modal'].hide();
    },
    toggle() {
      this.$refs['import-modal'].toggle();
    },
    reset() {
      this.$store.dispatch('SET_BOOL_CHOOSING_IMPORT_ORDERS', false);
      this.$store.dispatch('SET_BOOL_CHOOSING_STOCK_ITEMS', false);
      this.$store.dispatch('SET_IS_LIST_USED_IN_IMPORT_ORDER', true);
    },
  },
  computed: {
    boolChoosingImportOrders() {
      return this.$store.getters.GET_BOOL_CHOOSING_IMPORT_ORDERS;
    },
    boolChoosingStockItems() {
      return this.$store.getters.GET_BOOL_CHOOSING_STOCK_ITEMS;
    },
  },
};
</script>
