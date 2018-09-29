import Vue from 'vue';
import VueRouter from 'vue-router';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/util';

import { store } from './store';
import '../stylesheets/styles.sass';
import IndexPage from '../components/IndexPage.vue';

// Router config
Vue.use(VueRouter);

const routes = [
  { path: '', component: IndexPage },
];

const router = new VueRouter({
  mode: 'history',
  routes,
})

Vue.mixin ({
  methods: {
    $hideNavbarSearchButton() {
      const searchBtn = document.getElementById('btn-navbar-search');
      const searchInput = document.getElementById('input-location-search');
      searchBtn.style.opacity = '0';
      searchBtn.style.visibility = 'hidden';
      if (window.innerWidth >= 992) {
        searchInput.style.left = '4.5em';
      }
    },
    $momentUnixHour(unix, index) {
      if (index === 0) {
        return 'Now';
      } else {
        return moment(moment.unix(unix)._d).format('HH:mm');
      }
    },
    $momentAddDays(days) {
      if (days <= 0) {
        return 'Today';
      } else if (days === 1) {
        return 'Tomorrow';
      } else {
        return moment().add(days, 'days').format('dddd');
      }
    },
    // Imperial to metric conversions
    $fToC(f) {
      return (f - 32) * 5/9;
    },
    $mToKm(m) {
      return m * 1.609344;
    },
    // Metric to imperial conversions
    $cToF(c) {
      return c * 9/5 + 32;
    },
    $kmToM(km) {
      return km / 1.609344;
    }
  }
})

new Vue({
  el: '#app',
  router,
  store,
}).$mount('#app');
