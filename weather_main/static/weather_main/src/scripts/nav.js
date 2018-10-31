import Vue from 'vue';

new Vue({
  el: '#nav',
  delimiters: ['[[', ']]'],
  data: {
  },
  methods: {
    toggleMenu() {
      document.getElementById('nav-collapse').classList.toggle('active');
    },
  },
  watch: {
  },
  created() {
  }
});
