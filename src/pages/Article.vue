<template>
  <v-layout row pb-2 v-if="article">
    <v-flex xs12 md10 offset-md1>
      <v-card>
        <v-card-title>
          <v-avatar size="38" class="primary mr-2">
            <img :src="article.author_image" v-if="article.author_image">
            <span class="white--text headline" v-if="!article.author_image">
              {{ article.author[0] }}
            </span>
          </v-avatar>
          <div class="title">{{ article.author }}</div>
          <v-icon small class="mx-1">chevron_right</v-icon>
          <div class="subheading">{{ article.section }}</div>
          <v-spacer></v-spacer>
          <div class="grey--text">{{ article.date_published | moment }}</div>
          <v-btn icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-media :src="article.thumbnail" contain v-if="article.thumbnail">
        </v-card-media>
        <v-card-title class="d-block">
          <div class="headline d-block">{{ article.title }}</div>
          <div class="subheading grey--text">{{ article.description }}</div>
        </v-card-title>
        <v-card-text>
          <div v-html="article.body" />
        </v-card-text>
      </v-card>
      <v-subheader>Similar Articles</v-subheader>
      <v-layout row>
        <v-flex
          class="article-card"

          v-for="similarArticle in similar_articles"
          :key="similarArticle.id"
        >
          <v-card
            class="mx-1"
            hover
            :to="`/Article/${similarArticle.id}`"
            @click.native="loadArticle(similarArticle.id)"
          >
            <v-card-title>
              <v-avatar size="32" class="primary mr-2" v-if="similarArticle.author_image">
                <img :src="similarArticle.author_image">
              </v-avatar>
              <div class="body-2">{{ similarArticle.author }}</div>
            </v-card-title>
            <v-card-text class="pt-0">
              <div>
                <div class="subheading line-clamp">{{ similarArticle.title }}</div>
                <div class="grey--text">{{ similarArticle.date_published | moment }}</div>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';
import ArticleCard from '../components/ArticleCard';

export default {
  name: 'Article',
  components: { ArticleCard },
  computed: mapState([
    'article',
    'similar_articles',
  ]),
  data() {
    return {
      share: false,
    };
  },
  filters: {
    moment: date => (moment(date).format('MMM D, h:mm a')),
  },
  mounted() {
    this.loadArticle(this.article_id);
  },
  methods: {
    loadArticle(articleId) {
      this.$store.dispatch('fetchArticle', articleId).then(() => {
        this.$store.commit('setPageName', this.article.section);
      });
      this.$store.dispatch('fetchSimilarArticles', { article_id: articleId, limit: 4, offset: 0 });
      this.$vuetify.goTo(0);
    },
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
  .line-clamp {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
</style>
