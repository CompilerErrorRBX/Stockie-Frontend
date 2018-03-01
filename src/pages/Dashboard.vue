<template>
  <div>
    <v-container>
      <div class="masonry">
        <v-flex
          class="article-card"
          xs12
          v-for="article in articles"
          :key="article.id"
        >
          <v-card hover>
            <v-card-media :src="article.thumbnail" height="200px" v-if="article.thumbnail" />
            <v-card-title primary-title>
              <div>
                <div class="headline">{{ article.title }}</div>
                <span class="grey--text"> {{ article.author }} </span>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat>Share</v-btn>
              <v-btn
                :to="`/Article/${article.id}`"
                flat
              >
                Explore
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Dashboard',
  data() {
    return {

    };
  },
  computed: mapState([
    'articles',
  ]),
  mounted() {
    this.$store.dispatch('fetchArticles', { limit: 30, offset: 0 });
  },
};
</script>

<style scoped>
  .masonry {
    column-count: 4;
    column-gap: 8px;
  }

  .article-card {
    display: inline-block;
    margin: 0 0 8px;
    width: 100%;
  }

  @media only screen and (min-width: 400px) {
    .masonry {
      -moz-column-count: 1;
      -webkit-column-count: 1;
      column-count: 1;
    }
  }

  @media only screen and (min-width: 700px) {
    .masonry {
      -moz-column-count: 2;
      -webkit-column-count: 2;
      column-count: 2;
    }
  }

  @media only screen and (min-width: 900px) {
    .masonry {
      -moz-column-count: 3;
      -webkit-column-count: 3;
      column-count: 3;
    }
  }

  @media only screen and (min-width: 1480px) {
    .masonry {
      -moz-column-count: 4;
      -webkit-column-count: 4;
      column-count: 4;
    }
  }
</style>
