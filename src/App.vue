<template>
  <v-app>
    <v-navigation-drawer
      app
      :clipped="$vuetify.breakpoint.mdAndUp"
      fixed
      v-model="drawer"
      class="elevation-1"
    >
      <v-list>
        <v-list-tile
          v-for="page in pages"
          :key="page.title"
          :to="page.route"
          active-class="default-class"
        >
          <v-list-tile-action>
            <v-icon>{{ page.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ page.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider />
        <v-subheader>Data Extraction</v-subheader>
        <v-list-tile :disabled="updatingArticles" @click="extractArticles">
          <v-list-tile-action v-if="!updatingArticles">
            <v-icon>refresh</v-icon>
          </v-list-tile-action>
          <v-list-tile-action v-if="updatingArticles">
            <v-progress-circular
              :size="25"
              indeterminate
              :color="theme.primary_color"
            />
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Update Articles</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider />
        <v-list-tile
          v-for="option in options"
          :key="option.title"
          :to="option.route"
          active-class="default-class"
        >
          <v-list-tile-action>
            <v-icon>{{ option.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ option.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      fixed
      :color="theme.primary_color"
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      dark
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer" />
        <span class="hidden-sm-and-down">{{ page_name }}</span>
      </v-toolbar-title>
      <Searchbar />
      <div class="v-navbar-spacer">
        <v-spacer />
        <v-btn icon>
          <v-icon>person</v-icon>
        </v-btn>
      </div>
    </v-toolbar>
    <v-content>
      <v-container fluid style="height: unset; min-height: 100vh">
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
import Searchbar from './components/Searchbar';

export default {
  name: 'App',
  computed: mapState([
    'theme',
    'page_name',
  ]),
  components: { Searchbar },
  data: () => ({
    updatingArticles: false,
    drawer: null,
    pages: [
      { icon: 'dashboard', title: 'Articles', route: '/' },
    ],
    options: [
      { icon: 'settings', title: 'Settings', route: '/Settings' },
      { icon: 'feedback', title: 'Send Feedback', route: '/Feedback' },
      { icon: 'help', title: 'Help', route: '/help' },
    ],
  }),
  props: {
  },
  methods: {
    extractArticles() {
      this.updatingArticles = true;
      axios.get('http://localhost:3000/articles/extract')
        .then(() => {
          this.$store.dispatch('fetchArticles', { limit: this.limit, offset: this.offset });
          this.updatingArticles = false;
        });
    },
  },
};
</script>

<style lang="scss">
  html, body {
    margin: 0;
    height: 100vh;
  }

  #app {
    main .container {
      height: 660px;
    }

    .navigation-drawer__border {
      display: none;
    }

    .list__tile--active .list__tile__action,
    .list__tile--active .list__tile__action .icon {
      color: inherit;
    }
  }

  .v-navbar-spacer {
    display: flex;
    flex: 1 0 auto;
    max-width: 300px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: transform .15s cubic-bezier(1.0, 0.5, 0.8, 1.0), opacity .15s;
  }

  .fade-enter-active {
    transition-delay: .25s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
    transform: translateX(-15%);
  }
</style>
