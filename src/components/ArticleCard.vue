<template>
  <v-card hover :key="article.id" :to="`/Article/${article.id}`">
    <v-card-title>
      <v-avatar size="32" class="primary mr-2" v-if="article.author_image">
        <img :src="article.author_image">
      </v-avatar>
      <div class="body-2">{{ article.author }}</div>
      <div v-if="article.section">
        <v-icon small class="ml-1">chevron_right</v-icon>
        <span class="caption">{{ article.section }}</span>
      </div>
      <v-spacer></v-spacer>
      <v-btn icon small>
        <v-icon small>more_vert</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-media :src="article.thumbnail" height="200px" v-if="article.thumbnail" />
    <v-card-title
      :class="{ 'pt-0': !article.thumbnail }"
      :primary-title="!article.thumbnail === null"
    >
      <div>
        <div class="title">{{ article.title }}</div>
        <div class="grey--text">{{ article.date_published | moment }}</div>
      </div>
    </v-card-title>
    <v-card-text v-if="article.description" class="pt-0">
      {{ article.description }}
    </v-card-text>
  </v-card>
</template>

<script>
import moment from 'moment';

export default {
  name: 'ArticleCard',
  filters: {
    moment: date => (moment(date).fromNow()),
  },
  props: {
    article: Object,
  },
};
</script>

<style scoped>

</style>
