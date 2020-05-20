<template>
    <b-modal
        id="single-client-order-modal"
        ref="single-client-order-modal"
        hide-footer
        title=''
        size="lg"
        @hidden="resetAllState"
    >
      <client-modal
      ref="client-modal"></client-modal>
            <b-container>
              <b-row align-h="center">
                <b-col cols="5">
                  <h3 v-if="singleClientOrder.public_num">
                    Заказ № {{singleClientOrder.public_num}}</h3>
                  <h3 v-else>Новый заказ</h3>
                </b-col>
              </b-row>
              <!-- <div>{{ singleClientOrder }}</div> -->
              <b-row align-h="end" v-if="singleClientOrder.created">
                <b-col cols="4">
                  <p>Создан: {{dateFilter(singleClientOrder.created)}}</p>
                </b-col>
              </b-row>
                <template>
                  <form>
                    <b-row v-if="singleClientOrder.state == 'draft'" align-h="end" class="mt-2">
                      <b-col cols="4">
                        <b-button
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
                    <!-- <div>{{ singleClientOrder }}</div> -->
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
                          @click="editClient"
                          >Редактировать</b-button>
                        </b-col>
                      </b-row>
                    </b-collapse>
                  </form>
                </template>
                <b-form-group
                    label="Дизайнер"
                    class="mt-3"
                >
                  <b-row align-h="between">
                    <b-col>
                      <b-form-input
                          type="text"
                          placeholder="Дизайнер"
                          v-model=singleClientOrder.designer
                      >
                      </b-form-input>
                    </b-col>
                    <b-col>
                      <b-form-input
                          placeholder="Вознаграждение"
                          type=number
                          v-model=singleClientOrder.d_percent
                      ></b-form-input>
                    </b-col>
                  </b-row>
                </b-form-group>
                <b-form-group
                    id="form-description-group"
                    label="Дополнительно:"
                    label-for="form-description-input"
                >
                    <b-form-input
                        id="form-description-input"
                        type="text"
                        placeholder="Коментарий к заказа"
                        v-model=singleClientOrder.comment
                        ></b-form-input>
                </b-form-group>
                <b-row align-h="end" class="mt-3">
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
                    <b-form-group
                        label="Позиции:"
                        label-class="font-weight-bold pt-0">
                    </b-form-group>
                  <stock-list> </stock-list>
                <!-- <b-card class="mt-2"
                bg-variant="light">
                <b-row>
                </b-row>
                </b-card> -->
            </b-container>
    </b-modal>
</template>

<script>
import moment from 'moment';
import clientModal from './clientModal.vue';
import stockList from './stockList.vue';

export default {
  components: {
    clientModal,
    stockList,
  },
  data() {
    return {
      checkClientName: { name: '' },
    };
  },
  methods: {
    dateFilter(value) {
      return moment(String(value)).format('DD/MM/YYYY');
    },
    show() {
      this.$refs['single-client-order-modal'].show();
    },
    hide() {
      this.$refs['single-client-order-modal'].hide();
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
          designer: this.singleClientOrder.designer,
          d_percent: this.singleClientOrder.d_percent,
          comment: this.singleClientOrder.comment,
        };
        this.$store.dispatch('SAVE_CLIENT_ORDER', requestData);
      }
      this.hide();
    },
    cancelSaveClientOrder() {
      this.resetAllState();
      this.hide();
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
  },
};
</script>
