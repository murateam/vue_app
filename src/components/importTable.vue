<template>
    <b-container>
        <b-row align-h="start" class="mt-3">
            <b-col cols="2">
                <router-link
                class="btn btn-dark"
                to="/">На главную</router-link>
            </b-col>
        </b-row>
        <b-row align-h="center">
            <b-col cols="3">
                <button
                  @click="addImportOrder"
                  type="button"
                  id="order-add"
                  class="btn btn-secondary btn-sm align=left d-block"
                >Создать заказ</button>
              </b-col>
        </b-row>
        {{ listImportOrders }}
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
    addImportOrder() {
      this.$store.dispatch('RESET_SINGLE_IMPORT_ORDER');
      this.$router.push('./importOrder');
    },
    editImportOrder() {
      if (this.selected.length > 0) {
        this.$store.dispatch('GET_IMPORT_ORDER_BY_INDEX', this.selected[0]);
        this.$router.push('./importOrder');
      }
      this.$refs.importOrdersTab.clearSelected();
    },
    onRowSelected(items) {
      this.selected = items;
      if (this.role === 4) {
        this.editImportOrder();
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
  },
};
</script>
