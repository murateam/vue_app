<template>
  <b-container>
    <stock-item ref="stock-item"></stock-item>
    <b-row>
      <b-col>
        <!-- {{ stockItems }} -->
        <b-table
        small striped
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
        <template v-slot:cell(index)="data">
          {{ data.index + 1}}
        </template>
        <template v-slot:cell(client_order)="data">
          {{ data.item.client_order.public_num }}
        </template>
        <template v-slot:cell(factory)="data">
          <template v-if="data.item.client_order.id === null">
            {{ data.item.factory_item.factory_collection.factory.name }}
          </template>
          <template v-if="data.item.is_correct">
            {{ data.item.factory_item.factory_collection.factory.name }}
          </template>
          <template v-else>
            {{ data.item.incorrect_factory.split('&')[0] }}
          </template>
        </template>
        <template v-slot:cell(collection)="data">
          <template v-if="data.item.client_order.id === null">
            {{ data.item.factory_item.factory_collection.name }}
          </template>
          <template v-if="data.item.is_correct">
            {{ data.item.factory_item.factory_collection.name }}
          </template>
          <template v-else>
            {{ data.item.incorrect_factory.split('&')[1] }}
          </template>
        </template>
        <template v-slot:cell(catalogue_num)="data">
          <template v-if="data.item.client_order.id === null">
            {{ data.item.factory_item.catalogue_number }}
          </template>
          <template v-if="data.item.is_correct">
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
          {{ data.item.current_price_ru }}
        </template>
        <template v-slot:cell(state)="data">
          {{ data.item.stock_choices }}
        </template>
        <template v-slot:cell(check)="row">
          <b-button variant="outline-dark" @click="editItem(row.index)">...</b-button>
        </template>
        <template v-slot:cell(delete)="row">
          <b-button variant="outline-danger" @click="deleteItem(row.index)">X</b-button>
        </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import stockItem from './stockItemModal.vue';

export default {
  components: {
    stockItem,
  },
  data() {
    return {
      selected: [],
      fields: [
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
    // factory(value) {
    //   console.log(value);
    //   let factory = '';
    //   if (value.is_corrected === true) {
    //     factory = value.factory_item.factory_collection.factory.name;
    //   } else {
    //     factory = value.incorrect_factory.splist('&')[0];
    //   }
    // return `${}`;
    // },
    onRowSelected(items) {
      this.selected = items;
    },
    editItem(index) {
      this.$store.dispatch('SET_CURRENT_STOCK_ITEM_BY_INDEX', index);
      this.$store.dispatch('SET_IS_NEW_STOCK_ITEM', false);
      this.$refs['stock-item'].show();
    },
    deleteItem(index) {
      this.$store.dispatch('MOVE_ITEM_TO_DELETE_LIST', index);
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
