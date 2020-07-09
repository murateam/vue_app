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
              v-if="depth > 0"
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
              v-if="depth != 0"
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
            <b-nav-item>{{ nav }}</b-nav-item>
            <b-nav-item>{{ depth }}</b-nav-item>
            <b-nav-item>{{cameFrom}}</b-nav-item>
            <b-nav-item>{{needMoveUp}}</b-nav-item>
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
      this.$store.dispatch('SET_CURRENT_NAV_CLASS', 'project');
      this.$store.dispatch('SET_CAME_FROM', '/');
      // this.$store.dispatch('DEPTH_RESET');
      this.$router.push('/mainDemoProject');
    },
    async back() {
      this.$router.push(this.cameFrom);
      // this.$router.push(this.whereIsGoUp());
      // this.$router.go(-1);
      // this.$store.dispatch('DEPTH_DECREASE');
    },
    whereIsGoForClientOrder() {
      let whereGo = '';
      if (this.cameFrom === 'mainDemoProject') {
        whereGo = '/';
      } else if (this.cameFrom === '/manageTab') {
        whereGo = 'mainDemoProject';
      } else if (this.cameFrom === '/singleClientOrder') {
        whereGo = '/manageTab';
      }
      return whereGo;
    },
  },
  computed: {
    role() {
      return this.$store.getters.GET_AUTHOR;
    },
    nav() {
      return this.$store.getters.GET_NAV;
    },
    depth() {
      return this.$store.getters.GET_DEPTH;
    },
    cameFrom() {
      return this.$store.getters.GET_CAME_FROM;
    },
    needMoveUp() {
      return this.$store.getters.GET_NEED_MOVE_UP;
    },
  },
};
</script>
