<template>
    <b-modal
    id="client-modal"
    ref="client-modal"
    hide-footer
    title=""
    size='lg'>
        <b-form>
        <b-container fluid>
                <b-row align-h="center">
                    <b-form-group
                    label="Заказчик"
                    label-class="font-weight-bold pt-0"
                    label-size="lg"></b-form-group>
                </b-row>
                <b-form-group
                    id="form-birthday-group"
                    label="ФИО:"
                    label-for="form-birthday-input"
                >
                <b-row v-if="ifClientExist" align-h="start">
                        <b-col cols="3"><h5>{{singleClient.last_name}}</h5></b-col>
                        <b-col cols="3"><h5>{{singleClient.first_name}}</h5></b-col>
                        <b-col cols="3"><h5>{{singleClient.middle_name}}</h5></b-col>
                </b-row>
                <b-row v-else align-h="start">
                    <b-col>
                        <label class="sr-only"
                        for="inline-form-input-last-name">Фамилия</label>
                        <b-input
                        id="inline-form-input-last-name"
                        class="md-2 mr-sm-2 mb-sm-0"
                        placeholder="Фамилия"
                        v-model="singleClient.last_name"></b-input>
                    </b-col>
                    <b-col>
                        <label class="sr-only"
                        for="inline-form-input-first-name">Имя</label>
                        <b-input
                        id="inline-form-input-first-name"
                        class="md-2 mr-sm-2 mb-sm-0"
                        placeholder="Имя"
                        v-model="singleClient.first_name"></b-input>
                    </b-col>
                    <b-col>
                        <label class="sr-only"
                        for="inline-form-input-middle-name">Отчество</label>
                        <b-input
                        id="inline-form-input-middle-name"
                        class="md-2 mr-sm-2 mb-sm-0"
                        placeholder="Отчество"
                        v-model="singleClient.middle_name"></b-input>
                    </b-col>
                </b-row>
                </b-form-group>
                <b-form-group
                    id="form-birthday-group"
                    label="День рождения:"
                    label-for="form-birthday-input"
                    class="mt-3"
                >
                    <b-row v-if="ifClientExist">
                        <b-col cols="3"><h6>{{singleClient.birth_date}}</h6></b-col>
                    </b-row>
                    <b-row v-else>
                        <b-col cols="3">
                            <b-form-input type='date'
                            v-model="singleClient.birth_date"></b-form-input>
                        </b-col>
                    </b-row>
                </b-form-group>
                <b-form-group
                    id="form-passport-group"
                    label="Паспорт"
                    label-for="form-passport-input"
                >
                    <b-row align-h="around">
                        <b-col cols="2">
                            <b-input placeholder="Серия"
                            v-model="separateClientDetails.passportSeries"></b-input>
                        </b-col>
                        <b-col cols="3">
                            <b-input placeholder="Номер"
                            v-model="separateClientDetails.passportNumber"></b-input>
                        </b-col>
                        <b-col>
                            <b-input placeholder="Кем выдан"
                            v-model="separateClientDetails.passportGiven"></b-input>
                        </b-col>
                    </b-row>
                </b-form-group>
                <b-form-group
                    id="form-contact-group"
                    label="Контактные данные"
                    label-for="form-contact-input"
                >
                    <b-row align-h="start">
                        <b-col cols="4">
                            <b-input placeholder="Телефон"
                            v-model="singleClient.phone"></b-input>
                        </b-col>
                        <b-col cols="6">
                            <b-input placeholder="Email"
                            v-model="singleClient.email"></b-input>
                        </b-col>
                    </b-row>
                </b-form-group>
                <b-card bg-variant="light" class="mt-5">
                    <b-form-group
                        label-cols-lg="3"
                        label="Адрес"
                        label-size="lg"
                        label-class="font-weight-bold pt-0"
                        class="md-0"
                    >
                        <b-form-group
                            label-cols-sm="3"
                            label="Страна:"
                            label-align-sm="right"
                            label-for="country"
                        >
                            <b-form-input id="country"
                            v-model="separateClientDetails.addressCountry"></b-form-input>
                        </b-form-group>
                        <b-form-group
                            label-cols-sm="3"
                            label="Область:"
                            label-align-sm="right"
                            label-for="area"
                        >
                            <b-form-input id="area"
                            v-model="separateClientDetails.addressArea"></b-form-input>
                        </b-form-group>
                        <b-form-group
                            label-cols-sm="3"
                            label="Город:"
                            label-align-sm="right"
                            label-for="city"
                        >
                            <b-form-input id="city"
                            v-model="separateClientDetails.addressCity"></b-form-input>
                        </b-form-group>
                        <b-form-group
                            label-cols-sm="3"
                            label="Улица:"
                            label-align-sm="right"
                            label-for="street"
                        >
                            <b-form-input id="street"
                            v-model="separateClientDetails.addressStreet"></b-form-input>
                        </b-form-group>
                    </b-form-group>
                </b-card>
                <b-row align-h="end">
                    <b-col cols="2">
                        <b-button
                        variant="danger" class="mt-5">Отмена</b-button>
                    </b-col>
                    <b-col cols="2">
                        <b-button
                        @click="saveClient"
                        variant="primary" class="mt-5">Сохранить</b-button>
                    </b-col>
                </b-row>
        </b-container>
        </b-form>
    </b-modal>
