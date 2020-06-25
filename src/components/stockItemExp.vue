<template>
    <div>
        <b-form>
          <b-container>
            <b-row align-h="start" class="mt-3">
              <b-col cols="2">
                <!-- <b-button
                  class="btn btn-dark"
                  @click="backToStockTableExp"
                >Back</b-button> -->
                <b-button
                  class="btn btn-dark"
                  @click="back"
                >Back</b-button>
              </b-col>
            </b-row>
            <div v-if="role == 4">
                <h3>Expanded</h3>
              <b-row align-h="center">
                <h4>Item</h4>
              </b-row>
                {{ currentStockItem }}
                {{ listNameFactories }}
              <b-row align-h="end" class="mt-3">
                <b-col cols="4">
                  <h5>Client Order: {{ currentStockItem.client_order.public_num }}</h5>
                </b-col>
              </b-row>
              <b-row class='mt-3'>
                <!-- FACTORY -->
                <b-col>
                  <label for="input-factory">Factory</label>
                  <b-row no-gutters>
                    <b-col sm md="auto">
                      <b-button variant="outline-success" disabled pill
                        v-if="checkFactory"
                      >&check;</b-button>
                      <b-button
                        @click="editFactory"
                        v-if="checkFactory"
                        variant="outline-dark" pill
                      >...</b-button>
                      <b-button
                        @click="addNewFactory"
                        v-else
                        variant="danger"
                      >New</b-button>
                    </b-col>
                    <b-col sm>
                      <b-popover
                        placement="top"
                        ref="popForFactory"
                        target="input-factory"
                        v-if="popForFactory"
                        :show.sync="popForFactory">
                        <strong>Enter me correctly, first!</strong>
                      </b-popover>
                      <b-input id="input-factory"
                      debounce="700"
                      list="factories-list"
                      v-model="currentStockItem.factory_item.factory_collection.factory.name"
                      placeholder="Factory"></b-input>
                      <datalist id="factories-list">
                        <option
                          v-for="factory in listNameFactories" :key="factory.name"
                        >{{ factory.name }}</option>
                      </datalist>
                    </b-col>
                  </b-row>
                </b-col>
                <b-col>
                  <!-- COLLECTION -->
                  <label for="input-collection">Collection</label>
                  <b-row no-gutters>
                    <b-col sm md="auto">
                      <b-button
                        v-if="checkFactoryCollections" pill
                        variant="outline-success" disabled>&check;</b-button>
                      <b-button
                        @click="editCollection"
                        v-if="checkFactoryCollections"
                        variant="outline-dark" pill
                      >...</b-button>
                      <b-button
                        @click="addNewFactoryCollection"
                        v-else
                        variant="danger"
                      >New</b-button>
                    </b-col>
                    <b-col sm>
                      <b-popover
                        placement="top"
                        ref="popForCollection"
                        target="input-collection"
                        v-if="popForCollection"
                        :show.sync="popForCollection">
                        <strong>Enter me correctly, first!</strong>
                      </b-popover>
                      <b-input id="input-collection"
                      debounce="700"
                      list="factory-collections-list"
                      v-model="currentStockItem.factory_item.factory_collection.name"
                      placeholder="Collection"></b-input>
                      <datalist id="factory-collections-list">
                        <option
                          v-for="collection in listNameFactoryCollections" :key="collection.name"
                        >{{ collection.name }}</option>
                      </datalist>
                    </b-col>
                  </b-row>
                </b-col>
                <b-col>
                  <!-- CATALOGUE-NUMBER -->
                  <label for="input-catalog-num">Catalogue Number</label>
                  <b-row no-gutters>
                    <b-col sm md="auto">
                      <b-button
                        v-if="checkCatalogueNumber" pill
                        variant="outline-success" disabled>&check;</b-button>
                      <b-button
                        @click="editFactoryItem"
                        v-if="checkCatalogueNumber"
                        variant="outline-dark" pill
                      >...</b-button>
                      <b-button
                        @click="addNewCatalogueNumber"
                        v-else
                        variant="danger">New</b-button>
                    </b-col>
                    <b-col sm>
                      <b-input id="input-catalog-num"
                      debounce="700"
                      list="catalogue-number-list"
                      v-model="currentStockItem.factory_item.catalogue_number"
                      placeholder="Catalogue number"></b-input>
                      <datalist id="catalogue-number-list">
                        <option
                          v-for="catalogueNumber in listCatalogueNumbers"
                          :key="catalogueNumber.catalogue_number"
                        > {{catalogueNumber.catalogue_number}} </option>
                      </datalist>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
              <b-row align-h="end" class="mt-3">
                <b-col cols="3">
                    <b-form-group
                        id="form-passport-group"
                        label="Amount (unit)"
                        label-for="form-passport-input"
                    >
                        <b-row align-h="around">
                            <b-col>
                              <h5>{{ currentStockItem.items_amount }}</h5>
                                <!-- <b-input placeholder="Amount"
                                v-model="currentStockItem.items_amount"
                                type="number"></b-input> -->
                            </b-col>
                        </b-row>
                    </b-form-group>
                </b-col>
                <b-col cols="3">
                    <b-form-group
                        id="form-passport-group"
                        label="Price for client(EUR)"
                        label-for="form-passport-input"
                    >
                        <b-row align-h="around">
                            <b-col>
                              <h5>{{ currentStockItem.current_price_eur }}</h5>
                                <!-- <b-input placeholder="Price(EUR)"
                                v-model="currentStockItem.current_price_eur"
                                type="number"></b-input> -->
                            </b-col>
                        </b-row>
                    </b-form-group>
                </b-col>
              </b-row>
              <b-row class="mt-3 mb-5" align-h="end">
                <b-col cols="2">
                  <b-button variant="danger">Cancel</b-button>
                </b-col>
                <b-col cols="2">
                  {{ currentFactoryItem }}
                  <b-button
                    :disabled="currentFactoryItem.id == null"
                    @click="saveItemExp"
                    variant="primary"
                  >Save</b-button>
                </b-col>
              </b-row>
            </div>
            <div v-else class="mt-5 mb-5"><h3>Forbidden</h3></div>
          </b-container>
        </b-form>
        <factory-item-modal ref="factory-item-modal"></factory-item-modal>
    </div>
