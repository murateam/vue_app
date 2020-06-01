<template>
    <b-container>
        <b-row>
            <b-col>
                <!-- {{ alertMessCountDown }} -->
                <b-alert
                    class="position-fixed fixed-top m-0 rounded-0"
                    :show="successMessCountDown"
                    dismissible
                    variant="success"
                    @dismissed="clientOrderCountDown=0"
                    @dismiss-count-down="clientOrderDownChanged"
                >
                    Договор успешно сохранен!
                </b-alert>
                <b-alert
                    class="position-fixed fixed-top m-0 rounded-0"
                    :show="unSuccessMessCountDown"
                    dismissible
                    variant="danger"
                    @dismissed="clientOrderCountDown=0"
                    @dismiss-count-down="clientOrderDownChanged"
                >
                    Ошибка! Договор не сохранен!
                </b-alert>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
  data() {
    return {
      dismissSecs: 3,
      clientOrderCountDown: 0,
    };
  },
  methods: {
    clientOrderDownChanged(clientOrderCountDown) {
      if (clientOrderCountDown === 0) {
        this.$store.dispatch('SET_COUNT_FOR_SUCCESS_OF_CLIENT_ORDER', 0);
      }
    },
    showClientOrderAlertSuccess() {
      this.clientOrderCountDown = this.dismissSecs;
    },
  },
  computed: {
    successMessCountDown() {
      return this.$store.getters.GET_SUCCESS_MESSAGE_COUNT_DOWN;
    },
    unSuccessMessCountDown() {
      return this.$store.getters.GET_UNSUCCESS_MESSAGE_COUNT_DOWN;
    },
  },
};
</script>
