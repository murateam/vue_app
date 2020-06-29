<template>
  <b-container>
    <b-row class="mt-3" align-h="start">
      <b-col cols="2">
        <router-link
        class="btn btn-dark"
        to="/importTab">Назад</router-link>
      </b-col>
    </b-row>
    {{ singleImportOrder }}
    <b-row>
      <b-col>ImportOrder</b-col>
    </b-row>
    <b-row align-h="center" class="mt-4">
      <b-col cols="5">
        <h3 v-if="singleImportOrder.import_number != null">
        Заказ: {{singleImportOrder.import_number}} </h3>
        <h3 v-else>Новый заказ</h3>
      </b-col>
    </b-row>
    <b-row align-h="end">
      <b-col cols="4" v-if="singleImportOrder.id != null">
        <p>Создан: </p>
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
              Заказ:
            </b-col>
            <b-col>
              <b-input id="input-VAITEK-order"
              v-model="singleImportOrder.VAITEK_order"
              placeholder="VAITEK order"></b-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="4" align-self="center">Платежка:</b-col>
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
          <label for="input-factory-docs">Фабрика</label>
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
          <label for="input-delivery">Данные по доставке:</label>
          <b-row>
            <b-col>
              <b-row><b-col>Колличество мест</b-col></b-row>
              <b-row class="mt-2">
                <b-col>
                  <b-input id="input-amount-place"
                  v-model="singleImportOrder.amount_place"
                  placeholder="Amount place"></b-input>
                </b-col>
              </b-row>
            </b-col>
            <b-col>
              <b-row><b-col>Объем</b-col></b-row>
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
                <b-col>Вес</b-col>
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
                <b-col>Номер контейнера</b-col>
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
          variant="danger">Отмена</b-button>
        </b-col>
        <b-col cols="2" align-self="center">
          <b-button
          variant="primary">Сохранить</b-button>
        </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col cols="2">Дополнительно:</b-col>
      <b-col>
        <b-input id="input-comment"
        v-model="singleImportOrder.comment"
        placeholder=""></b-input>
      </b-col>
    </b-row>
    <b-row class="mt-3" align-h="start">
      <b-col cols="3">
        <b-button
          @click="addStockItems"
        >Add Stock Items</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <import-modal ref="import-modal"></import-modal>
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
import importModal from './importModalForItemsOrOrders.vue';
import stockTableExpanded from './stockTableExpanded.vue';

export default {
  name: 'importOrder',
  components: {
    importModal,
    stockTableExpanded,
  },
  methods: {
    async addStockItems() {
      await this.$store.dispatch('SET_BOOL_CHOOSING_IMPORT_ORDERS', false);
      await this.$store.dispatch('SET_BOOL_CHOOSING_STOCK_ITEMS', true);
      await this.$store.dispatch('SET_IS_LIST_USED_IN_IMPORT_ORDER', false);
      await this.$store.dispatch('SET_IS_LIST_EXPANDED', true);
      await this.$store.dispatch('GET_STOCK_ITEMS_EXP');
      this.$refs['import-modal'].show();
    },
  },
  created() {
    const importOrder = this.$store.getters.GET_SINGLE_IMPORT_ORDER;
    if (_.isEmpty(importOrder)) {
      this.$store.dispatch('RESET_SINGLE_IMPORT_ORDER');
    }
  },
  computed: {
    singleImportOrder() {
      return this.$store.getters.GET_SINGLE_IMPORT_ORDER;
    },
  },
};
</script>
