<template>
  <b-container>
    <b-row>
      <b-col>
        <b-table
        responsive
        :fields="fields"
        :items="stockItems"
        select-mode="single"
        @row-selected="onRowSelected">
        <!-- <template v-slot:cell(check)="{ rowSelected }">
          <template v-if="rowSelected">
            <span>&check;</span>
          </template>
          <template v-else>
            <span>&nbsp;</span>
          </template>
        </template> -->
        <template v-slot:cell(check)="row">
          <b-button variant="light" @click="moreInfo(row.item, row.index)">...</b-button>
        </template>
        <template v-slot:cell(index)="data">
          {{ data.index + 1}}
        </template>
        <template v-slot:cell(client_order)="data">
          {{ data.item.client_order.public_num }}
        </template>
        <template v-slot:cell(factory)="data">
          {{ data.item.factory_item.factory_collection.factory.name }}
        </template>
        <template v-slot:cell(collection)="data">
          {{ data.item.factory_item.factory_collection.name }}
        </template>
        <template v-slot:cell(catalogue_num)="data">
          {{ data.item.factory_item.catalogue_number }}
        </template>
        <template v-slot:cell(amount)="data">
          {{ data.item.items_amount }}
        </template>
        <template v-slot:cell(price)="data">
          {{ data.item.current_price_ru }}
        </template>
        <template v-slot:cell(state)="data">
          {{ data.item.stock_choices }}
        </template>
        <template v-slot:cell(delete)="row">
          <b-button variant="danger" @click="deleteItem(row.item, row.index)">X</b-button>
        </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      selected: [],
      fields: [
        {
          key: 'check',
          label: '  ',
        },
        {
          key: 'index',
          label: 'Номер',
        },
        {
          key: 'client_order',
          label: 'Договор клиента',
          formatter: 'client_order',
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
    moreInfo(item, index) {
      this.$store.dispatch('SET_CURRENT_STOCK_ITEM_BY_INDEX', index);
    },
    deleteItem(item, index) {
      this.$store.dispatch('MOVE_ITEM_TO_DELETE_LIST', item, index);
    },
  },
  mounted() {
    // this.$store.dispatch('GET_ALL_ITEMS');
  },
  computed: {
    stockItems() {
      return this.$store.getters.GET_LIST_STOCK_ITEMS;
    },
    currentItem() {
      return this.$store.getters.GET_CURRENT_STOCK_ITEM;
    },
  },
};
</script>
