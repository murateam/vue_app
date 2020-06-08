<template>
  <b-container>
    <b-row class="mt-3" align-h="start">
      <b-col cols="2">
        <router-link
        class="btn btn-dark"
        to="importTab">Назад</router-link>
      </b-col>
    </b-row>
    <b-row>
      <b-col>ImportOrder</b-col>
    </b-row>
    <b-row align-h="center" class="mt-4">
      <b-col cols="5">
        <h3 > Заказ № </h3>
        <h3 >Новый заказ</h3>
      </b-col>
    </b-row>
    <b-row align-h="end" >
      <b-col cols="4">
        <p>Создан: </p>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card>
          <label for="input-AB">AB</label>
          <b-input id="input-ab-num"
          placeholder="AB num"></b-input>
          <b-input class="mt-2" id="input-ab-file"
          placeholder="AB file"></b-input>
        </b-card>
      </b-col>
      <b-col>
        <b-card>
          <label for="input-VAITEK">VAITEK</label>
          <b-input id="input-VAITEK-order"
          placeholder="VAITEK order"></b-input>
          <b-input class="mt-2" id="input-VAITEK-payment"
          placeholder="VAITEK payment"></b-input>
        </b-card>
      </b-col>
      <b-col>
        <b-card>
          <label for="input-factory-docs">Фабрика</label>
          <b-input id="input-kw"
          placeholder="KW"></b-input>
          <b-input class="mt-2" id="input-trid"
          placeholder="TRID"></b-input>
          <b-input class="mt-2" id="input-ttn"
          placeholder="TTN"></b-input>
          <b-input class="mt-2" id="input-bill"
          placeholder="Bill"></b-input>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card class="mt-3">
          <label for="input-delivery">Доставка</label>
          <b-row>
            <b-col>
              <b-input id="input-amount-place"
              placeholder="Amount place"></b-input>
            </b-col>
            <b-col>
              <b-input id="input-volume"
              placeholder="Volume"></b-input>
            </b-col>
            <b-col>
              <b-input id="input-weight"
              placeholder="Weight"></b-input>
            </b-col>
            <b-col>
              <b-input id="input-container-num"
              placeholder="Container Num"></b-input>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
        <b-col cols="2" align-self="center">
          <b-button
          variant="danger">Отмена</b-button>
        </b-col>
        <b-col cols="2" align-self="center">
          <b-button
          variant="primary">Сохранить</b-button>
        </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'importOrder',
  methods: {
  },
};
</script>
