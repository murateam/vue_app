<template>
    <b-navbar toggleable="lg" type="dark" variant="dark">

        <b-navbar-nav>
          <b-nav-item href="/">Home</b-nav-item>
          <b-nav-item>
            <b-button
              v-if="currentStep != '/'"
              @click="back"
              size="sm"
              variant="outline-primary"
            >
              <b-icon
              aria-hidden="true"
              icon="caret-left"></b-icon>
            </b-button>
          </b-nav-item>
            <b-nav-item
              @click="aboutProject"
            >
              About project
            </b-nav-item>
            <b-nav-item
              v-if="currentStep != '/mainDemoProject'"
              @click="toDemoProject"
            >Project</b-nav-item>

            <b-nav-item-dropdown text="Git project" right>
              <b-dropdown-item href="https://github.com/murateam/vue_app">Vuejs (Frontend)</b-dropdown-item>
              <b-dropdown-item href="https://github.com/murateam/python_api_app_01">Django (Backend)</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item
              @click="contact"
            >
              Contact
            </b-nav-item>
        </b-navbar-nav>
    </b-navbar>
</template>

<script>
import _ from 'lodash';

export default {
  methods: {
    aboutProject() {
      this.$router.push('/aboutProject');
      this.$store.dispatch('SET_CURRENT_STEP', '/aboutProject');
    },
    contact() {
      this.$router.push('/contact');
      this.$store.dispatch('SET_CURRENT_STEP', '/contact');
    },
    toDemoProject() {
      this.$store.dispatch('SET_AUTHOR', 'anonymous');
      this.$router.push('/mainDemoProject');
      this.$store.dispatch('SET_CURRENT_STEP', '/mainDemoProject');
    },
    async back() {
      const back = await _.clone(this.backStep);
      if (back === '/stockList' && this.getIsListItemsExpUseInImportOrder === true) {
        this.$store.dispatch('SET_IS_LIST_USED_IN_IMPORT_ORDER', false);
      }
      this.$router.push(back);
      this.$store.dispatch('SET_CURRENT_STEP', back);
    },
  },
  computed: {
    role() {
      // it's supposed that here will be used different roles for each user
      // with different access levels
      return this.$store.getters.GET_AUTHOR;
    },
    currentStep() {
      // current URL
      return this.$store.getters.GET_CURRENT_STEP;
    },
    backStep() {
      // get URL for go back if we need
      return this.$store.getters.GET_BACK_STEP;
    },
    getIsListItemsExpUseInImportOrder() {
      // navbar need to hide if listStockItemsExp use in importOrder
      return this.$store.getters.GET_IS_LIST_USED_IN_IMPORT_ORDER;
    },
  },
};
</script>
