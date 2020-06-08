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
                small
                :fields="fields"
                :items="listImportOrders"
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
      ],
    };
  },
  methods: {
    dateFilter(value) {
      return moment(String(value)).format('DD-MM-YYYY');
    },
  },
  computed: {
    listImportOrders() {
      return this.$store.getters.GET_LIST_IMPORT_ORDERS;
    },
  },
};
</script>
