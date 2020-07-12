<template>
    <div>
        <b-form>
          <b-container>
            <b-row><b-col>
            <navbar>
            </navbar>
            </b-col></b-row>
            <!-- <b-row align-h="start" class="mt-3">
              <b-col cols="2">
                <b-button
                  class="btn btn-dark"
                  @click="back"
                >Back</b-button>
              </b-col>
            </b-row> -->
            <div v-if="role == 4" class="mt-3">
                <h3>Expanded</h3>
              <b-row align-h="center">
                <h4>Item</h4>
              </b-row>
              <b-row align-h="end" class="mt-3">
                <b-col cols="4">
                  <h5>Client Order: {{ currentStockItem.client_order.public_num }}</h5>
                </b-col>
              </b-row>
              {{ currentStockItem }}
              <b-row align-h="between">
                <b-col cols="6">
                  <b-card class="mt-3">
                    <!-- STOCK ITEM CARD -->
                    <b-row>
                      <!-- FACTORY -->
                      <b-col cols="12">
                        <label for="input-factory">Factory</label>
                        <b-row no-gutters>
                          <b-col sm md="auto" align-self="center">
                            <b-button
                              @click="editFactory"
                              variant="outline-primary"
                              v-if="checkFactory"
                            >
                              <b-icon icon="tools"></b-icon> Edit
                            </b-button>
                            <b-button
                              @click="addNewFactory"
                              v-else
                              variant="outline-danger"
                            >
                              <b-icon icon="plus-circle-fill"
                                font-scale="1.5" aria-hidden="true"
                              ></b-icon> New
                            </b-button>
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
                          <b-col md="auto" align-self="center">
                            <b-iconstack font-scale="2.2" v-if="checkFactory">
                              <b-icon stacked icon="square"></b-icon>
                              <b-icon
                              stacked icon="check" variant="success"
                              ></b-icon>
                            </b-iconstack>
                            <b-iconstack font-scale="2.2" v-else>
                              <b-icon stacked icon="square"></b-icon>
                              <b-icon
                              stacked icon="x" variant="danger"
                              ></b-icon>
                            </b-iconstack>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                    <b-row class="mt-3">
                      <b-col cols="12">
                        <!-- COLLECTION -->
                        <label for="input-collection">Collection</label>
                        <b-row no-gutters>
                          <b-col sm md="auto">
                            <b-button
                              @click="editCollection"
                              variant="outline-primary"
                              v-if="checkFactoryCollections"
                            >
                              <b-icon icon="tools"></b-icon> Edit
                            </b-button>
                            <b-button
                              @click="addNewFactoryCollection"
                              v-else
                              variant="outline-danger"
                            >
                              <b-icon icon="plus-circle-fill"
                                font-scale="1.5" aria-hidden="true"
                              ></b-icon> New
                            </b-button>
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
                                v-for="collection in listNameFactoryCollections"
                                :key="collection.name"
                              >{{ collection.name }}</option>
                            </datalist>
                          </b-col>
                          <b-col md="auto" align-self="center">
                            <b-iconstack font-scale="2.2" v-if="checkFactoryCollections">
                              <b-icon stacked icon="square"></b-icon>
                              <b-icon
                              stacked icon="check" variant="success"
                              ></b-icon>
                            </b-iconstack>
                            <b-iconstack font-scale="2.2" v-else>
                              <b-icon stacked icon="square"></b-icon>
                              <b-icon
                              stacked icon="x" variant="danger"
                              ></b-icon>
                            </b-iconstack>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                    <b-row class="mt-3">
                      <b-col cols="12">
                        <!-- CATALOGUE-NUMBER -->
                        <label for="input-catalog-num">Catalogue Number</label>
                        <b-row no-gutters>
                          <b-col sm md="auto">
                            <b-button
                              @click="editFactoryItem"
                              variant="outline-primary"
                              v-if="checkCatalogueNumber"
                            >
                              <b-icon icon="tools"></b-icon> Edit
                            </b-button>
                            <b-button
                              @click="addNewCatalogueNumber"
                              v-else
                              variant="outline-danger"
                            >
                              <b-icon icon="plus-circle-fill"
                                font-scale="1.5" aria-hidden="true"
                              ></b-icon> New
                            </b-button>
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
                          <b-col md="auto" align-self="center">
                            <b-iconstack font-scale="2.2" v-if="checkCatalogueNumber">
                              <b-icon stacked icon="square"></b-icon>
                              <b-icon
                              stacked icon="check" variant="success"
                              ></b-icon>
                            </b-iconstack>
                            <b-iconstack font-scale="2.2" v-else>
                              <b-icon stacked icon="square"></b-icon>
                              <b-icon
                              stacked icon="x" variant="danger"
                              ></b-icon>
                            </b-iconstack>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                    <b-row class="mt-5" align-h="start">
                      <b-col md="auto">
                        <h5>Description:</h5>
                      </b-col>
                      <b-col md="auto">{{ currentStockItem.factory_item.description_de }}</b-col>
                    </b-row>
                    <!-- END STOCK ITEM CARD -->
                  </b-card>
                </b-col>
                <b-col cols="4">
                  <b-row>
                    <b-col>
                      <b-card class="mt-3">
                        <!-- CARD CLIENT PRICE -->
                        <b-row align-h="between">
                          <b-col md="auto">
                            <b-form-group
                                id="form-passport-group"
                                label="Amount (unit)"
                                label-for="form-passport-input"
                            >
                                <b-row align-h="around">
                                    <b-col cols="4">
                                      <h5 class="bg-secondary text-light">
                                        {{ currentStockItem.items_amount }}
                                      </h5>
                                    </b-col>
                                </b-row>
                            </b-form-group>
                          </b-col>
                          <b-col md="auto">
                            <b-form-group
                                id="form-client-price-group"
                                label="Price for client(EUR)"
                                label-for="form-client-price-input"
                            >
                                <b-row align-h="around">
                                    <b-col cols="4">
                                      <h5 class="bg-secondary text-light">
                                        {{ currentStockItem.current_price_eur }}
                                      </h5>
                                    </b-col>
                                </b-row>
                            </b-form-group>
                          </b-col>
                        </b-row>
                      <!-- END CARD CLIENT PRICE -->
                      </b-card>
                    </b-col>
                  </b-row>
                    <b-row class="mt-3" align-h="end" align-v="end">
                      <b-col md="auto" align-self="end">
                        <b-row><b-col><label>Factor</label></b-col></b-row>
                        <b-row><b-col class="mt-1">
                          <h5 class="bg-secondary text-light">{{ currentStockItem.factor }}
                          </h5>
                        </b-col></b-row>
                      </b-col>
                      <b-col md="auto">
                        <b-row><b-col><label>Factory price</label></b-col></b-row>
                        <b-row>
                          <b-col align-self="center">
                            <b-input
                              v-model.number="tmpFactoryPrice"
                              debounce="700"
                            ></b-input>
                            <!-- Crutch for call computed method for calc factor -->
                              <div v-if="watchForStockItemFactoryPrice"></div>
                            <!--  -->
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                </b-col>
              </b-row>
              <b-row class="mt-3 mb-5" align-h="end">
                <b-col cols="2">
                  <b-button
                    @click="back"
                    variant="danger">Cancel</b-button>
                </b-col>
                <b-col cols="2">
                  <b-button
                    :disabled="currentFactoryItem.id==null || currentStockItem.factor=='Infinity'"
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
import navbar from './myPage/navbar.vue';

