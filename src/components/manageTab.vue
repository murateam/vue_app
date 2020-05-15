<template>
  <div class="container">
        <!-- <client-modal />
        <new-client-order-modal></new-client-order-modal>
        <single-client-order-modal
        ref="single-client-order-modal"></single-client-order-modal> -->
      <div class="mt-3">
        <!-- <b-button-group class="">
          <div v-if="selected.length">
            <button
              @click="editClientOrder"
              type="button"
              id="order-edit"
              class="btn btn-primary btn-sm align=left d-block">Подробнее</button>
          </div>
          <div v-else>
            <button
              @click="$bvModal.show('client-order-modal')"
              type="button"
              id="order-add"
              class="btn btn-secondary btn-sm align=left d-block">Создать заказ</button>
          </div>
          <button
            @click="$bvModal.show('client-modal')"
            type="button"
            id="clien-add"
            class="btn btn-success btn-sm align=left d-block">Добавить заказчика</button>
        </b-button-group> -->
        <b-button-group class="">
          <!-- <div v-if="selected.length">
            <button
              @click="editClientOrder"
              type="button"
              id="order-edit"
              class="btn btn-primary btn-sm align=left d-block">Подробнее</button>
          </div>
          <div v-else>
            <button
              @click="$bvModal.show('client-order-modal')"
              type="button"
              id="order-add"
              class="btn btn-secondary btn-sm align=left d-block">Создать заказ</button>
          </div> -->
          <div>
            <button
              @click="$bvModal.show('client-order-modal')"
              type="button"
              id="order-add"
              class="btn btn-secondary btn-sm align=left d-block">Создать заказ</button>
          </div>
          <button
            @click="$bvModal.show('client-modal')"
            type="button"
            id="clien-add"
            class="btn btn-success btn-sm align=left d-block">Добавить заказчика</button>
        </b-button-group>

        <!-- <div>{{ clientOrders }}</div> -->
        <!-- <div>{{ selected }}</div> -->

        <!-- <b-table
          class="mt-3"
        ref="manageTable"
        striped hover small
        :items="clientOrders"
        :fields="fields"
        selectable
        select-mode="single"
        @row-selected="onRowSelected">
          <template v-slot:cell(author)="data">
            {{ data.item.author.username }}
          </template>
        </b-table> -->
      </div>
  </div>
</template>

<script>
import moment from 'moment';
// import newClientOrderModal from './newClientOrderModal.vue';
// import clientModal from './clientModal.vue';
// import singleClientOrderModal from './singleClientOrderModal.vue';

export default {
  name: 'manageTab',
  components: {
    // clientModal,
    // newClientOrderModal,
    // singleClientOrderModal,
  },
  data() {
    return {
      selected: [],
      tmp: [],
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
    editClientOrder() {
      if (this.selected.length > 0) {
        this.tmp = this.selected;
      }
      this.$store.dispatch('GET_SINGLE_CLIENT_ORDER', this.tmp[0].id);
      this.$store.dispatch('GET_ORDER_ITEMS', this.tmp[0].id);
      this.$refs['single-client-order-modal'].show();
      this.$refs.manageTable.clearSelected();
    },
    // getClientOrders() {
    //   axios.get(clientOrderURL).then((response) => {
    //     this.clientOrders = response.data;
    //   });
    // },
  },
  created() {
    // this.getClientOrders();
    // console.log('clientOrders', this.clientOrders);
  },
  mounted() {
    this.$store.dispatch('GET_LIST_CLIENT_ORDERS');
  },
  computed: {
    clientOrders() {
      return this.$store.getters.GET_LIST_CLIENT_ORDERS;
    },
  },
};
</script>
