<template>
    <b-modal
    id="stockItemModal"
    ref="stock-item-modal"
    hide-footer
    size='lg'>
      <b-form>
        <b-container>
          <b-row align-h="center">
            <b-form-group
            label="Товар"></b-form-group>
          </b-row>
            {{ currentStockItem }}
            {{ isNewStockItem }}
          <b-row>
            <b-col>
              <label for="input-factory">Factory</label>
              <b-input id="input-factory"
              trim
              aria-describedby="input-live-help input-live-feedback"
              :state="checkFactory"
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
            <b-col>
              <label for="input-collection">Collection</label>
                <b-input id="input-collection"
                debounce="700"
                :state="checkFactoryCollections"
                list="factory-collections-list"
                v-model="currentStockItem.factory_item.factory_collection.name"
                placeholder="Collection"></b-input>
                <datalist id="factory-collections-list">
                  <option
                    v-for="collection in listNameFactoryCollections" :key="collection.name"
                  >{{ collection.name }}</option>
                </datalist>
            </b-col>
            <b-col>
              <label for="input-catalog-num">Catalogue number</label>
                <b-input id="input-catalog-num"
                debounce="700"
                :state="checkCatalogueNumber"
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
          <b-row align-h="end" class="mt-3">
            <b-col cols="3">
                <b-form-group
                    id="form-passport-group"
                    label="Колличество (ед.)"
                    label-for="form-passport-input"
                >
                    <b-row align-h="around">
                        <b-col>
                            <b-input placeholder="Колличество"
                            type="number"
                            v-model.number="currentStockItem.items_amount"></b-input>
                        </b-col>
                    </b-row>
                </b-form-group>
            </b-col>
            <b-col cols="3">
                <b-form-group
                    id="form-passport-group"
                    label="Цена (EUR)"
                    label-for="form-passport-input"
                >
                    <b-row align-h="around">
                        <b-col>
                            <b-input placeholder="Цена"
                            type="number"
                            v-model.number="currentStockItem.current_price_eur"></b-input>
                        </b-col>
                    </b-row>
                </b-form-group>
            </b-col>
          </b-row>
          <b-row align-h="start" no-gutters>
            <b-col md="auto" align-self="center"><h6>Comment:</h6></b-col>
            <b-col>
              <b-input
                type="text"
                v-model="currentStockItem.comment"
              ></b-input>
            </b-col>
          </b-row>
          <b-row class="mt-3" align-h="end">
            <b-col cols="2">
              <b-button variant="danger" @click="cencel">Отменить</b-button>
            </b-col>
            <b-col cols="2" v-if="isNewStockItem">
              <b-button variant="primary" @click="addItem">Добавить</b-button>
            </b-col>
            <b-col cols="2" v-else>
              <b-button variant="primary" @click="saveItem">Сохранить</b-button>
            </b-col>
          </b-row>
        </b-container>
      </b-form>
    </b-modal>
</template>

<script>
import _ from 'lodash';

export default {
  data() {
    return {};
  },
  created() {
    this.$store.dispatch('SET_EMPTY_STOCK_ITEM');
    this.$store.dispatch('GET_LIST_NAME_FACTORIES');
  },
  methods: {
    show() {
      this.$refs['stock-item-modal'].show();
    },
    hide() {
      this.$refs['stock-item-modal'].hide();
    },
    addItem() {
      this.$store.dispatch('ADD_ITEM_TO_LIST_STOCK_ITEMS');
      this.hide();
    },
    saveItem() {
      this.$store.dispatch('CHANGE_STOCK_ITEM');
      this.hide();
    },
    cencel() {
      this.hide();
      this.$store.dispatch('SET_EMPTY_STOCK_ITEM');
    },
    checkObjectByProperty(obj, objType) {
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
        this.getNextDataList(objType);
      }
      return result;
    },
    getNextDataList(objType) {
      if (objType === 'factory') {
        const factory = this.currentStockItem.factory_item.factory_collection.factory.name;
        this.$store.dispatch('GET_LIST_COLLECTIONS_BY_FACTORY', factory);
      } else if (objType === 'collections') {
        const collections = this.currentStockItem.factory_item.factory_collection.name;
        this.$store.dispatch('GET_CATALOGUE_NUMBERS_BY_COLLECTION', collections);
      }
    },
  },
  computed: {
    currentStockItem() {
      return this.$store.getters.GET_CURRENT_STOCK_ITEM;
    },
    isNewStockItem() {
      return this.$store.getters.GET_IS_NEW_STOCK_ITEM;
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
      return this.checkObjectByProperty(
        this.currentStockItem.factory_item.factory_collection.factory.name,
        'factory',
      );
    },
    checkFactoryCollections() {
      return this.checkObjectByProperty(
        this.currentStockItem.factory_item.factory_collection.name,
        'collections',
      );
    },
    checkCatalogueNumber() {
      return this.checkObjectByProperty(
        this.currentStockItem.factory_item.catalogue_number,
        'catalogueNumber',
      );
    },
  },
};
</script>