</template>

<script>
import _ from 'lodash';
import factoryItemModal from './factoryItemModal.vue';

export default {
  components: {
    factoryItemModal,
  },
  data() {
    return {
      popForFactory: false,
      popForCollection: false,
      time: 1,
      timerFactory: null,
      timerCollection: null,
    };
  },
  mounted() {
  },
  created() {
    this.$store.dispatch('SET_EMPTY_STOCK_ITEM');
  },
  methods: {
    factoryDecrement() {
      if (this.time > 0) {
        this.time -= 1;
      } else {
        this.popForFactory = false;
        // this.$refs.popForFactory.$emit('disable');
        clearInterval(this.timerFactory);
        this.timerFactory = null;
      }
    },
    popFactory() {
      if (this.timerFactory === null) {
        this.timerFactory = setInterval(this.factoryDecrement, 1000);
      }
    },
    collectionDecrement() {
      if (this.time > 0) {
        this.time -= 1;
      } else {
        this.popForCollection = false;
        // this.$refs.popForCollection.$emit('disable');
        clearInterval(this.timerCollection);
        this.timerCollection = null;
      }
    },
    popCollection() {
      if (this.timerCollection == null) {
        this.timerCollection = setInterval(this.collectionDecrement, 1000);
      }
    },
    addItem() {
      this.$store.dispatch('ADD_ITEM_TO_LIST_STOCK_ITEMS');
    },
    saveItem() {
      this.$store.dispatch('CHANGE_STOCK_ITEM');
    },
    saveItemExp() {
      const item = this.currentStockItem;
      const factoryItemID = this.currentFactoryItem.id;
      item.factory_item = factoryItemID;
      console.log(item);
      const savingItem = [];
      savingItem.push('save');
      savingItem.push(item);
      this.$store.dispatch('SAVE_STOCK_ITEM_EXP_VIA_ARRAY', savingItem);
    },
    cencel() {
      // this.$store.dispatch('SET_EMPTY_STOCK_ITEM');
    },
    back() {
      this.$router.go(-1);
    },
    checkObjectByType(obj, objType) {
      let foundObj = {};
      if (objType === 'factory') {
        foundObj = _.find(this.listNameFactories, ['name', obj]);
        // this.$store.dispatch('RESET_LIST_COLLECTIONS_AND_NUMBERS');
      } else if (objType === 'collections') {
        foundObj = _.find(this.listNameFactoryCollections, ['name', obj]);
        // this.$store.dispatch('SET_CURRENT_FACTORY_ITEM', foundObj);
      } else {
        foundObj = _.find(this.listCatalogueNumbers, ['catalogue_number', obj]);
      }
      let result = false;
      if (_.isObject(foundObj)) {
        result = true;
        this.getNextDataList(objType, foundObj);
      } else {
        this.$store.dispatch('SET_CURRENT_FACTORY_ITEM', 'empty');
      }
      return result;
    },
    getNextDataList(objType, obj) {
      if (objType === 'factory') {
        const factory = this.currentStockItem.factory_item.factory_collection.factory.name;
        this.$store.dispatch('GET_LIST_COLLECTIONS_BY_FACTORY', factory);
        this.$store.dispatch('SET_CURRENT_FACTORY', obj);
      } else if (objType === 'collections') {
        const collections = this.currentStockItem.factory_item.factory_collection.name;
        this.$store.dispatch('GET_CATALOGUE_NUMBERS_BY_COLLECTION', collections);
        this.$store.dispatch('SET_CURRENT_COLLECTION', obj);
      } else {
        this.$store.dispatch('SET_CURRENT_FACTORY_ITEM', obj);
      }
    },
    async addNewFactory() {
      await this.$store.dispatch('SET_TYPE_FACTORY_ITEM', 'factory');
      await this.$store.dispatch('SET_CURRENT_FACTORY', 'empty');
      this.$refs['factory-item-modal'].show();
    },
    async addNewFactoryCollection() {
      if (this.checkFactory) {
        await this.$store.dispatch('SET_TYPE_FACTORY_ITEM', 'collection');
        await this.$store.dispatch('SET_CURRENT_COLLECTION', 'empty');
        this.$refs['factory-item-modal'].show();
      } else {
        this.popForFactory = true;
        this.popFactory();
      }
    },
    async addNewCatalogueNumber() {
      if (this.checkFactoryCollections) {
        await this.$store.dispatch('SET_TYPE_FACTORY_ITEM', 'catalogue-number');
        await this.$store.dispatch('SET_CURRENT_FACTORY_ITEM', 'empty');
        this.$refs['factory-item-modal'].show();
      } else {
        // this.$refs.popForCollection.$emit('enable');
        this.popForCollection = true;
        this.popCollection();
      }
    },
    async editFactory() {
      await this.$store.dispatch('SET_TYPE_FACTORY_ITEM', 'factory');
      await this.$store.dispatch('GET_SINGLE_FACTORY_ITEM');
      this.$refs['factory-item-modal'].show();
    },
    async editCollection() {
      await this.$store.dispatch('SET_TYPE_FACTORY_ITEM', 'collection');
      await this.$store.dispatch('GET_SINGLE_FACTORY_ITEM');
      this.$refs['factory-item-modal'].show();
    },
    async editFactoryItem() {
      await this.$store.dispatch('SET_TYPE_FACTORY_ITEM', 'catalogue-number');
      await this.$store.dispatch('GET_SINGLE_FACTORY_ITEM');
      this.$refs['factory-item-modal'].show();
    },
  },
  computed: {
    role() {
      return this.$store.getters.GET_AUTHOR;
    },
    currentStockItem() {
      return this.$store.getters.GET_CURRENT_STOCK_ITEM_EXP;
    },
    isNewStockItem() {
      return null;
    },
    listNameFactories() {
      return this.$store.getters.GET_LIST_NAME_FACTORIES;
    },
    listNameFactoryCollections() {
      return this.$store.getters.GET_LIST_NAME_FACTORY_COLLECTIONS;
    },
    listCatalogueNumbers() {
      return this.$store.getters.GET_LIST_NUMBER_FACTORY_ITEMS;
    },
    checkFactory() {
      return this.checkObjectByType(
        this.currentStockItem.factory_item.factory_collection.factory.name,
        'factory',
      );
    },
    checkFactoryCollections() {
      return this.checkObjectByType(
        this.currentStockItem.factory_item.factory_collection.name,
        'collections',
      );
    },
    checkCatalogueNumber() {
      return this.checkObjectByType(
        this.currentStockItem.factory_item.catalogue_number,
        'catalogueNumber',
      );
    },
    typeFactoryItem() {
      return this.$store.getters.GET_TYPE_FACTORY_ITEM;
    },
    currentFactoryItem() {
      return this.$store.getters.GET_CURRENT_FACTORY_ITEM;
    },
  },
};
</script>
