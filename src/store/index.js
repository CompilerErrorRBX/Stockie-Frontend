import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const Store = new Vuex.Store({
  state: {
    article: null,
    articles: [],
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
    setArticle(state, article) {
      state.article = article;
    },
    setArticles(state, articles) {
      state.articles = articles;
    },
  },
  actions: {
    fetchArticle: (state, articleId) => {
      axios.get(`http://localhost:3000/article/${articleId}`)
        .then((response) => {
          state.commit('setArticle', response.data);
        });
    },
    fetchArticles: (state, props) => {
      axios.get(`http://localhost:3000/articles?limit=${props.limit}&offset=${props.offset}`)
        .then((response) => {
          state.commit('setArticles', response.data);
        });
    },
  },
});

export default Store;
