<template>
  <b-row>
    <b-row>
    </b-row>
    <b-col>
      <b-table
        small
        striped
        responsive
        :fields="payment_fields"
        :items="listPayments">
        <template v-slot:cell(index)="data">
          {{ data.index + 1}}
        </template>
        <template v-slot:cell(check)="row">
          <b-button variant="outline-dark" @click="editItem(row.index)">...</b-button>
        </template>
        <template v-slot:cell(delete)="row">
          <b-button variant="outline-danger" @click="deleteItem(row.index)">X</b-button>
        </template>
      </b-table>
    </b-col>
  </b-row>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      payment_fields: [
        {
          key: 'index',
          label: 'Номер',
        },
        {
          key: 'payment_date',
          label: 'Дата платежа',
          formatter: 'dateFilter',
        },
        {
          key: 'payment_value',
          label: 'Сумма',
        },
        {
          key: 'comment',
          label: 'Дополнительно',
        },
        {
          key: 'check',
          label: '  ',
        },
        {
          key: 'delete',
          label: ' ',
        },
      ],
    };
  },
  methods: {
    dateFilter(value) {
      return moment(String(value)).format('DD/MM/YYYY');
    },
  },
  computed: {
    listPayments() {
      return this.$store.getters.GET_LIST_PAYMENTS;
    },
  },
};
</script>
