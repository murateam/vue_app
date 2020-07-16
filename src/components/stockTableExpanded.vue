<template>
  <b-container>
    <b-row align-h="start">
      <b-col cols="2" v-if="boolChoosingStockItems">
        <b-button
          id="addItems"
          :disabled="canAdd()"
          @click="addItems"
        >Add</b-button>
      </b-col>
      <b-col cols="2"
        v-if="importOrder.status == 'processing'"
      >
        <b-button
          :disabled="canEdit()"
          @click="editStockItem"
        >Edit item</b-button>
      </b-col>
      <b-col cols="2" v-if="isListUsedInImportOrder">
        <b-button
          v-if="importOrder.status == 'processing'"
          :disabled="canAdd()"
          @click="deleteStockItemFromImportOrder"
        >Delete item</b-button>
      </b-col>
      <b-col cols="2" v-if="isListUsedInImportOrder == false">
        <b-button
        v-if="boolChoosingStockItems == false"
        :disabled="canAdd()"
        @click="addItemsToNewOrder"
        >Add to new order</b-button>
      </b-col>
      <b-col cols="2" v-if="isListUsedInImportOrder == false">
        <b-button
        v-if="boolChoosingStockItems == false"
        :disabled="canAdd()"
        @click="addItemsToExistOrder"
        >Add to exist order</b-button>
      </b-col>
    </b-row>
    <b-row align-h="end">
      <b-col cols="2" class="bg-success text-light">{{ bankEurRate.RUB }}</b-col>
      <!-- {{ selected }} -->
    </b-row>
    <b-row class="mt-3">
      <!-- {{ stockItems }} -->
      <b-col>
        <b-table
        small striped
        responsive
        :fields="fields"
        :items="stockItems"
        selectable
        select-mode="multi"
        @row-selected="onRowSelected">
        <template v-slot:cell(select)="{ rowSelected }">
          <template v-if="rowSelected">
            <span>&check;</span>
          </template>
          <template v-else>
            <span>&nbsp;</span>
          </template>
        </template>
        <template v-slot:cell(index)="data">
          {{ data.index + 1}}
        </template>
        <template v-slot:cell(client_order)="data">
          {{ data.item.client_order.public_num }}
        </template>
        <template v-slot:cell(factory)="data">
          <template v-if="data.item.incorrect_factory.length == 0">
            {{ data.item.factory_item.factory_collection.factory.name }}
          </template>
          <template v-else>
            {{ data.item.incorrect_factory.split('&')[0] }}
          </template>
        </template>
        <template v-slot:cell(collection)="data">
          <template v-if="data.item.incorrect_factory.length == 0">
            {{ data.item.factory_item.factory_collection.name }}
          </template>
          <template v-else>
            {{ data.item.incorrect_factory.split('&')[1] }}
          </template>
        </template>
        <template v-slot:cell(catalogue_num)="data">
          <template v-if="data.item.incorrect_factory.length == 0">
            {{ data.item.factory_item.catalogue_number }}
          </template>
          <template v-else>
            {{ data.item.incorrect_factory.split('&')[2] }}
          </template>
        </template>
        <template v-slot:cell(amount)="data">
          {{ data.item.items_amount }}
        </template>
        <template v-slot:cell(price)="data">
          {{ data.item.current_price_eur }}
        </template>
        <template v-slot:cell(state)="data">
          {{ data.item.stock_choices }}
        </template>
        <template v-slot:cell(check)="row" v-if="role == 2">
          <b-button
          size="sm"
          v-if="row.item.stock_choices == 'cancel'"
          variant="outline-dark" @click="editItem(row.index)">...</b-button>
        </template>
        <template v-slot:cell(delete)="row" v-if="role == 2">
          <b-button
          size="sm"
          v-if="row.item.stock_choices == 'cancel'"
          variant="outline-danger" @click="deleteItem(row.index)">
          X</b-button>
        </template>
        </b-table>
        <import-modal
        ref="import-modal"></import-modal>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import _ from 'lodash';
import importModal from './importModalForItemsOrOrders.vue';

