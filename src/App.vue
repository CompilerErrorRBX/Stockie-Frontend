<template>
  <v-app dark>
    <v-navigation-drawer
      app
      :clipped="$vuetify.breakpoint.mdAndUp"
      fixed
      v-model="drawer"
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
      <v-text-field
        flat
        solo-inverted
        prepend-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>person</v-icon>
      </v-btn>
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

export default {
  name: 'App',
  computed: mapState([
    'theme',
    'page_name',
  ]),
  data: () => ({
    drawer: null,
    pages: [
      { icon: 'home', title: 'Home', route: '/' },
      { icon: 'dashboard', title: 'Articles', route: '/Articles' },
    ],
    options: [
      { icon: 'settings', title: 'Settings', route: '/Settings' },
      { icon: 'feedback', title: 'Send Feedback', route: '/Feedback' },
      { icon: 'help', title: 'Help', route: '/help' },
    ],
  }),
  props: {
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
