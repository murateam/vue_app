<template>
  <b-modal
    ref="wirehouse-modal"
    hide-footer
  >
    <b-container>
      <b-img
        fluid
        src="https://picsum.photos/seed/picsum/200/300"
      ></b-img>
        {{singleStockItemExp}}
    </b-container>
  </b-modal>
</template>

<script>
export default {
  name: 'wirehouse-modal',
  methods: {
    show() {
      this.$refs['wirehouse-modal'].show();
    },
  },
  computed: {
    singleStockItemExp() {
      return this.$store.getters.GET_CURRENT_STOCK_ITEM_EXP;
    },
  },
};
</script>
