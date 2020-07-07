<template>
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="/">Home</b-navbar-brand>

        <!-- <b-navbar-toggle target="nav-collapse"></b-navbar-toggle> -->

        <b-navbar-nav>
            <b-nav-item
                v-if="role != 0"
                @click="goDemoProject"
            >Demo Project</b-nav-item>
            <b-nav-item>
                Contacts
            </b-nav-item>
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
    },
  },
  computed: {
    role() {
      return this.$store.getters.GET_AUTHOR;
    },
  },
};
</script>
