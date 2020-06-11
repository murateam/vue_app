<template>
    <div>
      <div>
        <b-form>
          <b-container>
            <b-row align-h="start" class="mt-3">
              <b-col cols="2">
                <b-button
                  class="btn btn-dark"
                  @click="backToStockTableExp"
                >Назад</b-button>
              </b-col>
            </b-row>
              <h3>Expanded</h3>
            <b-row align-h="center">
              <b-form-group
              label="Товар"></b-form-group>
            </b-row>
              {{ currentStockItem }}
              {{ isNewStockItem }}
            <b-row>
              <b-col>
                <label for="input-factory">Фабрика</label>
                <b-input id="input-factory"
                placeholder="Фабрика"></b-input>
              </b-col>
              <b-col>
                <label for="input-collection">Коллекция</label>
                <b-input id="input-collection"
                placeholder="Коллекция"></b-input>
              </b-col>
              <b-col>
                <label for="input-catalog-num">Номер каталога</label>
                <b-input id="input-catalog-num"
                placeholder="Номер каталога"></b-input>
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
                              type="number"></b-input>
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
                              type="number"></b-input>
                          </b-col>
                      </b-row>
                  </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mt-3" align-h="end">
              <b-col cols="2">
                <b-button variant="danger">Отменить</b-button>
              </b-col>
              <b-col cols="2">
                <b-button variant="primary">Добавить</b-button>
              </b-col>
              <b-col cols="2">
                <b-button variant="primary">Сохранить</b-button>
              </b-col>
            </b-row>
          </b-container>
        </b-form>
      </div>
      <div><h3>Forbidden</h3></div>
    </div>
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
    hide() {
      this.$refs['stock-item-modal'].hide();
    },
    addItem() {
      this.$store.dispatch('ADD_ITEM_TO_LIST_STOCK_ITEMS');
    },
    saveItem() {
      this.$store.dispatch('CHANGE_STOCK_ITEM');
    },
    cencel() {
      this.$store.dispatch('SET_EMPTY_STOCK_ITEM');
    },
    backToStockTableExp() {
      this.$router.push('stockList');
    },
  },
  computed: {
    currentStockItem() {
      return null;
    },
    isNewStockItem() {
      return null;
    },
  },
};
</script>
