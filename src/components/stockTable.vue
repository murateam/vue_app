<template>
    <b-container>
        <b-table
        :fields="fields"
        :items="stockItems"
        small="small">
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
        </b-table>
    </b-container>
</template>

<script>
export default {
  data() {
    return {
      fields: [
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
      ],
    };
  },
  mounted() {
    // this.$store.dispatch('GET_ALL_ITEMS');
  },
  computed: {
    stockItems() {
      return this.$store.getters.GET_LIST_ITEMS || [];
    },
  },
};
</script>
