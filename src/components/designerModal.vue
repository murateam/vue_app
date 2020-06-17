<template>
    <b-modal
    hide-footer
    id="designer-modal"
    ref="designer-modal">
        <b-container>
            <b-row align-h="center">
                <b-col cols="4"><h3>Дизайнер</h3></b-col>
            </b-row>
            <b-row align-h="center">
              <b-col cols="11">
                <b-form-group
                    id="form-designer-group"
                    label="Имя"
                    label-for="form-designer-input"
                >
                  <b-input placeholder="Имя"
                  type="text"
                  v-model="singleClientOrder.designer"></b-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row align-h="center">
              <b-col cols="11">
                <b-form-group
                    id="form-designer-group"
                    label="Вознаграждение (RUB)"
                    label-for="form-designer-input"
                >
                  <b-input placeholder="Reward"
                  type="number"
                  v-model.number="singleClientOrder.d_percent"></b-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row align-h="end" class="mt-3">
                <b-col cols="3">
                  <b-button variant="danger" @click="cencel">Cancel</b-button>
                </b-col>
                <b-col cols="4">
                  <b-button @click="saveDesigner" variant="primary">Save</b-button>
                </b-col>
            </b-row>
        </b-container>
    </b-modal>
</template>

<script>
export default {
  methods: {
    show() {
      this.$refs['designer-modal'].show();
    },
    hide() {
      this.$refs['designer-modal'].hide();
    },
    cencel() {
      this.hide();
    },
    saveDesigner() {
      this.$store.dispatch('SET_DESIGNER_WITH_CALC_PRICE');
      // this.$store.dispatch('CHANGE_STOCK_ITEMS_WITH_CALC_PRICE');
      this.hide();
    },
  },
  computed: {
    singleClientOrder() {
      return this.$store.getters.GET_DESIGNER_FOR_MODAL;
    },
  },
};
</script>
