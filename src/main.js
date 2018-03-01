import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import { VueMasonryPlugin } from 'vue-masonry';

import App from './App';
import router from './router';
import store from './store';


Vue.use(Vuetify);
Vue.use(VueMasonryPlugin);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
