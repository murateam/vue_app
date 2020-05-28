<template>
  <b-container>
    <client-modal ref="client-modal"></client-modal>
    <single-client-order-modal
      ref="single-client-order-modal"
    ></single-client-order-modal>
    <b-row align-h="start" class="mt-3">
      <b-col cols="2">
        <router-link
        class="btn btn-dark"
        to="/">На главную</router-link>
      </b-col>
    </b-row>
      <div class="mt-3">
        <b-button-group class="">
          <button
            @click="newClientOrder"
            type="button"
            id="order-add"
            class="btn btn-secondary btn-sm align=left d-block">Создать заказ</button>
          <button
            @click="newClient"
            type="button"
            id="clien-add"
            class="btn btn-success btn-sm align=left d-block">Добавить заказчика</button>
        </b-button-group>

        <div>{{ singleClientOrder }}</div>
        <!-- <div>{{ selected }}</div> -->

        <b-table
          class="mt-3"
        ref="manageTable"
        striped hover small
        responsive
        :items="clientOrders"
        :fields="fields"
        selectable
        select-mode="single"
        @row-selected="onRowSelected">
          <template v-slot:cell(author)="data">
            {{ data.item.author.username }}
          </template>
          <template v-slot:cell(send)>
            <div>когда отправлен в импорт или кнопка "отправить" в импорт</div>
          </template>
        </b-table>
      </div>
  </b-container>
</template>

<script>
import moment from 'moment';
import clientModal from './clientModal.vue';
import singleClientOrderModal from './singleClientOrderModal.vue';

export default {
  name: 'manageTab',
  components: {
    clientModal,
    singleClientOrderModal,
  },
  data() {
    return {
      selected: [],
      fields: [
        {
          key: 'public_num',
          label: 'Номер договора',
        },
        {
          key: 'client',
          label: 'Заказчик',
          formatter: 'nameClientShort',
        },
        {
          key: 'status',
          label: 'Состояние',
        },
        {
          key: 'price',
          label: 'Цена',
        },
        {
          key: 'total_payment',
          label: 'Оплачено',
        },
        {
          key: 'created',
          label: 'Создан',
          formatter: 'dateFilter',
        },
        {
          key: 'send',
          label: 'Отправлен',
        },
        {
          key: 'designer',
          label: 'Дизайнер',
        },
        {
          key: 'show_details',
          label: 'Детали заказа',
        },
        {
          key: 'docs',
          label: 'Документы',
        },
      ],
    };
  },
  methods: {
    dateFilter(value) {
      return moment(String(value)).format('DD/MM/YYYY');
    },
    nameClientShort(value) {
      return `${value.last_name} ${value.first_name.charAt(0)}. ${value.middle_name.charAt(0)}.`;
    },
    onRowSelected(items) {
      this.selected = items;
      this.editClientOrder();
    },
    newClient() {
      this.$store.dispatch('RESET_CURRENT_CLIENT');
      this.$refs['client-modal'].show();
      // "$bvModal.show('client-modal')";
    },
    newClientOrder() {
      this.$store.dispatch('SET_CAN_CHANGE_CLIENT', true);
      // this.$store.dispatch('RESET_CLIENT_ORDER');
      this.$store.dispatch('RESET_CURRENT_CLIENT');
      this.$store.dispatch('RESET_LIST_ITEMS');
      this.$router.push('./singleClientOrder');
      // this.$refs['single-client-order-modal'].show();
      // $bvModal.show('single-client-order-modal');
    },
    editClientOrder() {
      this.$store.dispatch('SET_CAN_CHANGE_CLIENT', false);
      if (this.selected.length > 0) {
        this.$store.dispatch('CALCULATE_PRICE_FOR_CLIENT_ORDER', this.selected);
        // this.$store.dispatch('GET_SINGLE_CLIENT_ORDER', this.selected[0].id);
        // this.$store.dispatch('GET_LIST_STOCK_ITEMS_CLIENT_ORDER', this.selected[0].id);
        // this.$store.dispatch('CALCULATE_PRICE_OF_CLIENT_ORDER');
        // this.$refs['single-client-order-modal'].show();
        this.$router.push('./singleClientOrder');
      }
      this.$refs.manageTable.clearSelected();
    },
  },
  mounted() {
    this.$store.dispatch('GET_LIST_CLIENT_ORDERS');
  },
  computed: {
    singleClient() {
      return this.$store.getters.GET_SINGLE_CLIENT;
    },
    clientOrders() {
      return this.$store.getters.GET_LIST_CLIENT_ORDERS;
    },
    singleClientOrder() {
      return this.$store.getters.GET_SINGLE_CLIENT_ORDER;
    },
  },
};
</script>
