import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import Dashboard from '@/pages/Articles';
import Article from '@/pages/Article';
import Search from '@/pages/Search';

import store from '../store';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: (to, origin, next) => {
        store.commit('setTheme', { primary_color: 'blue' });
        store.commit('setPageName', 'Home');
        next();
      },
    },
    {
      path: '/Articles',
      name: 'Articles',
      component: Dashboard,
      beforeEnter: (to, origin, next) => {
        store.commit('setTheme', { primary_color: 'teal' });
        store.commit('setPageName', 'Articles');
        store.commit('setArticles', []);
        next();
      },
    },
    {
      path: '/Article/:article_id',
      name: 'Article',
      component: Article,
      props: true,
      beforeEnter: (to, origin, next) => {
        store.commit('setTheme', { primary_color: 'red' });
        store.commit('setPageName', 'Article');
        next();
      },
    },
    {
      path: '/Articles/Search/:query',
      name: 'Search',
      component: Search,
      props: true,
      beforeEnter: (to, origin, next) => {
        store.commit('setTheme', { primary_color: 'blue-grey' });
        store.commit('setPageName', 'Search');
        next();
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});
