<template>
  <b-container>
    <b-row align-h="start">
      <b-col cols="2">
        <b-button
        :disabled="canEdit()"
          @click="editStockItem"
        >Edit item</b-button>
      </b-col>
      <b-col cols="2">
        <b-button
        v-if="boolChoosingStockItems == false"
        :disabled="canAdd()"
        @click="addItemsToNewOrder"
        >Add to new order</b-button>
      </b-col>
      <b-col cols="2">
        <b-button
        v-if="boolChoosingStockItems == false"
        :disabled="canAdd()"
        @click="addItemsToExistOrder"
        >Add to exist order</b-button>
      </b-col>
    </b-row>
    {{ importOrder }}
    <b-row align-h="end">
      <b-col cols="2" class="bg-success text-light">{{ bankEurRate.RUB }}</b-col>
    </b-row>
    <b-row class="mt-3">
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
          <!-- <template v-if="data.item.client_order.id === null">
            {{ data.item.factory_item.factory_collection.factory.name }}
          </template> -->
          <template v-if="data.item.incorrect_factory.length == 0">
            {{ data.item.factory_item.factory_collection.factory.name }}
          </template>
          <template v-else>
            {{ data.item.incorrect_factory.split('&')[0] }}
          </template>
        </template>
        <template v-slot:cell(collection)="data">
          <!-- <template v-if="data.item.client_order.id === null">
            {{ data.item.factory_item.factory_collection.name }}
          </template> -->
          <template v-if="data.item.incorrect_factory.length == 0">
            {{ data.item.factory_item.factory_collection.name }}
          </template>
          <template v-else>
            {{ data.item.incorrect_factory.split('&')[1] }}
          </template>
        </template>
        <template v-slot:cell(catalogue_num)="data">
          <!-- <template v-if="data.item.client_order.id === null">
            {{ data.item.factory_item.catalogue_number }}
          </template> -->
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
        <!-- {{ selected }} -->
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
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
          label: 'Номер в каталоге',
        },
        {
          key: 'is_correct',
        },
        {
          key: 'amount',
          label: 'Колличество',
        },
        {
          key: 'price',
          label: 'Цена',
        },
        {
          key: 'state',
          label: 'Состояние',
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
    },
    onRowSelected(items) {
      this.selected = items;
    },
    editItem(index) {
      this.$store.dispatch('SET_CURRENT_STOCK_ITEM_BY_INDEX', index);
      this.$store.dispatch('SET_IS_NEW_STOCK_ITEM', false);
    },
    addItemsToNewOrder() {
      this.$store.dispatch('ADD_ITEMS_TO_IMPORT_ORDER');
      // this.selected.forEach(
      //   ((value) => { this.$store.dispatch('CALC_AND_SAVE_ITEM', value); }),
      // );
    },
    async addItemsToExistOrder() {
      await this.$store.dispatch('SET_LIST_STOCK_ITEMS_BEFORE_SAVE', this.selected);
      await this.$store.dispatch('SET_BOOL_CHOOSING_STOCK_ITEMS', false);
      await this.$store.dispatch('SET_BOOL_CHOOSING_IMPORT_ORDERS', true);
      await this.$store.dispatch('GET_LIST_IMPORT_ORDERS');
      this.$refs['import-modal'].show();
      // await this.selected.forEach(
      //   (async (value) => {
      //      await this.$store.dispatch('SET_IMPORT_ORDER_FOR_STOCK_ITEM_EXP', value);
      //   }),
      // );
    },
  },
  computed: {
    stockItems() {
      return this.$store.getters.GET_LIST_STOCK_ITEMS_EXP;
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
  },
};
</script>
