<template>
  <b-modal
    ref="wirehouse-modal"
    hide-footer
  >
    <b-container>
      <b-row>
        <b-col md="auto">
          <h5 class="mt-5 mb-5">
            There is could be some information resources
            (photos, booklets, etc.) for this item beside
            a data getting from the DB
          </h5>
        </b-col>
      </b-row>
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
