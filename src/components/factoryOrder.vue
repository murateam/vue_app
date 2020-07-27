<template>
  <b-container>
    <b-row>
      <b-col>
        <navbar>
        </navbar>
      </b-col>
    </b-row>
    <!-- <b-row class="mt-3" align-h="start">
      <b-col cols="2">
        <router-link
        class="btn btn-dark"
        to="/importTab">Back</router-link>
      </b-col>
    </b-row> -->

    <!-- {{ singleImportOrder }} -->
    <b-row class="mt-3">
      <b-col><h5>ImportOrder</h5></b-col>
    </b-row>
    <b-row align-h="center" class="mt-4">
      <b-col cols="5">
        <h3 v-if="singleImportOrder.import_number != null">
        Order: {{singleImportOrder.import_number}} </h3>
        <h3 v-else>New order</h3>
      </b-col>
    </b-row>
    <b-row align-h="end">
      <b-col cols="4" v-if="singleImportOrder.id != null">
        <p>Created: {{dateFilter(singleImportOrder.created)}}</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card>
          <label for="input-AB">AB</label>
          <b-row>
            <b-col cols="4" align-self="center">
              Number:
            </b-col>
            <b-col>
              <b-input id="input-ab-num"
              v-model=singleImportOrder.AB_num
              placeholder="AB num"></b-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="4" align-self="center">File:</b-col>
            <b-col>
              <b-input class="mt-2" id="input-ab-file"
              v-model=singleImportOrder.AB_file
              placeholder="AB file"></b-input>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col>
        <b-card>
          <label for="input-VAITEK">VAITEK</label>
          <b-row>
            <b-col cols="4" align-self="center">
              Order:
            </b-col>
            <b-col>
              <b-input id="input-VAITEK-order"
              v-model="singleImportOrder.VAITEK_order"
              placeholder="VAITEK order"></b-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="4" align-self="center">Payment:</b-col>
            <b-col>
              <b-input class="mt-2" id="input-VAITEK-payment"
              v-model="singleImportOrder.VAITEK_payment"
              placeholder="VAITEK payment"></b-input>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col>
        <b-card>
          <label for="input-factory-docs">Factory</label>
          <b-row>
            <b-col cols="3" align-self="center">KW:</b-col>
            <b-col>
              <b-input id="input-kw"
              v-model="singleImportOrder.KW"
              placeholder="KW"></b-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="3" align-self="center">TRID:</b-col>
            <b-col>
              <b-input class="mt-2" id="input-trid"
              v-model="singleImportOrder.TRID"
              placeholder="TRID"></b-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="3" align-self="center">TTN</b-col>
            <b-col>
              <b-input class="mt-2" id="input-ttn"
              v-model="singleImportOrder.TTN"
              placeholder="TTN"></b-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="3" align-self="center">Bill</b-col>
            <b-col>
              <b-input class="mt-2" id="input-bill"
              v-model="singleImportOrder.Bill"
              placeholder="Bill"></b-input>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card class="mt-3">
          <label for="input-delivery">Delivery information:</label>
          <b-row>
            <b-col>
              <b-row><b-col>Amount places:</b-col></b-row>
              <b-row class="mt-2">
                <b-col>
                  <b-input id="input-amount-place"
                  v-model="singleImportOrder.amount_place"
                  placeholder="Amount place"></b-input>
                </b-col>
              </b-row>
            </b-col>
            <b-col>
              <b-row><b-col>Volume:</b-col></b-row>
              <b-row class="mt-2">
                <b-col>
                  <b-input id="input-volume"
                  v-model="singleImportOrder.volume"
                  placeholder="Volume"></b-input>
                </b-col>
              </b-row>
            </b-col>
            <b-col>
              <b-row>
                <b-col>Weight:</b-col>
              </b-row>
              <b-row class="mt-2">
                <b-col>
                  <b-input id="input-weight"
                  v-model="singleImportOrder.weight"
                  placeholder="Weight"></b-input>
                </b-col>
              </b-row>
            </b-col>
            <b-col>
              <b-row>
                <b-col>Container number:</b-col>
              </b-row>
              <b-row class="mt-2"><b-col>
                <b-input id="input-container-num"
                v-model="singleImportOrder.container_num"
                placeholder="Container Num"></b-input>
              </b-col></b-row>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
        <b-col cols="2" align-self="center">
          <b-button
          @click="cencel"
          variant="danger">Cancel</b-button>
        </b-col>
        <b-col cols="2" align-self="center">
          <b-button
          @click="saveExistImportOrder"
          variant="primary">Save</b-button>
        </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col cols="2" align-self="center">Comment:</b-col>
      <b-col>
        <b-input id="input-comment"
        v-model="singleImportOrder.comment"
        placeholder=""></b-input>
      </b-col>
    </b-row>
    <b-row align-h="end" class="mt-3">
      <b-col md="auto">Avarage factor:</b-col>
      <b-col cols="1" v-if="averageFactor < 2.5">
        <h5 class="bg-danger text-light">{{ averageFactor }}</h5>
      </b-col>
      <b-col cols="1" v-if="averageFactor >= 2.5">
        <h5 class="bg-success text-light">{{ averageFactor }}</h5>
      </b-col>
    </b-row>
    <b-row class="mt-4" align-h="start">
      <b-col cols="3" v-if="singleImportOrder.status == 'processing'">
        <b-button
          @click="addStockItems"
        >Add Stock Items</b-button>
      </b-col>
      <b-col md="auto" v-if="allowStatus == 'order to factory'">
        <b-button
        @click="requestToFactory"
        variant="success">Send to factory</b-button>
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col>
        <import-modal ref="import-modal"></import-modal>
        <factory-request ref="factory-request"></factory-request>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <stock-table-expanded></stock-table-expanded>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import _ from 'lodash';
