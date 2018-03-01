import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import Dashboard from '@/pages/Dashboard';
import Article from '@/pages/Article';

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
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: (to, origin, next) => {
        store.commit('setTheme', { primary_color: 'teal' });
        store.commit('setPageName', 'Dashboard');
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
  ],
});
