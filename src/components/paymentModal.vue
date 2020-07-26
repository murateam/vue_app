<template>
    <b-modal
    id="payment-modal"
    ref="payment-modal"
    hide-footer
    size='lg'>
      <b-form>
        <b-container>
          <!-- {{ singlePayment }} -->
          <b-row align-h="center">
            <b-form-group
            label-size="lg"
            label="Payment"></b-form-group>
          </b-row>
          <b-row align-h="center">
              <b-col cols="4">
                  <h6>For order: {{ singleClientOrder.public_num }}</h6>
              </b-col>
          </b-row>
          <b-row align-h="end" v-if="singlePayment.id != null">
              <b-col cols="3">
                <h6>Created: {{dateFilter(singlePayment.created)}}</h6>
              </b-col>
          </b-row>
          <b-row class="mt-3" align-h="end">
            <b-col></b-col>
            <b-col cols="3">
              <label for="input-payment-date">Payment date</label>
              <b-input id="input-payment-date"
              required
              type="date"
              v-model="paymentDate"
              placeholder="Payment date"></b-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <label for="input-payment-comment">Comment</label>
              <b-input id="input-payment-comment"
              type="text"
              v-model="singlePayment.comment"
              placeholder="Comment"></b-input>
            </b-col>
          </b-row>
          <b-row align-h="end" class="mt-3">
            <b-col cols="4">
                <b-form-group
                    id="form-value-group"
                    label="Payment (RUB)"
                    label-for="form-value-input"
                >
                    <b-row align-h="end">
                        <b-col cols="12">
                            <b-input placeholder="Payment"
                            required
                            type="number"
                            v-model.number="singlePayment.payment_value"></b-input>
                        </b-col>
                    </b-row>
                </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mt-3" align-h="end">
            <b-col cols="2">
              <b-button variant="danger">Cancel</b-button>
            </b-col>
            <b-col cols="2">
              <b-button
              v-if="singlePayment.id === null"
              variant="primary" @click="savePayment">Add</b-button>
              <b-button
              v-else
              variant="primary" @click="savePayment">Save</b-button>
            </b-col>
          </b-row>
        </b-container>
      </b-form>
    </b-modal>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      paymentDate: null,
    };
  },
  methods: {
    show() {
      this.$refs['payment-modal'].show();
    },
    hide() {
      this.$refs['payment-modal'].hide();
    },
    savePayment() {
      this.$store.dispatch('SAVE_PAYMENT', this.paymentDate);
      this.hide();
    },
    dateFilter(value) {
      return moment(String(value)).format('YY-MM-DD');
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
