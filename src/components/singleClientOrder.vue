<template>
  <div>
      <client-modal
      ref="client-modal"></client-modal>
            <b-container>
              <b-row>
                <b-col>
                  <navbar>
                  </navbar>
                </b-col>
              </b-row>
              <b-row align-h="center" class="mt-4">
                <b-col cols="5">
                  <h3 v-if="singleClientOrder.public_num">
                    Order # {{singleClientOrder.public_num}}</h3>
                  <h3 v-else>New order</h3>
                </b-col>
              </b-row>
              <b-row align-h="end" v-if="singleClientOrder.created">
                <b-col cols="4">
                  <p>Created: {{dateFilter(singleClientOrder.created)}}</p>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="8">
                  <b-card>
                  <b-row>
                    <b-col>
                      <h5>Customer</h5>
                    </b-col>
                  </b-row>
                  <template>
                    <form>
                      <b-row v-if="singleClientOrder.state == 'draft'" align-h="end" class="mt-2">
                        <b-col cols="4" v-if="singleClientOrder.public_num">
                          <div v-if="singleClientOrder.payment_status == 'waiting for payment'">
                            <b-button
                              v-if="author == 2"
                              aria-controls="collapseChoiceOtherClient"
                              @click="changeVisibleChoiceOtherClient"
                            >Change customer</b-button>
                          </div>
                        </b-col>
                      </b-row>
                      <b-collapse
                        v-if="author == 2"
                        id="collapseChoiceOtherClient"
                        :visible="visibleChoiceOtherClient"
                      >
                        <label for="input-with-list"></label>
                        <b-row align-h="start">
                          <b-col md="auto">
                            <b-button
                            @click="checkClient"
                            variant="success">Find</b-button>
                          </b-col>
                          <b-col md="auto">
                              <label class="sr-only"
                              for="inline-form-input-name"
                              >'First name' 'Last name'</label>
                              <b-input
                              id="inline-form-input-name"
                              class="md-2 mr-sm-2 mb-sm-0"
                              placeholder="'First name' 'Last name'"
                              v-model="checkClientName.name"></b-input>
                          </b-col>
                        </b-row>
                      </b-collapse>
                      <b-collapse
                      ref="client-details"
                      id="client-details"
                      :visible="isClientExist"
                      class="mt-3">
                        <b-card class="mt-2">
                          <b-row class="mb-1">
                            <b-col sm="3" class ="text-sm-right"><b>Client:</b></b-col>
                            <b-col>
                              {{ singleClient.first_name }}
                              {{ singleClient.middle_name }}
                              {{ singleClient.last_name }}
                            </b-col>
                          </b-row>
                          <b-row class="mb-1">
                            <b-col sm=3 class="text-sm-right"><b>Birth date:</b></b-col>
                            <b-col>{{ singleClient.birth_date }}
                            </b-col>
                          </b-row>
                          <b-row class=mb-1>
                            <b-col sm="3" class = "text-sm-right">
                              <b>ID: </b>
                            </b-col>
                            <b-col>
                              {{ separateClientDetails.passportSeries }}
                              {{ separateClientDetails.passportNumber }}
                              {{ separateClientDetails.passportGiven }}
                            </b-col>
                          </b-row>
                          <b-row class=mb-1>
                            <b-col sm="3" class = "text-sm-right">
                            </b-col>
                            <b-col></b-col>
                            <b-col><b>Phone: </b></b-col>
                            <b-col>{{ singleClient.phone}}</b-col>
                          </b-row>
                          <b-row class=mb-1>
                            <b-col sm="3" class = "text-sm-right">
                            </b-col>
                            <b-col></b-col>
                            <b-col><b>Email: </b></b-col>
                            <b-col>{{ singleClient.email }}</b-col>
                          </b-row>
                          <b-row class=mb-1>
                            <b-col sm="3" class = "text-sm-right">
                              <b>Address: </b>
                            </b-col>
                            <b-col>
                              {{ separateClientDetails.addressCountry }}
                              {{ separateClientDetails.addressArea }}
                              {{ separateClientDetails.addressCity }}
                              {{ separateClientDetails.addressStreet }}
                            </b-col>
                          </b-row>
                        </b-card>
                        <b-row class="mt-2" align-h="end">
                          <b-col cols="4">
                            <b-button
                            v-if="author == 2"
                            @click="editClient"
                            >Edit</b-button>
                          </b-col>
                        </b-row>
                      </b-collapse>
                    </form>
                  </template>
                  </b-card>
                </b-col>
                <b-col align-self="start">
                  <b-card>
                    <b-row>
                      <b-col v-if="author == 2">
                        <b-button
                        v-if="singleClientOrder.state == 'draft'"
                        @click="setDesigner">Designer</b-button>
                        <h5 v-else>Designer</h5>
                      </b-col>
                      <b-col v-else><h5>Designer</h5></b-col>
                    </b-row>
                    <b-row class="mt-3" align-h="center">
                      <b-col md="auto">Name:</b-col>
                      <b-col md="auto">
                        <h5>{{singleClientOrder.designer}}</h5>
                      </b-col>
                    </b-row>
                    <b-row class="mt-2" align-h="center">
                      <b-col md="auto">Reward:</b-col>
                      <b-col md="auto">
                        <h6>{{singleClientOrder.d_percent}} RUB</h6>
                      </b-col>
                    </b-row>
                  </b-card>
                  <b-card class="mt-3">
                    <b-row>
                      <b-col>Rate:</b-col>
                      <b-col cols="6">
                        <div class="bg-secondary text-light">
                          {{eurRate.current_rate}} RUB/EUR</div>
                      </b-col>
                    </b-row>
                    <b-row align-h="between" class="mt-4">
                          <b-col cols="6">Total price:</b-col>
                          <b-col cols="6">
                            <div class="bg-secondary text-light">
                              {{singleClientOrder.price}} RUB
                            </div>
                          </b-col>
                    </b-row>
                    <b-row align-h="between" class="mt-4">
                          <b-col cols="6">Payment:</b-col>
                          <b-col cols="6">
                            <div class="bg-secondary text-light">
                              {{singleClientOrder.total_payment}} RUB</div>
                          </b-col>
                    </b-row>
                  </b-card>
                  <b-row align-h="center" class="mt-5">
                    <b-col md="auto">
                      <b-button
                      @click="cancelSaveClientOrder"
                      v-if="author == 2"
                      variant="danger">Cancel</b-button>
                    </b-col>
                    <b-col md="auto" v-if="author == 2">
                      <b-button
                      @click="saveClientOrder"
                      variant="primary">Save</b-button>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
                <b-form-group
                    id="form-description-group"
                    label="Comment:"
                    label-for="form-description-input"
                    class="mt-5"
                >
                    <b-form-input
                      v-if="author == 2"
                      id="form-description-input"
                      type="text"
                      placeholder="Comment to order"
                      v-model=singleClientOrder.comment
                      ></b-form-input>
                    <div v-else class="mb-3"><h5>{{ singleClientOrder.comment }}</h5></div>
                </b-form-group>
                <b-row align-h="end" class="mt-3" v-if="author == 2">
                  <!-- PRIOR PLACE OF BUTTONS -->
                </b-row>
                <div v-if="author == 2">
                  <b-row align-h="center" class="mt-3">
                    <b-col cols="4"><h4>Positions:</h4></b-col>
                  </b-row>
                  <b-row align-h="start">
                    <b-col cols="3">
                      <b-button
                      v-if="singleClientOrder.state == 'draft'"
                      @click="addStockItem"
                      >Add position</b-button>
                    </b-col>
                  </b-row>
                  <b-row class="mt-4">
                    <stock-item-modal ref="stock-item-modal"></stock-item-modal>
                    <stock-table> </stock-table>
                    <designer-modal ref="designer-modal"></designer-modal>
                  </b-row>
                </div>
                <div v-if="author == 3">
                <hr>
                  <b-row align-h="center" class="mt-3">
                    <b-col cols="4"><h4>Payments:</h4></b-col>
                  </b-row>
                  <b-row align-h="start">
                    <b-col cols="3">
                      <b-button
                      @click="addPayment"
                      >Add payment</b-button>
                    </b-col>
                  </b-row>
                  <b-row align-h="center" class="mt-3">
                    <b-col>
                      <payment-modal ref="payment-modal"></payment-modal>
                      <payment-table></payment-table>
                    </b-col>
                  </b-row>
                </div>
            </b-container>
  </div>
