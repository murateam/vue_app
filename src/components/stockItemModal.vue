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
          <b-row>
            <b-col>
              <label for="input-factory"></label>
              <b-input id="input-factory"
              v-model="currentStockItem.factory_item.factory_collection.factory.name"
              placeholder="Фабрика"></b-input>
              <!-- <b-input id="input-factory" v-else
              v-model="currentStockItem.incorrect_factory"
              placeholder="Фабрика"></b-input> -->
            </b-col>
            <b-col>
              <label for="input-collection"></label>
              <b-input id="input-collection"
              v-model="currentStockItem.factory_item.factory_collection.name"
              placeholder="Коллекция"></b-input>
            </b-col>
            <b-col>
              <label for="input-catalog-num"></label>
              <b-input id="input-catalog-num"
              v-model="currentStockItem.factory_item.catalogue_number"
              placeholder="Номер каталога"></b-input>
            </b-col>
          </b-row>
          <b-row align-h="end" class="mt-3">
            <b-col cols="3">
                <b-form-group
                    id="form-passport-group"
                    label="Колличество"
                    label-for="form-passport-input"
                >
                    <b-row align-h="around">
                        <b-col>
                            <b-input placeholder="Колличество"
                            v-model="currentStockItem.items_amount"></b-input>
                        </b-col>
                    </b-row>
                </b-form-group>
            </b-col>
            <b-col cols="3">
                <b-form-group
                    id="form-passport-group"
                    label="Цена"
                    label-for="form-passport-input"
                >
                    <b-row align-h="around">
                        <b-col>
                            <b-input placeholder="Цена"
                            type="number"
                            v-model.number="currentStockItem.current_price_ru"></b-input>
                        </b-col>
                    </b-row>
                </b-form-group>
            </b-col>
            <!-- <b-col cols="2">
              <label for="price"></label>
              <b-input id="price"
              type="number"
              v-model="currentStockItem.current_price_ru"
              placeholder="Цена"></b-input>
            </b-col> -->
          </b-row>
          <!-- <b-row>
            <b-col></b-col>
            <b-col>
              <label for="input-amount"></label>
              <b-input id="input-amount"
              type="number"
              v-model="currentStockItem.items_amount"
              placeholder="Колличество"></b-input>
            </b-col>
          </b-row> -->
          <b-row class="mt-3" align-h="end">
            <b-col cols="2">
              <b-button variant="danger">Отменить</b-button>
            </b-col>
            <b-col cols="2">
              <b-button variant="primary" @click="addItem">Сохранить</b-button>
            </b-col>
          </b-row>
        </b-container>
      </b-form>
    </b-modal>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    this.$store.dispatch('SET_EMPTY_STOCK_ITEM');
  },
  methods: {
    show() {
      this.$refs['stock-item-modal'].show();
    },
    addItem() {
      this.$store.dispatch('ADD_ITEM_TO_LIST_STOCK_ITEMS');
    },
  },
  // mounted() {
  //   this.$store.dispatch('SET_EMPTY_STOCK_ITEM');
  // },
  computed: {
    currentStockItem() {
      return this.$store.getters.GET_CURRENT_STOCK_ITEM;
    },
  },
};
</script>
