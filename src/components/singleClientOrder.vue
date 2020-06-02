<template>
  <div>
      <client-modal
      ref="client-modal"></client-modal>
            <b-container>
              <b-row class="mt-3" align-h="start">
                <b-col cols="2">
                  <router-link
                  class="btn btn-dark"
                  to="manageTab">Назад</router-link>
                </b-col>
              </b-row>
              {{ singleClientOrder }}
              <b-row align-h="center" class="mt-4">
                <b-col cols="5">
                  <h3 v-if="singleClientOrder.public_num">
                    Заказ № {{singleClientOrder.public_num}}</h3>
                  <h3 v-else>Новый заказ</h3>
                </b-col>
              </b-row>
              <b-row align-h="end" v-if="singleClientOrder.created">
                <b-col cols="4">
                  <p>Создан: {{dateFilter(singleClientOrder.created)}}</p>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="8">
                  <b-card>
                  <b-row>
                    <b-col>
                      <h5>Заказчик</h5>
                    </b-col>
                  </b-row>
                  <template>
                    <form>
                      <b-row v-if="singleClientOrder.state == 'draft'" align-h="end" class="mt-2">
                        <b-col cols="4">
                          <b-button
                            v-if="author == 2"
                            aria-controls="collapseChoiceOtherClient"
                            @click="changeVisibleChoiceOtherClient"
                          >Сменить заказчика</b-button>
                        </b-col>
                      </b-row>
                      <b-collapse
                        id="collapseChoiceOtherClient"
                        :visible="visibleChoiceOtherClient"
                      >
                        <label for="input-with-list"></label>
                        <b-row align-h="start">
                          <b-col cols="3">
                            <b-button
                            @click="checkClient"
                            variant="success">Найти</b-button>
                          </b-col>
                          <b-col cols="5">
                              <label class="sr-only"
                              for="inline-form-input-name"
                              >ФИО</label>
                              <b-input
                              id="inline-form-input-name"
                              class="md-2 mr-sm-2 mb-sm-0"
                              placeholder="Фамилия Имя Отчество"
                              v-model="checkClientName.name"></b-input>
                          </b-col>
                          <!-- <b-col cols="3">
                            <b-button
                            variant="primary">Внести нового</b-button>
                          </b-col> -->
                        </b-row>
                      </b-collapse>
                      <b-collapse
                      ref="client-details"
                      id="client-details"
                      :visible="isClientExist"
                      class="mt-3">
                        <b-card class="mt-2">
                          <b-row class="mb-1">
                            <b-col sm="3" class ="text-sm-right"><b>Клиент:</b></b-col>
                            <b-col>
                              {{ singleClient.last_name }}
                              {{ singleClient.first_name }}
                              {{ singleClient.middle_name }}
                            </b-col>
                          </b-row>
                          <b-row class="mb-1">
                            <b-col sm=3 class="text-sm-right"><b>Дата рождения:</b></b-col>
                            <b-col>{{ singleClient.birth_date }}
                            </b-col>
                          </b-row>
                          <b-row class=mb-1>
                            <b-col sm="3" class = "text-sm-right">
                              <b>Паспорт: </b>
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
                            <b-col><b>Телефон: </b></b-col>
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
                              <b>Адресс: </b>
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
                            >Редактировать</b-button>
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
                        @click="setDesigner">Дизайнер</b-button>
                        <h5 v-else>Дизайнер</h5>
                      </b-col>
                      <b-col v-else><h5>Дизайнер</h5></b-col>
                    </b-row>
                    <b-row class="mt-3" align-h="end">
                      <b-col cols="3">Имя:</b-col>
                      <b-col cols="7">
                        <h5>{{singleClientOrder.designer}}</h5>
                      </b-col>
                    </b-row>
                    <b-row class="mt-2">
                      <b-col cols="7">Вознаграждение:</b-col>
                      <b-col>
                        <h6>{{singleClientOrder.d_percent}} RUB</h6>
                        <!-- <b-form-input
                            placeholder="Вознаграждение"
                            type=number
                            v-model=singleClientOrder.d_percent
                        ></b-form-input> -->
                      </b-col>
                    </b-row>
                  </b-card>
                  <b-card class="mt-3">
                    <b-row>
                      <b-col>Курс:</b-col>
                      <b-col cols="6">
                        <div class="bg-secondary text-light">
                          {{eurRate.current_rate}} RUB/EUR</div>
                      </b-col>
                    </b-row>
                    <b-row align-h="between" class="mt-4">
                          <b-col cols="6">Общая стоимость:</b-col>
                          <b-col cols="6">
                            <div class="bg-secondary text-light">
                              {{singleClientOrder.price}} RUB
                            </div>
                          </b-col>
                    </b-row>
                    <b-row align-h="between" class="mt-4">
                          <b-col cols="6">Оплачено:</b-col>
                          <b-col cols="6">
                            <div class="bg-secondary text-light">
                              {{singleClientOrder.total_payment}} RUB</div>
                          </b-col>
                    </b-row>
                  </b-card>
                </b-col>
              </b-row>
                <b-form-group
                    id="form-description-group"
                    label="Дополнительно:"
                    label-for="form-description-input"
                    class="mt-5"
                >
                    <b-form-input
                      v-if="author == 2"
                      id="form-description-input"
                      type="text"
                      placeholder="Коментарий к заказа"
                      v-model=singleClientOrder.comment
                      ></b-form-input>
                    <div v-else><h5>{{ singleClientOrder.comment }}</h5></div>
                </b-form-group>
                <b-row align-h="end" class="mt-3" v-if="author == 2">
                  <b-col cols="2">
                    <b-button
                    @click="cancelSaveClientOrder"
                    variant="danger">Отмена</b-button>
                  </b-col>
                  <b-col cols="2">
                    <b-button
                    @click="saveClientOrder"
                    variant="primary">Сохранить</b-button>
                  </b-col>
                </b-row>
                <!-- {{ eurRate }} -->
                <!-- {{ singleClientOrder }} -->
                <!-- {{ listItems }} -->
                <!-- {{listDelete}} -->
                <div v-if="author == 2">
                  <b-row align-h="center" class="mt-3">
                    <b-col cols="4"><h4>Позиции:</h4></b-col>
                  </b-row>
                  <b-row align-h="start">
                    <b-col cols="3">
                      <b-button
                      v-if="singleClientOrder.state == 'draft'"
                      @click="addStockItem"
                      >Добавить позицию</b-button>
                    </b-col>
                  </b-row>
                  <b-row class="mt-4">
                    <stock-item-modal ref="stock-item-modal"></stock-item-modal>
                    <stock-table> </stock-table>
                    <designer-modal ref="designer-modal"></designer-modal>
                  </b-row>
                </div>
                <div v-if="author == 3">
                  <b-row align-h="center" class="mt-3">
                    <b-col cols="4"><h4>Платежи:</h4></b-col>
                  </b-row>
                  <b-row align-h="start">
                    <b-col cols="3">
                      <b-button
                      @click="addPayment"
                      >Добавить платеж</b-button>
                    </b-col>
                  </b-row>
                  <b-row>
                    <payment-modal ref="payment-modal"></payment-modal>
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

export default {
  components: {
    clientModal,
    stockTable,
    stockItemModal,
    designerModal,
    paymentModal,
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
      return moment(String(value)).format('DD/MM/YYYY');
    },
    checkClient() {
      this.$store.dispatch('RESET_CURRENT_CLIENT');
      const requestData = this.checkClientName;
      this.$store.dispatch('CHECK_CLIENT', requestData);
      // this.clientCollapseVisible = true;
      // axios.post(clientCheckURL, requestData).then((response) => {
      //   this.Client = response.data;
      //   this.clientOrder.client = response.data.id;
      // }).then(() => { this.clientCollapseVisible = true; });
    },
    saveClientOrder() {
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
        this.$router.push('./manageTab');
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
        };
        this.$store.dispatch('SAVE_CLIENT_ORDER', requestData);
        this.$router.push('./manageTab');
      }
      // this.hide();
    },
    cancelSaveClientOrder() {
      this.resetAllState();
      this.$router.push('/manageTab');
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
