<template>
    <b-modal
        size="lg"
        hide-footer
        id="factory-item-modal"
        ref="factory-item-modal"
        @hidden="resetModal"
    >
        <b-container fluid>
          {{ typeFactoryItem }}
          <!-- FACTORY -->
          <b-card>
            <div v-if="typeFactoryItem == 'factory'">
              <b-row align-h="center">
                <b-col md="auto"><h5>Factory</h5></b-col>
              </b-row>
              <b-row class="mt-4" align-h="start">
                <b-col md="auto" align-self="center">
                  <div>Name:</div>
                </b-col>
                <b-col>
                  <b-input
                    v-model="currentFactory.name"
                  ></b-input>
                </b-col>
              </b-row>
            </div>
            <div v-else>
              <b-row align-h="center">
                <b-col md="auto"><h5>Factory</h5></b-col>
              </b-row>
              <b-row class="mt-4" align-h="start">
                <b-col md="auto" align-self="center">
                  <div>Name:</div>
                </b-col>
                <b-col>
                  <h6>{{ currentFactory.name }}</h6>
                </b-col>
              </b-row>
            </div>
          </b-card>
          <!-- COLLECTION -->
          <b-card class="mt-3" v-if="typeFactoryItem != 'factory'">
            <div v-if="typeFactoryItem == 'collection'">
              <b-row align-h="center">
                <b-col md="auto">
                  <h5>Collection</h5>
                </b-col>
              </b-row>
              <b-row align-h="end">
                <b-col md="auto">
                  <b-form-checkbox
                    v-model="currentCollection.is_made"
                    value="true"
                    unchecked-value="false"
                  >
                    Is produced?
                  </b-form-checkbox>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col md="auto" align-self="center">Name Collection:</b-col>
                <b-col>
                  <b-input
                    v-model="currentCollection.name"
                  ></b-input>
                </b-col>
              </b-row>
            </div>
            <div v-else>
              <b-row align-h="center">
                <b-col md="auto">
                  <h5>Collection:</h5>
                </b-col>
              </b-row>
              <b-row align-h="end">
                <b-col
                  v-if="currentCollection.is_made"
                  md="auto">
                  <h6 v-if="currentCollection.is_made">Produced</h6>
                  <h6 v-else>Not produced</h6>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col md="auto" align-self="center">Name Collection:</b-col>
                <b-col>
                  <h6>
                    {{ currentCollection.name }}
                  </h6>
                </b-col>
              </b-row>
            </div>
          </b-card>
          <!-- CATALOGUE-NUMBER -->
          <b-card
            class="mt-3"
            v-if="typeFactoryItem != 'factory' && typeFactoryItem != 'collection'"
          >
            <div v-if="typeFactoryItem == 'catalogue-number'">
              <b-row align-h="center">
                <b-col md="auto">
                  <h5>Catalogue number</h5>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col md="auto">Description:</b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-input
                    v-model="currentFactoryItem.description_de"
                  ></b-input>
                </b-col>
              </b-row>
              <b-row align-h="end" class="mt-4">
                <b-col cols="3" align-self="center">
                  Catalogue number:
                </b-col>
                <b-col cols="4">
                  <b-input
                    v-model="currentFactoryItem.catalogue_number"
                  ></b-input>
                </b-col>
              </b-row>
            </div>
            <div v-else></div>
          </b-card>
            <b-row class="mt-3" align-h="end">
            <b-col cols="2">
                <b-button variant="danger">Cancel</b-button>
            </b-col>
            <b-col cols="2">
                <b-button variant="primary"
                  @click="saveFactoryItem"
                >Save</b-button>
            </b-col>
            </b-row>
            <div>{{ currentFactory }}</div>
            <div>{{ currentCollection }}</div>
            <div>{{ currentFactoryItem }}</div>
        </b-container>
    </b-modal>
</template>

<script>
export default {
  name: 'factoryItemModal',
  data() {
    return {};
  },
  created() {
    this.$store.dispatch('SET_CURRENT_FACTORY', 'empty');
    this.$store.dispatch('SET_CURRENT_COLLECTION', 'empty');
    this.$store.dispatch('SET_CURRENT_FACTORY_ITEM', 'empty');
  },
  methods: {
    show() {
      this.$refs['factory-item-modal'].show();
    },
    hide() {
      this.$refs['factory-item-modal'].hide();
    },
    resetModal() {
      // this.$store.dispatch('SET_TYPE_FACTORY_ITEM', '');
    },
    saveFactoryItem() {
      this.$store.dispatch('SAVE_FACTORY_ITEM');
      this.hide();
    },
  },
  computed: {
    typeFactoryItem() {
      return this.$store.getters.GET_TYPE_FACTORY_ITEM;
    },
    currentStockItem() {
      return this.$store.getters.GET_CURRENT_STOCK_ITEM_EXP;
    },
    currentFactory() {
      return this.$store.getters.GET_CURRENT_FACTORY;
    },
    currentCollection() {
      return this.$store.getters.GET_CURRENT_COLLECTION;
    },
    currentFactoryItem() {
      return this.$store.getters.GET_CURRENT_FACTORY_ITEM;
    },
  },
};
</script>
