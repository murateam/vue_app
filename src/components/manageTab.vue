<template>
  <b-container>
    <b-row>
      <b-col>
        <navbar>
        </navbar>
      </b-col>
    </b-row>
    <client-modal ref="client-modal"></client-modal>
    <!-- <b-row align-h="start" class="mt-3">
      <b-col cols="2">
        <router-link
        class="btn btn-dark"
        to="/mainDemoProject">Home</router-link>
      </b-col>
    </b-row> -->
      <div class="mt-3">
        <div v-if="role == 2">
          <b-button-group class="">
            <button
              @click="newClientOrder"
              type="button"
              id="order-add"
              class="btn btn-secondary btn-sm align=left d-block">Create order</button>
            <button
              @click="newClient"
              type="button"
              id="clien-add"
              class="btn btn-success btn-sm align=left d-block">New customer</button>
          </b-button-group>
        </div>
        <div v-else>
          <h4>Payments table</h4>
        </div>


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
          <template v-slot:cell(author)="data">
            {{ data.item.author.username }}
          </template>
          <template v-if="role == 2" v-slot:cell(import)="data">
            <template v-if="data.item.state == 'published'">
              {{ dateFilter(data.item.when_published) }}
            </template>
            <template v-else>
              <div
                v-if="data.item.payment_status == 'waiting for payment'">
                Waiting for payment</div>
              <div v-else>
                <b-button
                  size="sm"
                  class="btn btn-success"
                  @click="sendToImport(data.item)"
                >to Import
                </b-button>
              </div>
            </template>
          </template>
        </b-table>
      </div>
  </b-container>
</template>

<script>
import moment from 'moment';
import alertMessages from './alertMessages.vue';
import clientModal from './clientModal.vue';
import navbar from './myPage/navbar.vue';

export default {
  name: 'manageTab',
  components: {
    alertMessages,
    clientModal,
    navbar,
  },
  data() {
    return {
      showMod: true,
      selected: [],
      fields: [
        {
          key: 'public_num',
          label: 'Public number',
        },
        {
          key: 'client',
          label: 'Client',
          formatter: 'nameClientShort',
        },
        {
          key: 'state',
          label: 'State',
          formatter: 'stateFilter',
        },
        {
          key: 'price',
          label: 'Price',
        },
        {
          key: 'total_payment',
          label: 'Total payment',
        },
        {
          key: 'created',
          label: 'Created',
          formatter: 'dateFilter',
        },
        {
          key: 'import',
          label: 'Import',
        },
        {
          key: 'designer',
          label: 'Designer',
        },
        {
          key: 'show_details',
          label: 'Order details',
        },
        {
          key: 'docs',
          label: 'Docs',
        },
      ],
    };
  },
  methods: {
    dateFilter(value) {
      return moment(String(value)).format('YY-MM-DD');
    },
    stateFilter(value) {
      let state = '';
      if (value === 'draft') {
        state = 'Draft';
      } else {
        state = 'Published';
      }
      return state;
    },
    async sendToImport(item) {
      await this.$store.dispatch('GET_CURRENT_RATE');
      this.$store.dispatch('TO_IMPORT', item);
    },
    nameClientShort(value) {
      return `${value.last_name} ${value.first_name.charAt(0)}.`;
    },
    onRowSelected(items) {
      this.selected = items;
      if (this.role === 2) {
        this.editClientOrder();
      } else if (this.role === 3) {
        this.editPayments();
      }
    },
    newClient() {
      this.$store.dispatch('RESET_CURRENT_CLIENT');
      this.$refs['client-modal'].show();
    },
    newClientOrder() {
      this.$store.dispatch('SET_CAN_CHANGE_CLIENT', true);
      this.$store.dispatch('RESET_CURRENT_CLIENT');
      this.$store.dispatch('RESET_LIST_ITEMS');
      this.$router.push('./singleClientOrder');
    },
    editClientOrder() {
      this.$store.dispatch('SET_CAN_CHANGE_CLIENT', false);
      if (this.selected.length > 0) {
        this.$store.dispatch('CALCULATE_PRICE_FOR_CLIENT_ORDER', this.selected);
        this.$router.push('/singleClientOrder');
        this.$store.dispatch('SET_CURRENT_STEP', '/singleClientOrder');
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
