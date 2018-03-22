<template>
  <div>
    <v-subheader>
      About {{ search_results.length }} Results
      <v-spacer />
      <v-menu offset-y>
        <v-btn flat slot="activator">
          <span>{{ filter }}</span>
        </v-btn>
        <v-list>
          <v-list-tile v-for="filterName in filters" :key="filterName" @click="filter = filterName">
            <v-list-tile-title>{{ filterName }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn icon>
        <v-icon small>arrow_downward</v-icon>
      </v-btn>
    </v-subheader>
    <v-flex
      class="article-card"
      xs12
      v-for="article in search_results"
      :key="article.id"
      my-2
    >
      <v-card hover :to="`/Article/${article.id}`">
        <v-card-text>
          <div>
            <div class="title">{{ article.title }}</div>
            <div class="grey--text">
              {{ article.author }} - {{ article.date_published | moment }}
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';
import Carousel from '../components/Carousel';

export default {
  name: 'Article',
  components: { Carousel },
  computed: mapState([
    'search_results',
  ]),
  data() {
    return {
      filter: 'Relevance',
      filters: ['Relevance', 'Published'],
    };
  },
  filters: {
    moment: date => (moment(date).format('MMMM D, h:mm a')),
  },
  methods: {
    getArticles(query) {
      this.$store.dispatch('fetchArticlesBySearch', { query, limit: 5000, offset: 0 });
    },
  },
  mounted() {
    this.getArticles(this.query);
  },
  props: {
    query: String,
  },
  watch: {
    query(newVal) {
      this.getArticles(newVal);
    },
  },
};
</script>

<style lang="scss">

</style>
