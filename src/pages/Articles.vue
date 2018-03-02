<template>
  <div v-scroll="onScroll">
    <v-container style="height: unset; min-height: 100vh">
      <div class="grid">
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
  mounted() {
    this.$store.dispatch('fetchArticles', { limit: this.limit, offset: this.offset })
      .then(() => {
        this.resizeAllGridItems();
      });
    this.offset += this.limit;

    window.addEventListener('resize', () => { this.resizeAllGridItems(); });

    this.resizeAllGridItems();
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
            this.resizeAllGridItems();
          });
      }
    },
    resizeGridItem(item) {
      const article = item;
      const grid = document.getElementsByClassName('grid')[0];
      const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'), 10);
      const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'), 10);
      const rowSpan = Math.ceil((article.querySelector('.card').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));

      article.style.gridRowEnd = `span ${rowSpan}`;
    },
    resizeAllGridItems() {
      const allItems = document.getElementsByClassName('article-card');
      for (let x = 0; x < allItems.length; x += 1) {
        this.resizeGridItem(allItems[x]);
      }
    },
  },
  // watch: {
  //   articles: {
  //     handler() {
  //       this.resizeAllGridItems();
  //     },
  //     deep: true,
  //   },
  // },
  computed: mapState([
    'articles',
  ]),
};
</script>

<style scoped>
  .grid {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(320px,1fr));
    grid-auto-rows: 20px;
  }

  .article-card {
    display: inline-block;
    width: 100%;
  }
</style>