export default {
  name: 'stockTableExpanded',
  components: {
    'import-modal': importModal,
  },
  data() {
    return {
      selected: [],
      fields: [
        {
          key: 'select',
          label: ' ',
        },
        {
          key: 'index',
          label: 'Номер',
        },
        {
          key: 'client_order',
          label: 'Договор клиента',
        },
        {
          key: 'factory',
          label: 'Фабрика',
        },
        {
          key: 'collection',
          label: 'Коллекция',
        },
        {
          key: 'catalogue_num',
          label: 'Catalogue num',
        },
        {
          key: 'is_correct',
        },
        {
          key: 'amount',
          label: 'Amount',
        },
        {
          key: 'price',
          label: 'Price',
        },
        {
          key: 'Total price',
        },
        {
          key: 'factor',
          label: 'Factor',
        },
        {
          key: 'state',
          label: 'Current state',
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
  created() {
    const importOrder = this.$store.getters.GET_SINGLE_IMPORT_ORDER;
    if (_.isEmpty(importOrder)) {
      this.$store.dispatch('RESET_SINGLE_IMPORT_ORDER');
    }
  },
  methods: {
    canEdit() {
      let edit = true;
      if (this.selected.length === 1) {
        edit = false;
      } else {
        edit = true;
      }
      return edit;
    },
    canAdd() {
      let edit = true;
      if (this.selected.length > 0) {
        edit = false;
      } else {
        edit = true;
      }
      return edit;
    },
    async editStockItem() {
      await this.$store.dispatch('SET_SINGLE_STOCK_ITEM_EXP', this.selected[0]);
      this.$store.dispatch('GET_LIST_NAME_FACTORIES');
      this.$router.push('/stockItemExp');
      this.$store.dispatch('SET_CURRENT_STEP', '/stockItemExp');
      if (this.isListUsedInImportOrder === false) {
        this.$store.dispatch('SET_NAV_ROUTE', 4);
      }
    },
    onRowSelected(items) {
      this.selected = items;
    },
    editItem(index) {
      this.$store.dispatch('SET_CURRENT_STOCK_ITEM_BY_INDEX', index);
      this.$store.dispatch('SET_IS_NEW_STOCK_ITEM', false);
    },
    async addItemsToNewOrder() {
      await this.$store.dispatch('SAVE_NEW_IMPORT_ORDER');
      await this.$store.dispatch('RESET_LIST_STOCK_ITEMS_FOR_IMPORT_ORDER');
      await this.$store.dispatch('SET_LIST_STOCK_ITEMS_BEFORE_SAVE', this.selected);
      await this.$store.dispatch('SET_IS_LIST_USED_IN_IMPORT_ORDER', true);
      this.$store.dispatch('ADD_ITEMS_TO_IMPORT_ORDER');
      this.$router.push('./factoryOrder');
    },
    async addItems() {
      await this.$store.dispatch('SET_LIST_STOCK_ITEMS_BEFORE_SAVE', this.selected);
      await this.$store.dispatch('SET_BOOL_CHOOSING_STOCK_ITEMS', true);
      this.$store.dispatch('ADD_ITEMS_TO_IMPORT_ORDER');
      //
      // next hide method of modal doesn't work!!!
      // it's different reference modal and not 'import-modal'!!!
      this.$refs['import-modal'].hide();
    },
    async addItemsToExistOrder() {
      await this.$store.dispatch('SET_LIST_STOCK_ITEMS_BEFORE_SAVE', this.selected);
      await this.$store.dispatch('SET_BOOL_CHOOSING_STOCK_ITEMS', false);
      await this.$store.dispatch('SET_BOOL_CHOOSING_IMPORT_ORDERS', true);
      await this.$store.dispatch('GET_LIST_IMPORT_ORDERS');
      await this.$refs['import-modal'].show();
    },
    async deleteStockItemFromImportOrder() {
    /* eslint no-param-reassign: ["error", { "props": false }] */
      await this.selected.forEach(
        ((value) => {
          const savingItem = [];
          savingItem.push('delete');
          value.stock_choices = 'waiting for processing';
          value.import_order = null;
          savingItem.push(value);
          this.$store.dispatch('SAVE_STOCK_ITEM_EXP_VIA_ARRAY', savingItem);
        }),
      );
    },
  },
  computed: {
    stockItems() {
      let listItems = [];
      if (this.isListUsedInImportOrder) {
        listItems = this.$store.getters.GET_LIST_STOCK_ITEMS_EXP_FOR_IMPORT_ORDER;
      } else {
        listItems = this.$store.getters.GET_LIST_STOCK_ITEMS_EXP;
      }
      return listItems;
    },
    role() {
      return this.$store.getters.GET_AUTHOR;
    },
    bankEurRate() {
      return this.$store.getters.GET_BANK_EUR_RATE;
    },
    importOrder() {
      return this.$store.getters.GET_SINGLE_IMPORT_ORDER;
    },
    boolChoosingStockItems() {
      return this.$store.getters.GET_BOOL_CHOOSING_STOCK_ITEMS;
    },
    isListUsedInImportOrder() {
      return this.$store.getters.GET_IS_LIST_USED_IN_IMPORT_ORDER;
    },
  },
  watch: {
  },
};
</script>
