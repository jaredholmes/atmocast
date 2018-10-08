import Vue from 'vue';
import VueRouter from 'vue-router';
import moment from 'moment/min/moment.min'
import 'bootstrap/dist/css/bootstrap.min.css';

import { store } from './store';
import '../stylesheets/styles.sass';
import IndexPage from '../components/IndexPage.vue';

// Service worker registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

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
    $removeCardsColor(isModeHourly) {
      let cardClass;
      const colorClass = 'bc-light-accent';

      if (isModeHourly) {
        cardClass = document.getElementsByClassName('inner-hourly ' + colorClass);
      } else {
        cardClass = document.getElementsByClassName('inner-daily ' + colorClass);
      }

      for (var i = 0; i < cardClass.length; i++) {
        cardClass[i].classList.remove(colorClass);
      }
    },
    $weatherHourMatchesCurrent(unixTime) {
      const currentHourDay = moment().format('H, D');
      moment.unix(unixTime);
      if (moment.unix(unixTime).format('H, D') === currentHourDay) {
        return true;
      } else {
        return false;
      }
    },
    $adjustCurrentWeather(hourlyData) {
      if (this.$weatherHourMatchesCurrent(hourlyData[0].time)) {
        this.$store.commit({
          type: 'setCurrentWeather',
          index: 0,
        })
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
    $momentOffsetTime(time ,offset) {
      const utc = moment.utc(moment.unix(time));
      const offsetTime = moment(utc).add(offset, 'h');
      return moment(offsetTime).format('HH:mm');
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
