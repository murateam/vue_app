<template>
  <b-container>
    <client-modal ref="client-modal"></client-modal>
    <b-row align-h="start" class="mt-3">
      <b-col cols="2">
        <router-link
        class="btn btn-dark"
        to="/">На главную</router-link>
      </b-col>
    </b-row>
      <div class="mt-3">
        <div v-if="role == 2">
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
        </div>
        <div v-else>
          <h4>Добавить платежи</h4>
        </div>

        {{ role }}

        <alert-messages ref="alert-message"></alert-messages>

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
          <!-- <template v-slot:cell(price)="data">
            {{ data }}
          </template> -->
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
import alertMessages from './alertMessages.vue';
import clientModal from './clientModal.vue';

export default {
  name: 'manageTab',
  components: {
    alertMessages,
    clientModal,
  },
  data() {
    return {
      showMod: true,
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
      // this.editClientOrder();
      if (this.role === 2) {
        this.editClientOrder();
      } else if (this.role === 3) {
        this.editPayments();
      }
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
    async editPayments() {
      await this.$store.dispatch('GET_LIST_PAYMENTS_FOR_CLIENT_ORDER', this.selected);
      if (this.selected.length > 0) {
        this.$store.dispatch('CALCULATE_PRICE_FOR_CLIENT_ORDER', this.selected);
        this.$router.push('./singleClientOrder');
      }
    },
  },
  mounted() {
    this.$store.dispatch('GET_LIST_CLIENT_ORDERS');
  },
  computed: {
    role() {
      return this.$store.getters.GET_AUTHOR;
    },
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
