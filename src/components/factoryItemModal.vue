<template>
    <b-modal
        size="lg"
        hide-footer
        id="factory-item-modal"
        ref="factory-item-modal"
        @hidden="resetModal"
    >
        <b-container fluid>
            <div v-if="typeFactoryItem == 'factory'">
              <b-row align-h="center">
                <b-col cols="3"><h5>Factory</h5></b-col>
              </b-row>
              <b-row class="mt-4" align-h="start">
                <b-col md="auto" align-self="center">
                  <h6>Name:</h6>
                </b-col>
                <b-col>
                  <b-input></b-input>
                </b-col>
              </b-row>
            </div>
            <div v-if="typeFactoryItem == 'collection'"><h5>Collection</h5>
            </div>
            <div v-if="typeFactoryItem == 'catalogue-number'"><h5>Catalogue number</h5>
            </div>
            <b-row class="mt-3" align-h="end">
            <b-col cols="2">
                <b-button variant="danger">Cancel</b-button>
            </b-col>
            <b-col cols="2">
                <b-button variant="primary">Save</b-button>
            </b-col>
            </b-row>
        </b-container>
    </b-modal>
</template>

<script>
export default {
  name: 'factoryItemModal',
  data() {
    return {};
  },
  methods: {
    show() {
      this.$refs['factory-item-modal'].show();
    },
    hide() {
      this.$refs['factory-item-modal'].hide();
    },
    resetModal() {
      this.$store.dispatch('SET_TYPE_FACTORY_ITEM', '');
    },
  },
  computed: {
    typeFactoryItem() {
      return this.$store.getters.GET_TYPE_FACTORY_ITEM;
    },
  },
};
</script>
