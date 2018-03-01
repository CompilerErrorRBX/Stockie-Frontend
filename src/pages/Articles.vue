<template>
  <div v-scroll="onScroll">
    <v-container style="height: unset; min-height: 100vh">
      <div class="masonry">
        <v-flex
          class="article-card"
          xs12
          v-for="article in articles"
          :key="article.id"
        >
          <ArticleCard :article="article" />
        </v-flex>
      </div>
    </v-container>
    <div class="text-xs-center" v-if="loading || !articles">
      <v-progress-circular indeterminate :size="50" color="primary"></v-progress-circular>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ArticleCard from '../components/ArticleCard';

export default {
  name: 'Dashboard',
  components: { ArticleCard },
  data() {
    return {
      loading: false,
      offset: 0,
      limit: 35,
    };
  },
  computed: mapState([
    'articles',
  ]),
  mounted() {
    this.$store.dispatch('fetchArticles', { limit: this.limit, offset: this.offset });
    this.offset += this.limit;
  },
  methods: {
    onScroll() {
      const scrollBottom =
        (window.pageYOffset || document.documentElement.scrollTop) + document.body.clientHeight;
      if (scrollBottom / document.body.scrollHeight > 0.98 && !this.loading) {
        this.loading = true;
        this.$store.commit('setTheme', { primary_color: 'grey' });
        this.$store.dispatch('fetchArticles', { limit: this.limit, offset: this.offset, appendArticles: true })
          .then(() => {
            this.$store.commit('setTheme', { primary_color: 'teal' });
            this.loading = false;
            this.offset += this.limit;
          });
      }
    },
  },
};
</script>

<style scoped>
  .masonry {
    column-count: 4;
    column-gap: 8px;
    transform: translateX(0);
  }

  .article-card {
    display: inline-block;
    margin: 0 0 8px;
    width: 100%;
  }

  @media only screen and (min-width: 400px) {
    .masonry {
      column-count: 1;
    }
  }

  @media only screen and (min-width: 700px) {
    .masonry {
      column-count: 2;
    }
  }

  @media only screen and (min-width: 900px) {
    .masonry {
      column-count: 3;
    }
  }

  @media only screen and (min-width: 1480px) {
    .masonry {
      column-count: 4;
    }
  }
</style>