</template>

<script>
export default {
  name: 'clientModal',
  data() {
    return {
    };
  },
  methods: {
    show() {
      this.$refs['client-modal'].show();
    },
    splitString(value) {
      return value.split('&');
    },
    resetForm() {
      this.Client.first_name = '';
      this.Client.middle_name = '';
      this.Client.last_name = '';
      this.Client.birth_date = '';
      this.Client.phone = '';
      this.Client.email = '';
      this.Client.pass_series = '';
      this.Client.pass_number = '';
      this.Client.pass_given = '';
      this.Client.addr_country = '';
      this.Client.addr_area = '';
      this.Client.addr_city = '';
      this.Client.addr_street = '';
    },
    resetModal() {
      this.$refs.addClientModal.hide();
      this.resetForm();
    },
    saveClient() {
      if (this.singleClient.id === null) {
        const requestData = {
          first_name: this.singleClient.first_name,
          middle_name: this.singleClient.middle_name,
          last_name: this.singleClient.last_name,
          birth_date: this.singleClient.birth_date,
          phone: this.singleClient.phone,
          email: this.singleClient.email,
          passport:
            `${this.separateClientDetails.passportSeries}&${this.separateClientDetails.passportNumber}&${this.separateClientDetails.passportGiven}`,
          address:
            `${this.separateClientDetails.addressCountry}&${this.separateClientDetails.addressArea}&${this.separateClientDetails.addressCity}&${this.separateClientDetails.addressStreet}`,
        };
        this.$store.dispatch('SAVE_CLIENT', requestData);
      } else {
        const requestData = {
          id: this.singleClient.id,
          first_name: this.singleClient.first_name,
          middle_name: this.singleClient.middle_name,
          last_name: this.singleClient.last_name,
          birth_date: this.singleClient.birth_date,
          phone: this.singleClient.phone,
          email: this.singleClient.email,
          passport:
            `${this.separateClientDetails.passportSeries}&${this.separateClientDetails.passportNumber}&${this.separateClientDetails.passportGiven}`,
          address:
            `${this.separateClientDetails.addressCountry}&${this.separateClientDetails.addressArea}&${this.separateClientDetails.addressCity}&${this.separateClientDetails.addressStreet}`,
        };
        this.$store.dispatch('SAVE_CLIENT', requestData);
      }
      this.$refs['client-modal'].hide();
    },
  },
  computed: {
    singleClient() {
      return this.$store.getters.GET_SINGLE_CLIENT;
    },
    ifClientExist() {
      return this.$store.getters.GET_IF_CLIENT_EXIST;
    },
    separateClientDetails() {
      return this.$store.getters.GET_SEPARATE_CLIENT_DETAILS;
    },
  },
};
</script>
