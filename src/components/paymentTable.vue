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
          <b-button
          size="sm"
          variant="outline-dark" @click="editPayment(row.index)">...</b-button>
        </template>
        <template v-slot:cell(delete)="row">
          <b-button
          size="sm"
          variant="outline-danger" @click="deletePayment(row.index)">X</b-button>
        </template>
      </b-table>
      <payment-modal ref="payment-modal"></payment-modal>
    </b-col>
  </b-row>
</template>

<script>
import moment from 'moment';
import paymentModal from './paymentModal.vue';

export default {
  components: {
    paymentModal,
  },
  data() {
    return {
      payment_fields: [
        {
          key: 'index',
          label: 'Number',
        },
        {
          key: 'payment_date',
          label: 'Payment date',
          formatter: 'dateFilter',
        },
        {
          key: 'payment_value',
          label: 'Payment amount',
        },
        {
          key: 'comment',
          label: 'Comment',
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
      return moment(String(value)).format('YY-MM-DD');
    },
    async editPayment(index) {
      await this.$store.dispatch('SET_CURRENT_PAYMENT_BY_INDEX', index);
      await this.$store.dispatch('SET_IS_NEW_PAYMENT', false);
      this.$refs['payment-modal'].show();
    },
    deletePayment(index) {
      this.$store.dispatch('DELETE_PAYMENT', index);
    },
  },
  computed: {
    listPayments() {
      return this.$store.getters.GET_LIST_PAYMENTS;
    },
  },
};
</script>
