<template>
  <v-layout row pb-2 v-if="article">
    <v-flex xs12 md10 offset-md1>
      <v-card>
        <v-card-media :src="article.thumbnail" height="600px" v-if="article.thumbnail">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <div class="headline">{{ article.title }}</div>
            <span class="grey--text"> {{ article.author }} </span>
          </div>
        </v-card-title>
        <v-card-text v-html="article.body" />
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Article',
  computed: mapState([
    'article',
  ]),
  data() {
    return {

    };
  },
  mounted() {
    this.$store.dispatch('fetchArticle', this.article_id);
  },
  props: {
    article_id: String,
  },
};
</script>

<style scoped>

</style>
