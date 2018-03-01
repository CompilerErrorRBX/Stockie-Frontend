<template>
  <v-app
    class="grey lighten-4"
  >
    <v-navigation-drawer
      app
      class="grey lighten-4"
      clipped
      fixed
      v-model="drawer"
    >
      <v-list>
        <v-list-tile
          v-for="item in items"
          :key="item.title"
          :to="item.route"
          :class="theme.secondary_text_color"
          :active-class="theme.primary_text_color"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
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
      <v-btn icon href="#/Dashboard">
        <v-icon>dashboard</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid>
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
    items: [
      { icon: 'home', title: 'Home', route: '/' },
      { icon: 'dashboard', title: 'Dashboard', route: '/Dashboard' },
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
    background-color: #f5f5f5;
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
