<template>
    <b-modal
    id="payment-modal"
    ref="payment-modal"
    hide-footer
    size='lg'>
      <b-form>
        <b-container>
          <b-row align-h="center">
            <b-form-group
            label-size="large"
            label="Платеж"></b-form-group>
          </b-row>
          <b-row>
              <b-col>
                  <h5>К договору: {{ singleClientOrder.public_num }}</h5>
              </b-col>
          </b-row>
          <b-row align-h="end" v-if="singlePayment.id != null">
              <b-col cols="3">
                <h7>Создан: {{ singlePayment.created }}</h7>
              </b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col>
              <label for="input-client-order">Клиентский договор</label>
              <b-input id="input-client-order"
              v-model="singlePayment.clientOrder"
              placeholder="Клиентский договор"></b-input>
            </b-col>
            <b-col>
              <label for="input-payment-date">Дата платежа</label>
              <b-input id="input-payment-date"
              type="date"
              v-model="singlePayment.payment_date"
              placeholder="Дата палтежа"></b-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <label for="input-payment-comment">Коментарий</label>
              <b-input id="input-payment-comment"
              v-model="singlePayment.comment"
              placeholder="Коментарий"></b-input>
            </b-col>
          </b-row>
          <b-row align-h="end" class="mt-3">
            <b-col cols="3">
                <b-form-group
                    id="form-value-group"
                    label="Платеж (RUB)"
                    label-for="form-value-input"
                >
                    <b-row align-h="end">
                        <b-col cols="12">
                            <b-input placeholder="Платеж"
                            type="number"
                            v-model.number="singlePayment.payment_value"></b-input>
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
            <!-- <b-col cols="2">
              <b-button variant="primary">Сохранить</b-button>
            </b-col> -->
          </b-row>
        </b-container>
      </b-form>
    </b-modal>
</template>

<script>
export default {
  methods: {
    show() {
      this.$refs['payment-modal'].show();
    },
  },
  created() {
    this.$store.dispatch('RESET_SINGLE_PAYMENT');
  },
  computed: {
    singlePayment() {
      return this.$store.getters.GET_SINGLE_PAYMENT;
    },
    singleClientOrder() {
      return this.$store.getters.GET_SINGLE_CLIENT_ORDER;
    },
  },
};
</script>
