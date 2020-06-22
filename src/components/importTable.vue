<template>
    <b-container>
        <b-row align-h="start" class="mt-3"
          v-if="boolChoosingImportOrders == false"
        >
            <b-col cols="2">
                <router-link
                class="btn btn-dark"
                to="/">Home</router-link>
            </b-col>
        </b-row>
        <b-row align-h="center"
          v-if="boolChoosingImportOrders == false"
        >
            <b-col cols="3">
                <button
                  @click="addImportOrder"
                  type="button"
                  id="order-add"
                  class="btn btn-secondary btn-sm align=left d-block"
                >Create order</button>
              </b-col>
        </b-row>
        <!-- {{ listImportOrders }} -->
        <b-row class="mt-3">
            <b-col>
                <b-table
                  ref="importOrdersTab"
                  striped hover small
                  responsive
                  :fields="fields"
                  :items="listImportOrders"
                  selectable
                  select-mode="single"
                  @row-selected="onRowSelected"
                >
                    <template v-slot:cell(index)="data">
                    {{ data.index + 1}}
                    </template>
                </b-table>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import moment from 'moment';

export default {
  components: {
  },
  name: 'importTab',
  data() {
    return {
      fields: [
        {
          key: 'index',
        },
        {
          key: 'import_number',
        },
        {
          key: 'created',
          formatter: 'dateFilter',
        },
        {
          key: 'AB_num',
        },
        {
          key: 'VAITEK_order',
        },
        {
          key: 'VAITEK_payment',
        },
        {
          key: 'KW',
        },
        {
          key: 'TRID',
        },
        {
          key: 'TTN',
        },
        {
          key: 'bill',
        },
        {
          key: 'amount_place',
        },
        {
          key: 'volume',
        },
        {
          key: 'weight',
        },
        {
          key: 'container_num',
        },
      ],
      selected: [],
    };
  },
  methods: {
    dateFilter(value) {
      return moment(String(value)).format('DD-MM-YYYY');
    },
    async addImportOrder() {
      await this.$store.dispatch('SAVE_NEW_IMPORT_ORDER');
      this.$router.push('./importOrder');
    },
    editImportOrder() {
      if (this.selected.length > 0) {
        this.$store.dispatch('SET_SINGLE_IMPORT_ORDER', this.selected[0]);
        this.$router.push('./importOrder');
      }
      this.$refs.importOrdersTab.clearSelected();
      this.$store.dispatch('SET_BOOL_CHOOSING_IMPORT_ORDERS', false);
    },
    async addStockItemsToImportOrder() {
      if (this.selected.length > 0) {
        await this.$store.dispatch('SET_SINGLE_IMPORT_ORDER', this.selected[0]);
        this.$store.dispatch('ADD_ITEMS_TO_IMPORT_ORDER');
      }
      this.$refs.importOrdersTab.clearSelected();
      this.$store.dispatch('SET_BOOL_CHOOSING_IMPORT_ORDERS', false);
    },
    onRowSelected(items) {
      this.selected = items;
      if (this.role === 4) {
        if (this.boolChoosingImportOrders === true) {
          this.addStockItemsToImportOrder();
        } else {
          this.editImportOrder();
        }
      }
      // else if (this.role === 3) {
      //   this.editPayments();
      // }
    },
  },
  computed: {
    listImportOrders() {
      return this.$store.getters.GET_LIST_IMPORT_ORDERS;
    },
    role() {
      return this.$store.getters.GET_AUTHOR;
    },
    boolChoosingImportOrders() {
      return this.$store.getters.GET_BOOL_CHOOSING_IMPORT_ORDERS;
    },
  },
};
</script>
