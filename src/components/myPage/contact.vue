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
      <b-row class="mt-5">
        <b-col>amurashko24@gmail.com</b-col>
      </b-row>
      <b-row>
        <b-col>
          Linkedin:<a href="https://www.linkedin.com/in/andrei-murashko-997905115/">
          https://www.linkedin.com/in/andrei-murashko-997905115</a>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          Facebook: <a href="https://www.facebook.com/andrey.murashko.520">
          https://www.facebook.com/andrey.murashko.520</a>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          Telegram username: @mudrei
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col>
          <a href="https://ru.vuejs.org/v2/cookbook/editable-svg-icons.html">Tutorial</a>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <a href="https://github.com/sdras/vue-sample-svg-icons/tree/master/src/components">ICONS</a>
        </b-col>
      </b-row>
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
