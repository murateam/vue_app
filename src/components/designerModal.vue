<template>
    <b-modal
    hide-footer
    id="designer-modal"
    ref="designer-modal">
        <b-container>
            <b-row>
                <b-col><h3>Дизайнер</h3></b-col>
            </b-row>
            <b-row>
                <b-col>{{ singleClientOrder }}</b-col>
            </b-row>
            <b-row>
                <b-col><b-button @click="cencel">Закрыть</b-button></b-col>
                <b-col><b-button>Сохранить</b-button></b-col>
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
  },
  computed: {
    singleClientOrder() {
      this.$store.getters.GET_SINGLE_CLIENT_ORDER;
    },
  },
}
</script>