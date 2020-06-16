<template>
    <b-modal
      @hidden="reset"
      size="xl"
      id="importModal"
      ref="importModal"
      hide-footer
    >
      <b-container>
          <h5>IMPORT MODAL</h5>
          <import-table v-if="boolChoosingImportTable"></import-table>
      </b-container>
    </b-modal>
</template>

<script>
import importTable from './importTable.vue';

export default {
  components: {
    importTable,
  },
  methods: {
    show() {
      this.$refs.importModal.show();
    },
    hide() {
      this.$refs.importModal.hide();
    },
    reset() {
      this.$store.dispatch('SET_BOOL_CHOOSING_IMPORT_TABLE', false);
      this.$store.dispatch('SET_BOOL_CHOOSING_STOCK_ITEMS', false);
    },
  },
  computed: {
    boolChoosingImportTable() {
      return this.$store.getters.GET_BOOL_CHOOSING_IMPORT_TABLE;
    },
  },
};
</script>
