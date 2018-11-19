import Vue from 'vue';
import axios from 'axios';

new Vue({
  el: '#accountApp',
  delimiters: ['[[', ']]'],
  data: {
    showAuthAlert: false,
  },
  methods: {
    // Check if user is logged in and show alert from preventing them from proceeding to PayPal page if not logged in
    checkAuth(ev, isAuth) {
      if (!isAuth) {
        ev.preventDefault();
        this.showAuthAlert = true;
      }
    }
  },
});
