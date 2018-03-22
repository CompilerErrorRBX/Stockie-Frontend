import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const Store = new Vuex.Store({
  state: {
    article: null,
    articles: [],
    similar_articles: [],
    search_results: [],
    dark_theme: false,
    page_name: 'Home',
    theme: {
      primary_color: 'blue',
      secondary_color: 'amber',
      primary_text_color: 'grey--text text--darken-3',
      secondary_text_color: 'grey--text text--darken-2',
    },
  },
  mutations: {
    setTheme(state, theme) {
      state.theme = Object.assign(state.theme, theme);
    },
    setPageName(state, name) {
      state.page_name = name;
    },
    setDarktheme(state, isDark) {
      state.dark_theme = isDark;
    },
    setArticle(state, article) {
      state.article = article;
    },
    setArticles(state, articles) {
      state.articles = articles;
    },
    setSimilarArticles(state, articles) {
      state.similar_articles = articles;
    },
    setSearchResults(state, articles) {
      state.search_results = articles;
    },
  },
  actions: {
    fetchArticle: (state, articleId) => {
      const request = axios.get(`/article/${articleId}`)
        .then((response) => {
          state.commit('setArticle', response.data);
        });
      return request;
    },
    fetchArticles: (state, props) => {
      const limit = props.limit ? props.limit : 10;
      const offset = props.offset ? props.offset : 0;
      const request = axios.get(`/articles?limit=${limit}&offset=${offset}`)
        .then((response) => {
          const articles = props.appendArticles ?
            state.state.articles.concat(response.data) : response.data;
          state.commit('setArticles', articles);
        });

      return request;
    },
    fetchSimilarArticles: (state, props) => {
      const limit = props.limit ? props.limit : 10;
      const offset = props.offset ? props.offset : 0;
      const request = axios.get(`/article/${props.article_id}/similar?limit=${limit}&offset=${offset}`)
        .then((response) => {
          state.commit('setSimilarArticles', response.data);
        });

      return request;
    },
    fetchArticlesBySearch: (state, props) => {
      const limit = props.limit ? props.limit : 10;
      const offset = props.offset ? props.offset : 0;
      const request = axios.get(`/articles/search?query=${props.query}&limit=${limit}&offset=${offset}`)
        .then((response) => {
          state.commit('setSearchResults', response.data);
        });

      return request;
    },
  },
});

export default Store;
