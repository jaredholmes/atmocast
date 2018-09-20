import Vue from 'vue';
import VueRouter from 'vue-router';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import '../stylesheets/styles.sass';
import IndexPage from '../components/IndexPage.vue';

const routes = [
  { path: '/weather', component: IndexPage }
];

const router = new VueRouter({
  mode: 'history',
  routes,
})

Vue.use(VueRouter);

Vue.mixin ({
  methods: {
    $momentUnixHour(unix, index) {
      if (index === 0) {
        return 'Now';
      } else {
        return moment(moment.unix(unix)._d).format('HH:mm');
      }
    },
    $fToC(f) {
      return (f - 32) * 5/9;
    },
  }
})

new Vue({
  el: '#app',
  router,
}).$mount('#app');