</template>

<script>
import moment from 'moment';
import clientModal from './clientModal.vue';
import stockTable from './stockTable.vue';
import stockItemModal from './stockItemModal.vue';
import designerModal from './designerModal.vue';
import paymentModal from './paymentModal.vue';
import paymentTable from './paymentTable.vue';
import navbar from './myPage/navbar.vue';

export default {
  components: {
    clientModal,
    stockTable,
    stockItemModal,
    designerModal,
    paymentModal,
    paymentTable,
    navbar,
  },
  data() {
    return {
      checkClientName: { name: '' },
    };
  },
  created() {
    this.$store.dispatch('RESET_CLIENT_ORDER');
    this.$store.dispatch('GET_CURRENT_RATE');
  },
  methods: {
    dateFilter(value) {
      return moment(String(value)).format('YY-MM-DD');
    },
    checkClient() {
      this.$store.dispatch('RESET_CURRENT_CLIENT');
      const requestData = this.checkClientName;
      this.$store.dispatch('CHECK_CLIENT', requestData);
    },
    async saveClientOrder() {
      if (this.singleClientOrder.id === null) {
        const requestData = {
          author: this.author,
          client: this.singleClient.id,
          price: this.singleClientOrder.price,
          designer: this.singleClientOrder.designer,
          d_percent: this.singleClientOrder.d_percent,
          comment: this.singleClientOrder.comment,
        };
        this.$store.dispatch('SAVE_CLIENT_ORDER', requestData);
      } else {
        const requestData = {
          id: this.singleClientOrder.id,
          public_num: this.singleClientOrder.public_num,
          author: this.author,
          client: this.singleClient.id,
          price: this.singleClientOrder.price,
          designer: this.singleClientOrder.designer,
          d_percent: this.singleClientOrder.d_percent,
          comment: this.singleClientOrder.comment,
          payment_status: 'waiting for payment',
        };
        this.$store.dispatch('SAVE_CLIENT_ORDER', requestData);
      }
      this.$router.push('/tabOfClientOrder');
      this.$store.dispatch('SET_CURRENT_STEP', '/tabOfClientOrder');
    },
    cancelSaveClientOrder() {
      this.resetAllState();
      this.$router.push('/tabOfClientOrder');
      this.$store.dispatch('SET_CURRENT_STEP', '/tabOfClientOrder');
    },
    resetAllState() {
      this.$store.dispatch('RESET_CURRENT_CLIENT');
      this.$store.dispatch('RESET_CLIENT_ORDER');
      this.$store.dispatch('RESET_LIST_ITEMS');
      this.checkClientName.name = '';
    },
    changeVisibleChoiceOtherClient() {
      if (this.visibleChoiceOtherClient === false) {
        this.$store.dispatch('SET_CAN_CHANGE_CLIENT', true);
      } else {
        this.$store.dispatch('SET_CAN_CHANGE_CLIENT', false);
      }
    },
    editClient() {
      this.$refs['client-modal'].show();
    },
    addStockItem() {
      this.$refs['stock-item-modal'].show();
      this.$store.dispatch('SET_EMPTY_STOCK_ITEM');
      this.$store.dispatch('SET_IS_NEW_STOCK_ITEM', true);
    },
    setDesigner() {
      this.$refs['designer-modal'].show();
      this.$store.dispatch('SET_DESIGNER_FOR_MODAL');
    },
    async addPayment() {
      // console.log('add_payment');
      // await this.$store.dispatch('RESET_SINGLE_PAYMENT');
      await this.$store.dispatch('SET_NEW_PAYMENT_FOR_CLIENT_ORDER');
      await this.$store.dispatch('SET_IS_NEW_PAYMENT', true);
      this.$refs['payment-modal'].show();
    },
  },
  computed: {
    author() {
      return this.$store.getters.GET_AUTHOR;
    },
    singleClient() {
      return this.$store.getters.GET_SINGLE_CLIENT;
    },
    separateClientDetails() {
      return this.$store.getters.GET_SEPARATE_CLIENT_DETAILS;
    },
    singleClientOrder() {
      return this.$store.getters.GET_SINGLE_CLIENT_ORDER;
    },
    isClientExist() {
      return this.$store.getters.GET_IF_CLIENT_EXIST;
    },
    visibleChoiceOtherClient() {
      return this.$store.getters.GET_CAN_CHANGE_CLIENT;
    },
    listItems() {
      return this.$store.getters.GET_LIST_STOCK_ITEMS;
    },
    listDelete() {
      return this.$store.getters.GET_LIST_DELETE_STOCK_ITEMS;
    },
    eurRate() {
      return this.$store.getters.GET_EUR_RATE;
    },
  },
  watch: {
    listItems() {
      this.$store.dispatch('CHANGE_STOCK_ITEMS_WITH_CALC_PRICE');
    },
  },
};
</script>
