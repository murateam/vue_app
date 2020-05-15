<template>
    <b-modal
        id="single-client-order-modal"
        ref="single-client-order-modal"
        hide-footer
        title=''
        size="lg"
    >
            <b-container>
              <b-row align-h="center">
                <b-col cols="6">
                  <h3>Заказ № {{singleClientOrder.public_num}}</h3>
                </b-col>
              </b-row>
              <b-row align-h="end">
                <b-col cols="4">
                  <p>Создан: {{dateFilter(singleClientOrder.created)}}</p>
                </b-col>
              </b-row>
                <template>
                  <form>
                    <b-row v-if="canChangeClient" align-h="end" class="mt-2">
                      <b-col cols="3">
                        <b-button>Другой заказчика</b-button>
                      </b-col>
                      <b-col cols="3">
                        <b-button>Редактировать</b-button>
                      </b-col>
                    </b-row>
                    <label for="input-with-list"></label>
                    <b-row :if="singleClientOrder.length == 0" align-h="between">
                      <b-col cols="3">
                        <b-button
                        @click="checkClient"
                        variant="success">Взять из базы</b-button>
                      </b-col>
                      <b-col cols="4">
                          <label class="sr-only"
                          for="inline-form-input-name"
                          >ФИО</label>
                          <b-input
                          id="inline-form-input-name"
                          class="md-2 mr-sm-2 mb-sm-0"
                          placeholder="Фамилия Имя Отчество"
                          v-model="checkClientName.name"></b-input>
                      </b-col>
                      <b-col cols="3">
                        <b-button
                        variant="primary">Внести нового</b-button>
                      </b-col>
                    </b-row>
                    <b-collapse
                    ref="client-details"
                    id="client-details"
                    v-model="visibilityClient">
                      <b-card class="mt-3">
                        <b-row class="mb-2">
                          <b-col sm="3" class ="text-sm-right"><b>Клиент:</b></b-col>
                          <b-col>
                            {{ singleClient.last_name }}
                            {{ singleClient.first_name }}
                            {{ singleClient.middle_name }}
                          </b-col>
                        </b-row>
                        <b-row class="mb-2">
                          <b-col sm=3 class="text-sm-right"><b>Дата рождения:</b></b-col>
                          <b-col>{{ singleClient.birth_date }}
                          </b-col>
                        </b-row>
                        <b-row class=mb-2>
                          <b-col sm="3" class = "text-sm-right">
                            <b>Паспорт: </b>
                          </b-col>
                          <b-col>{{ singleClient.passport}}</b-col>
                        </b-row>
                        <b-row class=mb-2>
                          <b-col sm="3" class = "text-sm-right">
                          </b-col>
                          <b-col></b-col>
                          <b-col><b>Телефон: </b></b-col>
                          <b-col>{{ singleClient.phone}}</b-col>
                        </b-row>
                        <b-row class=mb-2>
                          <b-col sm="3" class = "text-sm-right">
                          </b-col>
                          <b-col></b-col>
                          <b-col><b>Email: </b></b-col>
                          <b-col>{{ singleClient.email }}</b-col>
                        </b-row>
                        <b-row class=mb-2>
                          <b-col sm="3" class = "text-sm-right">
                            <b>Адресс: </b>
                          </b-col>
                          <b-col>{{ singleClient.adress}}</b-col>
                        </b-row>
                      </b-card>
                    </b-collapse>
                  </form>
                </template>
                <b-form-group
                    label="Дизайнер"
                    class="mt-5"
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
                <b-row align-h="end">
                  <b-col cols="2">
                    <b-button
                    variant="danger"
                    class="mt-5">Сбросить</b-button>
                  </b-col>
                  <b-col cols="2">
                    <b-button
                    variant="primary"
                    class="mt-5">Сохранить</b-button>
                  </b-col>
                </b-row>
                    <b-form-group
                        label="Позиции:"
                        label-class="font-weight-bold pt-0">
                    </b-form-group>
                <b-card class="mt-2"
                bg-variant="light">
                <b-row>
                  <stock-list />
                </b-row>
                </b-card>
            </b-container>
    </b-modal>
</template>

<script>
import moment from 'moment';
import stockList from './stockList.vue';

export default {
  components: {
    stockList,
  },
  data() {
    return {
      checkClientName: { name: '' },
      clientOrder: {
        public_num: '',
        state: '',
        status: '',
        payment_status: '',
        author: 1,
        client: '',
        when_published: '',
        created: '',
        updated: '',
        eur_rate: 0,
        price: '',
        total_payment: 0,
        designer: '',
        d_percent: 0,
        comment: '',
      },
      factoryItems: [],
      visibilityClient: true,
      canChangeClient: false,
      newClientOrder: false,
    };
  },
  methods: {
    dateFilter(value) {
      return moment(String(value)).format('DD/MM/YYYY');
    },
    show() {
      this.$refs['single-client-order-modal'].show();
    },
    resetOrderForm() {
      this.clientOrder.public_num = '';
      this.clientOrder.state = '';
      this.clientOrder.status = '';
      this.clientOrder.payment_status = '';
      this.clientOrder.author = 1;
      this.clientOrder.client = '';
      this.clientOrder.when_published = '';
      this.clientOrder.created = '';
      this.clientOrder.updated = '';
      this.clientOrder.eur_rate = 0;
      this.clientOrder.price = '';
      this.clientOrder.total_payment = 0;
      this.clientOrder.designer = '';
      this.clientOrder.d_percent = 0;
      this.clientOrder.comment = '';
      // this.Client = {};
      this.$store.dispatch('RESET_CLIENT');
      this.clientCheck.name = '';
      this.clientCollapseVisible = false;
      this.$refs['client-order-modal'].hide();
    },
    checkClient() {
      this.$store.dispatch('RESET_CURRENT_CLIENT');
      const requestData = this.clientCheck;
      this.$store.dispatch('CHECK_CLIENT', requestData);
      // this.clientCollapseVisible = true;
      // axios.post(clientCheckURL, requestData).then((response) => {
      //   this.Client = response.data;
      //   this.clientOrder.client = response.data.id;
      // }).then(() => { this.clientCollapseVisible = true; });
    },
    saveOrder() {
      const requestData = {
        author: this.clientOrder.author,
        client: this.Client.id,
        designer: this.clientOrder.designer,
        d_percent: this.clientOrder.d_percent,
        comment: this.clientOrder.comment,
      };
      this.$store.dispatch('ADD_ORDER', requestData);
      this.$refs['client-order-modal'].hide();
      this.resetOrderForm();
      // axios.post(clientOrderAddURL, requestData).then(() => {
      //   this.$refs['client-order-modal'].hide();
      //   this.resetOrederForm();
      //   this.$emit('getAllClient');
      // });
    },
  },
  computed: {
    // Client() {
    //   return this.$store.getters.GET_CURRENT_CLIENT;
    // },
    singleClientOrder() {
      return this.$store.getters.GET_SINGLE_CLIENT_ORDER;
    },
    singleClient() {
      return this.$store.getters.GET_SINGLE_CLIENT;
    },
  },
};
</script>
