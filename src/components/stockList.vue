<template>
    <div>
        <stock-item-modal />
        <b-button
        class="mt-3"
        @click="$bvModal.show('stockItemModal')">Добавить позицию</b-button>
        <stock-table class="mt-3"></stock-table>
    </div>
</template>

<script>
import stockTable from './stockTable.vue';
import stockItemModal from './stockItemModal.vue';

export default {
  name: 'stockList',
  components: {
    stockTable,
    stockItemModal,
  },
  data() {
    return {
    };
  },
  // mounted() {
  //   this.$store.dispatch('GET_ALL_ITEMS');
  // },
  computed: {
    // listItems() {
    //   return this.$store.getters.GET_LIST_ITEMS;
    // },
    // items() {
    //   return this.$store.getters.GET_LIST_ITEMS;
    // },
    // stockItems() {
    //   return this.$store.getters.GET_LIST_ITEMS;
    // },
  },
};
</script>
