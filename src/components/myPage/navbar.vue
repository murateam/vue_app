<template>
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <!-- <b-navbar-brand
          href="/"
        >Home</b-navbar-brand> -->

        <!-- <b-navbar-toggle target="nav-collapse"></b-navbar-toggle> -->

        <b-navbar-nav>
          <b-nav-item href="/">Home</b-nav-item>
          <b-nav-item>
            <b-button
              @click="back"
              size="sm"
              variant="outline-primary"
            >
              <b-icon
              aria-hidden="true"
              icon="caret-left"></b-icon>
            </b-button>
          </b-nav-item>
            <b-nav-item>
              About project
            </b-nav-item>
            <b-nav-item
              @click="goDemoProject"
            >Project</b-nav-item>
            <!-- Git project, separately front and back -->
            <!-- <b-nav-item>Git project</b-nav-item> -->

            <b-nav-item-dropdown text="Git" right>
              <b-dropdown-item href="https://github.com/murateam/vue_app">Vuejs (Frontend)</b-dropdown-item>
              <b-dropdown-item href="https://github.com/murateam/python_api_app_01">Django (Backend)</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item>
                Contacts
            </b-nav-item>
            <b-nav-item>{{currentStep}}</b-nav-item>
        </b-navbar-nav>

        <!-- <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item href="/mainDemoProject">Demo Project</b-nav-item>
            </b-navbar-nav>
        </b-collapse> -->
    </b-navbar>
</template>

<script>
export default {
  methods: {
    goDemoProject() {
      this.$store.dispatch('SET_AUTHOR', 'anonymous');
      this.$router.push('/mainDemoProject');
      this.$store.dispatch('SET_CURRENT_STEP', '/mainDemoProject');
    },
    back() {
    },
  },
  computed: {
    role() {
      return this.$store.getters.GET_AUTHOR;
    },
    currentStep() {
      return this.$store.getters.GET_CURRENT_STEP;
    },
    backStep() {
      return this.$store.getters.GET_BACK_STEP;
    },
  },
};
</script>
