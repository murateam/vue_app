<template>
  <b-container>
      <b-row>
          <b-col>
              <navbar></navbar>
          </b-col>
      </b-row>
      <b-row class="mt-5">
          <b-col>
              <h5>You can contact with me by...</h5>
          </b-col>
      </b-row>
      <b-row class="mt-5" align-h="start">
        <b-col cols="3"></b-col>
        <b-col md="auto">Email:</b-col>
        <b-col md="auto">amurashko24@gmail.com</b-col>
      </b-row>
      <b-row align-h="start" class="mt-3">
        <b-col cols="3"></b-col>
        <b-col md="auto">
          LinkedIn:<a href="https://www.linkedin.com/in/andrei-murashko-997905115/" target="_blank">
          https://www.linkedin.com/in/andrei-murashko-997905115</a>
        </b-col>
      </b-row>
      <b-row align-h="start" class="mt-3">
        <b-col cols="3"></b-col>
        <b-col md="auto">
          Facebook: <a href="https://www.facebook.com/andrey.murashko.520" target="_blank">
          https://www.facebook.com/andrey.murashko.520</a>
        </b-col>
      </b-row>
      <b-row align-h="start" class="mt-3">
        <b-col cols="3"></b-col>
        <b-col md="auto">
          Telegram:
          <a href="https://t.me/mudrei" target="_blank">
            @mudrei
          </a>
        </b-col>
      </b-row>
      <!-- <b-row class="mt-3">
        <b-col>
          <a href="https://ru.vuejs.org/v2/cookbook/editable-svg-icons.html">Tutorial</a>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <a href="https://github.com/sdras/vue-sample-svg-icons/tree/master/src/components">ICONS</a>
        </b-col>
      </b-row> -->
  </b-container>
</template>

<script>
import navbar from './navbar.vue';

export default {
  components: {
    navbar,
  },
};
</script>
