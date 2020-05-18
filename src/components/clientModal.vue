<template>
    <b-modal
    id="client-modal"
    ref="client-modal"
    hide-footer
    title="Заказчик"
    size='lg'>
        <b-form>
        <b-container fluid>
            <div>{{singleClient}}</div>
                <b-row align-h="center">
                    <b-form-group
                    label="ФИО"
                    label-class="font-weight-bold pt-0"></b-form-group>
                </b-row>
                <b-row align-h="center">
                    <b-col>
                        <label class="sr-only"
                        for="inline-form-input-last-name">Фамилия</label>
                        <b-input
                        id="inline-form-input-last-name"
                        class="md-2 mr-sm-2 mb-sm-0"
                        placeholder="Фамилия"
                        v-model="Client.last_name"></b-input>
                    </b-col>
                    <b-col>
                        <label class="sr-only"
                        for="inline-form-input-first-name">Имя</label>
                        <b-input
                        id="inline-form-input-first-name"
                        class="md-2 mr-sm-2 mb-sm-0"
                        placeholder="Имя"
                        v-model="Client.first_name"></b-input>
                    </b-col>
                    <b-col>
                        <label class="sr-only"
                        for="inline-form-input-middle-name">Отчество</label>
                        <b-input
                        id="inline-form-input-middle-name"
                        class="md-2 mr-sm-2 mb-sm-0"
                        placeholder="Отчество"
                        v-model="Client.middle_name"></b-input>
                    </b-col>
                </b-row>
                <b-form-group
                    id="form-birthday-group"
                    label="День рождения"
                    label-for="form-birthday-input"
                    class="mt-3"
                >
                    <b-row>
                        <b-col cols="3">
                            <b-form-input type='date'
                            v-model="Client.birth_date"></b-form-input>
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
                            v-model="Client.pass_series"></b-input>
                        </b-col>
                        <b-col cols="3">
                            <b-input placeholder="Номер"
                            v-model="Client.pass_number"></b-input>
                        </b-col>
                        <b-col>
                            <b-input placeholder="Кем выдан"
                            v-model="Client.pass_given"></b-input>
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
                            v-model="Client.phone"></b-input>
                        </b-col>
                        <b-col cols="6">
                            <b-input placeholder="Email"
                            v-model="Client.email"></b-input>
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
                            v-model="Client.addr_country"></b-form-input>
                        </b-form-group>
                        <b-form-group
                            label-cols-sm="3"
                            label="Область:"
                            label-align-sm="right"
                            label-for="area"
                        >
                            <b-form-input id="area"
                            v-model="Client.addr_area"></b-form-input>
                        </b-form-group>
                        <b-form-group
                            label-cols-sm="3"
                            label="Город:"
                            label-align-sm="right"
                            label-for="city"
                        >
                            <b-form-input id="city"
                            v-model="Client.addr_city"></b-form-input>
                        </b-form-group>
                        <b-form-group
                            label-cols-sm="3"
                            label="Улица:"
                            label-align-sm="right"
                            label-for="street"
                        >
                            <b-form-input id="street"
                            v-model="Client.addr_street"></b-form-input>
                        </b-form-group>
                    </b-form-group>
                </b-card>
                <b-row align-h="end">
                    <b-col cols="2">
                        <b-button
                        @click="resetModal"
                        type="reset" variant="danger" class="mt-5">Сброс</b-button>
                    </b-col>
                    <b-col cols="2">
                        <b-button
                        @click="addDataClient"
                        type="submit" variant="primary" class="mt-5">Сохранить</b-button>
                    </b-col>
                </b-row>
        </b-container>
        </b-form>
        <!-- <b-card class="mt-3" header="Test">
            <pre class="m-0">{{ Client }}</pre>
        </b-card> -->
    </b-modal>
</template>

<script>
// import axios from 'axios';

// const clientsURL = 'http://127.0.0.1:5000/api/clients/';

export default {
  name: 'clientModal',
  data() {
    return {
      Client: {
        first_name: '',
        middle_name: '',
        last_name: '',
        birth_date: '',
        phone: '',
        email: '',
        pass_series: '',
        pass_number: '',
        pass_given: '',
        addr_country: '',
        addr_area: '',
        addr_city: '',
        addr_street: '',
      },
    };
  },
  methods: {
    show() {
      this.$refs['client-modal'].show();
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
    addDataClient() {
      const requestData = {
        first_name: this.Client.first_name,
        middle_name: this.Client.middle_name,
        last_name: this.Client.last_name,
        birth_date: this.Client.birth_date,
        phone: this.Client.phone,
        email: this.Client.email,
        passport: `${this.Client.pass_series}&${this.Client.pass_number}&${this.Client.pass_given}`,
        adress: `${this.Client.addr_country}&${this.Client.addr_area}&${this.Client.addr_city}&${this.Client.addr_street}`,
      };
      console.info(requestData);
    //   axios.post(clientsURL, requestData).then(() => {
    //   });
    },
  },
  computed: {
    singleClient() {
      return this.$store.getters.GET_SINGLE_CLIENT;
    },
  },
};
</script>