import moment from 'moment';
import importModal from './importModalForItemsOrOrders.vue';
import stockTableExpanded from './stockTableExpanded.vue';
import factoryRequest from './factoryRequestModel.vue';
import navbar from './myPage/navbar.vue';

export default {
  name: 'importOrder',
  components: {
    importModal,
    stockTableExpanded,
    factoryRequest,
    navbar,
  },
  methods: {
    dateFilter(value) {
      return moment(String(value)).format('YY-MM-DD');
    },
    async addStockItems() {
      await this.$store.dispatch('SET_BOOL_CHOOSING_IMPORT_ORDERS', false);
      await this.$store.dispatch('SET_BOOL_CHOOSING_STOCK_ITEMS', true);
      await this.$store.dispatch('SET_IS_LIST_USED_IN_IMPORT_ORDER', false);
      await this.$store.dispatch('SET_IS_LIST_EXPANDED', true);
      await this.$store.dispatch('GET_STOCK_ITEMS_EXP');
      this.$refs['import-modal'].show();
    },
    async saveExistImportOrder() {
      this.$store.dispatch('SAVE_EXIST_IMPORT_ORDER', 'processing');
      this.$router.push(this.backStep);
      this.$store.dispatch('SET_CURRENT_STEP', this.backStep);
      this.$store.dispatch('SET_IS_LIST_USED_IN_IMPORT_ORDER', false);
    },
    cencel() {
      this.$router.push(this.backStep);
      this.$store.dispatch('SET_CURRENT_STEP', this.backStep);
      this.$store.dispatch('SET_IS_LIST_USED_IN_IMPORT_ORDER', false);
    },
    checkStatus() {
      this.$store.dispatch('CHECK_STATUS_IMPORT_ORDER');
    },
    requestToFactory() {
      this.$refs['factory-request'].show();
      const listLength = this.listStockItemsForImportOrder.length;
      for (let i = 0; i < listLength; i += 1) {
        const item = _.cloneDeep(this.listStockItemsForImportOrder[i]);
        item.stock_choices = 'in order';
        item.factory_item = item.factory_item.id;
        const savingItem = [];
        savingItem.push('save_correct');
        savingItem.push(item);
        this.$store.dispatch('SAVE_STOCK_ITEM_EXP_VIA_ARRAY', savingItem);
      }
      this.$store.dispatch('SAVE_EXIST_IMPORT_ORDER', 'order to factory');
    },
  },
  created() {
    const importOrder = this.$store.getters.GET_SINGLE_IMPORT_ORDER;
    if (_.isEmpty(importOrder)) {
      this.$store.dispatch('RESET_SINGLE_IMPORT_ORDER');
    }
  },
  computed: {
    backStep() {
      return this.$store.getters.GET_BACK_STEP;
    },
    singleImportOrder() {
      return this.$store.getters.GET_SINGLE_IMPORT_ORDER;
    },
    averageFactor() {
      return this.$store.getters.GET_AVERAGE_FACTOR;
    },
    listStockItemsForImportOrder() {
      return this.$store.getters.GET_LIST_STOCK_ITEMS_EXP_FOR_IMPORT_ORDER;
    },
    getIsListItemsExpUseInImportOrder() {
      return this.$store.getters.GET_IS_LIST_USED_IN_IMPORT_ORDER;
    },
    allowStatus() {
      return this.$store.getters.GET_ALLOWED_STATUS;
    },
  },
  watch: {
    listStockItemsForImportOrder() {
      this.$store.dispatch('CALC_AVARAGE_FACTOR_FOR_IMPORT_ORDER');
      this.checkStatus();
    },
  },
};
</script>
