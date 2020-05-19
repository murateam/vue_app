<template>
    <b-modal
    id="stockItemModal"
    hide-footer
    size='lg'>
      <b-form>
        <b-container>
          <b-row align-h="center">
            <b-form-group
            label="Товар"></b-form-group>
          </b-row>
          <b-row>
            <b-col>
              <label for="input-factory"></label>
              <b-input id="input-factory"
              v-model="Item.fabric"
              placeholder="Фабрика"></b-input>
            </b-col>
            <b-col>
              <label for="input-collection"></label>
              <b-input id="input-collection"
              v-model="Item.collection"
              placeholder="Коллекция"></b-input>
            </b-col>
            <b-col>
              <label for="input-catalog-num"></label>
              <b-input id="input-catalog-num"
              v-model="Item.catalogue_num"
              placeholder="Номер каталога"></b-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col></b-col>
            <b-col>
              <label for="price"></label>
              <b-input id="price"
              type="number"
              v-model="Item.price"
              placeholder="Цена"></b-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col></b-col>
            <b-col>
              <label for="input-amount"></label>
              <b-input id="input-amount"
              type="number"
              v-model="Item.amount"
              placeholder="Колличество"></b-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-button @click=addItem>Добавить</b-button>
            </b-col>
          </b-row>
          <dir>{{ Item }}</dir>
        </b-container>
      </b-form>
    </b-modal>
</template>

<script>
export default {
  data() {
    return {
      Item: {
        client_order: '',
        fabric: '',
        collection: '',
        catalogue_num: '',
        price: null,
        amount: null,
      },
    };
  },
  created() {
  },
  methods: {
    addItem() {
      const testItem = { name: 'test' };
      this.$store.dispatch('SAVE_TO_LIST_ITEMS', testItem);
    },
    // resetForm: {
    // },
    // resetModal: {
    // },
  },
};
</script>
