import Vue from 'vue';
import VueRouter from 'vue-router';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import '../stylesheets/styles.sass';
import IndexPage from '../components/IndexPage.vue';

const routes = [
  { path: '', component: IndexPage },
];

const router = new VueRouter({
  mode: 'history',
  routes,
})

Vue.use(VueRouter);

Vue.mixin ({
  data() {
    return {
      $metricUnits: true,
    }
  },
  methods: {
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
    $fToC(f) {
      return (f - 32) * 5/9;
    },
    $mToKm(m) {
      return m * 1.609344;
    },
  }
})

new Vue({
  el: '#app',
  data: {
    metric: true
  },
  router,
}).$mount('#app');
