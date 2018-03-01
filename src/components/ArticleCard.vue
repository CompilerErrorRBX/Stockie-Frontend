<template>
  <v-card hover transition="slide-y-transition">
    <v-card-media :src="article.thumbnail" height="200px" v-if="article.thumbnail" />
    <v-card-title primary-title>
      <div>
        <div class="headline">{{ article.title }}</div>
        <span class="grey--text"> {{ article.author }} </span>
      </div>
    </v-card-title>
    <v-card-text>
      {{ article.description }}
    </v-card-text>
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
</template>

<script>
export default {
  name: 'ArticleCard',
  props: {
    article: Object,
  },
};
</script>

<style scoped>

</style>
