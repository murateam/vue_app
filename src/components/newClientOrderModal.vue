<template>
    <b-modal
        id="client-order-modal"
        ref="client-order-modal"
        hide-footer
        title="Заказ"
        size="lg"
    >
            <b-container>
                <template>
                  <form>
                    <label for="input-with-list">Заказчик</label>
                    <b-row align-h="between">
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
                          v-model="clientCheck.name"></b-input>
                      </b-col>
                      <b-col cols="3">
                        <!-- <b-button
                        variant="primary">Внести нового</b-button> -->
                      </b-col>
                    </b-row>
                    <div>{{ Client }}</div>
                    <div>{{ clientOrder }}</div>
                    <b-collapse
                    ref="client-details"
                    id="client-details"
                    :visible="boolRightClient">
                      <b-card class="mt-3">
                        <b-row class="mb-2">
                          <b-col sm="3" class ="text-sm-right"><b>Клиент:</b></b-col>
                          <b-col>
                            {{ Client.last_name }}
                            {{ Client.first_name }}
                            {{ Client.middle_name }}
                          </b-col>
                        </b-row>
                        <b-row class="mb-2">
                          <b-col sm=3 class="text-sm-right"><b>Дата рождения:</b></b-col>
                          <b-col>{{ Client.birth_date }}
                          </b-col>
                        </b-row>
                        <b-row class=mb-2>
                          <b-col sm="3" class = "text-sm-right">
                            <b>Паспорт: </b>
                          </b-col>
                          <b-col>{{Client.passport}}</b-col>
                        </b-row>
                        <b-row class=mb-2>
                          <b-col sm="3" class = "text-sm-right">
                          </b-col>
                          <b-col></b-col>
                          <b-col><b>Телефон: </b></b-col>
                          <b-col>{{Client.phone}}</b-col>
                        </b-row>
                        <b-row class=mb-2>
                          <b-col sm="3" class = "text-sm-right">
                          </b-col>
                          <b-col></b-col>
                          <b-col><b>Email: </b></b-col>
                          <b-col>{{Client.email}}</b-col>
                        </b-row>
                        <b-row class=mb-2>
                          <b-col sm="3" class = "text-sm-right">
                            <b>Адресс: </b>
                          </b-col>
                          <b-col>{{Client.adress}}</b-col>
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
                          v-model=clientOrder.designer
                      >
                      </b-form-input>
                    </b-col>
                    <b-col>
                      <b-form-input
                          placeholder="Вознаграждение"
                          type=number
                          v-model=clientOrder.d_percent
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
                        v-model=clientOrder.comment
                        ></b-form-input>
                </b-form-group>
                <b-card class="mt-5"
                bg-variant="light">
                    <b-form-group
                        label="Позиции:"
                        label-class="font-weight-bold pt-0">
                        <b-row align-h="start">
                            <b-col>
                                <b-button>Добавить позицию</b-button>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-table class="mt-3"
                            :items="factoryItems"
                            :fields="fieldsForClientOrder"></b-table>
                        </b-row>
                    </b-form-group>
                </b-card>
                <b-row align-h="end">
                  <b-col cols="2">
                    <b-button
                    @click="resetOrderForm"
                    variant="danger"
                    class="mt-5">Сбросить</b-button>
                  </b-col>
                  <b-col cols="2">
                    <b-button
                    @click="addOrder"
                    variant="primary"
                    class="mt-5">Сохранить</b-button>
                  </b-col>
                </b-row>
            </b-container>
    </b-modal>
</template>

<script>

export default {
  data() {
    return {
      // clientCollapseVisible: false,
      // Client: {},
      clientCheck: { name: '' },
      fieldsForClientOrder: [
        {
          key: 'factory',
        },
        {
          key: 'collection',
        },
        {
          key: 'catalog',
        },
        {
          key: 'amount',
        },
        {
          key: 'price',
        },
        {
          key: 'total price',
        },
      ],
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
    };
  },
  methods: {
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
    addOrder() {
      const requestData = {
        author: this.clientOrder.author,
        client: this.Client.id,
        designer: this.clientOrder.designer,
        d_percent: this.clientOrder.d_percent,
        comment: this.clientOrder.comment,
      };
      this.$store.dispatch('ADD_CLIENT_ORDER', requestData);
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
    Client() {
      return this.$store.getters.GET_CURRENT_CLIENT;
    },
    boolRightClient() {
      return this.$store.getters.GET_BOOL_CLIENT;
    },
  },
};
</script>
