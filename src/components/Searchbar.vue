<template>
  <div class="v-searchbar">
    <v-text-field
      class="v-searchbar-input"
      clearable
      flat
      solo-inverted
      prepend-icon="search"
      label="Search"
      v-model="value"
    />
    <v-list v-show="search_results.length" light class="v-searchbar-results elevation-6" dense>
      <v-progress-linear
        v-show="loading"
        class="v-searchbar-progress"
        :indeterminate="true"
        height="4"
        color="warning" />
      <template v-for="result in search_results">
        <v-list-tile
          :key="result.id"
          @mousedown.prevent="$router.push({ path: `/Article/${result.id}` });"
          @click.prevent
        >
          <v-list-tile-content>
            <v-list-tile-title v-html="result.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Searchbar',
  data: () => ({
    loading: false,
    value: this.query,
  }),
  computed: mapState([
    'search_results',
  ]),
  props: {
    query: {
      type: String,
      default: '',
    },
  },
  methods: {
    getSearchResults() {
      this.$store.dispatch('fetchArticlesBySearch', { query: this.value, limit: 5, offset: 0 });
    },
  },
  watch: {
    value(newVal) {
      this.getSearchResults(newVal);
    },
  },
};
</script>

<style lang="scss" scoped>
  .v-searchbar {
    position: relative;
    display: flex;
    flex: 1 1 auto;

    .v-searchbar-input {
      color: rgba(0,0,0,.25);
    }

    .v-searchbar-progress {
      top: 0;
      margin: 0;
      position: absolute;
    }

    .input-group--focused + .v-searchbar-results {
      display: block;
    }

    .v-searchbar-results {
      display: none;
      position: absolute;
      width: 100%;
      top: 100%;
      background-color: #fff;
      border-radius: 0 0 2px 2px;
    }
  }
</style>
