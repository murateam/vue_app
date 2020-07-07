<template>
  <div>
    <b-container>
      <b-row><b-col>
      <navbar>
      </navbar>
      </b-col></b-row>
      <b-container>
          <b-row class="mt-3">
              <b-col>
                  <h4>Page about me!!!</h4>
              </b-col>
          </b-row>
      </b-container>
    </b-container>
  </div>
</template>

<script>
import navbar from './navbar.vue';

export default {
  components: {
    navbar,
  },
};
</script>
