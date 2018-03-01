<template>
  <v-layout row pb-2 v-if="article">
    <v-flex xs12 md10 offset-md1>
      <v-card>
        <v-toolbar
          card
          prominent
        >
          <v-btn icon @click="$router.go(-1)">
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <v-toolbar-title>{{ article.section }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-media :src="article.thumbnail" contain v-if="article.thumbnail">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <div class="headline">{{ article.title }}</div>
            <div class="grey--text">{{ article.date_published | moment }}</div>
            <v-chip>
              <v-avatar class="primary">
                <img :src="article.author_image" v-if="article.author_image">
                <span class="white--text headline" v-if="!article.author_image">
                  {{ article.author[0] }}
                </span>
              </v-avatar>
              {{ article.author }}
            </v-chip>
          </div>
        </v-card-title>
        <v-card-text v-html="article.body" />
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';

export default {
  name: 'Article',
  computed: mapState([
    'article',
  ]),
  data() {
    return {
      share: false,
    };
  },
  filters: {
    moment: date => (moment(date).format('MMM D, YYYY, h:mm a')),
  },
  mounted() {
    this.$store.dispatch('fetchArticle', this.article_id);
  },
  props: {
    article_id: String,
  },
};
</script>

<style lang="scss">
  a.icon, a.icon.none {
    line-height: unset;
    font-size: 1rem;
    color: unset;
  }

  #related-articles,
  .external-content-inset,
  .related_topics {
    display: none;
  }

  .embedded.youtube {
    height: 600px;
    &.youtube-embed {
      height: 100%;
    }
  }

  .card__media__background {
    position: relative;
    display: block;
    width: 100%;
    padding-top: 56.3%;
  }

  .article-image, table {
    width: 100%;
  }

  .article-figure {
    margin: 24px 0;
  }
</style>