export default {
  components: {
    factoryItemModal,
    navbar,
  },
  data() {
    return {
      popForFactory: false,
      popForCollection: false,
      time: 1,
      timerFactory: null,
      timerCollection: null,
      tmpFactoryPrice: 0,
    };
  },
  mounted() {
    this.tmpFactoryPrice = this.currentStockItem.factory_price_eur;
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
    // addItem() {
    //   this.$store.dispatch('ADD_ITEM_TO_LIST_STOCK_ITEMS');
    // },
    saveItemExp() {
      const item = _.cloneDeep(this.currentStockItem);
      item.factory_item = this.currentFactoryItem.id;
      item.is_correct = true;
      const savingItem = [];
      savingItem.push('save_correct');
      savingItem.push(item);
      this.$store.dispatch('SAVE_STOCK_ITEM_EXP_VIA_ARRAY', savingItem);
      this.$router.push(this.backStep);
      this.$store.dispatch('SET_CURRENT_STEP', this.backStep);
    },
    back() {
      if (this.currentImportOrder.id !== null) {
        this.$store.dispatch('GET_LIST_STOCK_ITEMS_EXP_FOR_IMPORT_ORDER', this.currentImportOrder);
      }
      this.$router.push(this.backStep);
      this.$store.dispatch('SET_CURRENT_STEP', this.backStep);
    },
    checkObjectByType(obj, objType) {
      let foundObj = {};
      if (objType === 'factory') {
        foundObj = _.find(this.listNameFactories, ['name', obj]);
      } else if (objType === 'collections') {
        foundObj = _.find(this.listNameFactoryCollections, ['name', obj]);
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
    calcAndSaveFactor() {
      this.$store.dispatch('CALC_FACTOR_STOCK_ITEM');
    },
  },
  computed: {
    role() {
      return this.$store.getters.GET_AUTHOR;
    },
    backStep() {
      return this.$store.getters.GET_BACK_STEP;
    },
    currentStockItem() {
      return this.$store.getters.GET_CURRENT_STOCK_ITEM_EXP;
    },
    currentImportOrder() {
      return this.$store.getters.GET_SINGLE_IMPORT_ORDER;
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
    watchForStockItemFactoryPrice() {
      return this.calcAndSaveFactor(
        this.currentStockItem.factory_price_eur,
      );
    },
    typeFactoryItem() {
      return this.$store.getters.GET_TYPE_FACTORY_ITEM;
    },
    currentFactoryItem() {
      return this.$store.getters.GET_CURRENT_FACTORY_ITEM;
    },
    currentFactoryColleciton() {
      return this.$store.getters.GET_CURRENT_COLLECTION;
    },
    currentFactory() {
      return this.$store.getters.GET_CURRENT_FACTORY;
    },
  },
  watch: {
    tmpFactoryPrice() {
      this.currentStockItem.factory_price_eur = this.tmpFactoryPrice;
      this.calcAndSaveFactor();
    },
  },
};
</script>
