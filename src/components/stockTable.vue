<template>
  <b-container>
    <stock-item ref="stock-item"></stock-item>
    <wirehouse-modal ref="wirehouse-modal"></wirehouse-modal>
    <b-row>
      <b-col>
        <b-table
        small striped
        responsive
        :fields="fields"
        :items="stockItems"
        select-mode="single"
        @row-selected="onRowSelected">
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
        <template v-slot:cell(total_price)="data">
          {{ data.item.items_amount * data.item.current_price_eur }}
        </template>
        <template v-slot:cell(state)="data">
          {{ data.item.stock_choices }}
        </template>
        <template v-slot:cell(check)="row">
          <template v-if="role == 2">
            <b-button
            size="sm"
            v-if="row.item.stock_choices == 'cancel'"
            variant="outline-dark" @click="editItem(row.index)">...</b-button>
          </template>
          <template v-if="role == 4">
            <b-button
              variant="outline"
              @click="moreDetails(row.item.id)"
              size="sm">
              <b-icon icon="three-dots"></b-icon>
            </b-button>
          </template>
        </template>
        <template v-slot:cell(delete)="row" v-if="role == 2">
          <b-button
          size="sm"
          v-if="row.item.stock_choices == 'cancel'"
          variant="outline-danger" @click="deleteItem(row.index)">
          X</b-button>
        </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import stockItem from './stockItemModal.vue';
import wirehouseModal from './wirehouseStockItemDetails.vue';

export default {
  components: {
    stockItem,
    wirehouseModal,
  },
  data() {
    return {
      selected: [],
      fields: [
        {
          key: 'index',
          label: 'Number',
        },
        {
          key: 'client_order',
          label: 'Client Order',
        },
        {
          key: 'factory',
          label: 'Factory',
        },
        {
          key: 'collection',
          label: 'Collection',
        },
        {
          key: 'catalogue_num',
          label: 'Catalogue number',
        },
        {
          key: 'amount',
          label: 'Amount',
        },
        {
          key: 'price',
          label: 'Price per unit',
        },
        {
          key: 'total_price',
          label: 'Total price',
        },
        {
          key: 'state',
          label: 'State',
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
    onRowSelected(items) {
      this.selected = items;
    },
    editItem(index) {
      this.$store.dispatch('SET_CURRENT_STOCK_ITEM_BY_INDEX', index);
      this.$store.dispatch('SET_IS_NEW_STOCK_ITEM', false);
      this.$refs['stock-item'].show();
    },
    async moreDetails(id) {
      this.$store.dispatch('GET_STOCK_ITEM_EXP_BY_ID', id);
      this.$refs['wirehouse-modal'].show();
    },
    deleteItem(index) {
      this.$store.dispatch('MOVE_ITEM_TO_DELETE_LIST', index);
    },
  },
  computed: {
    stockItems() {
      return this.$store.getters.GET_LIST_STOCK_ITEMS;
    },
    currentItem() {
      return this.$store.getters.GET_CURRENT_STOCK_ITEM;
    },
    role() {
      return this.$store.getters.GET_AUTHOR;
    },
  },
};
</script>
