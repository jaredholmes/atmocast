<template lang="html">
  <nav class="navbar navbar-expand-lg" id="navbar-main">
    <div class="nav-wrapper row">
      <a href="/" class="navbar-brand col-4">
        <img class="nav-logo" :src="$store.state.iconLocationPrefix + 'logo-small.png'" alt="">
        <h1 class="fw-semi fs-moderate">Atmocast</h1>
      </a>
      <button class="ml-auto navbar-toggler col-1 offset-5" data-toggle="collapse" data-target="#nav-collapse" aria-controls="nav-collapse" aria-expanded="false" aria-label="Toggle navigation">
        <img class="icon icon-menu" :src="$store.state.iconLocationPrefix + 'menu.png'" alt="menu">
      </button>
      <div id="nav-collapse" class="collapse navbar-collapse ml-auto">
        <ul class="navbar-nav ml-auto">
          <navbar-location-search-bar></navbar-location-search-bar>
          <navbar-units-toggle-item></navbar-units-toggle-item>
          <!-- <li class="nav-item"><a href="#" class="nav-link c-pro-red  fw-semi">Go Pro</a></li> -->
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import NavbarLocationSearchBar from './NavbarLocationSearchBar.vue';
import NavbarUnitsToggleItem from './NavbarUnitsToggleItem.vue';

export default {
  name: 'NavbarItem',

  components: { NavbarLocationSearchBar, NavbarUnitsToggleItem },

  computed: {
    currentIcon() {
      return this.$store.state.currentWeather.icon;
    },
  },

  methods: {
    setBCFromIcon(icon) {
      const navbar = document.getElementById('navbar-main');
      const navCollapse = document.getElementById('nav-collapse');
      const whiteClass = 'bc-light';
      let bcClass;
      let bcClassColor;

      switch (icon) {
        case 'clear-day':
          bcClass = 'bc-sunny';
          break;
        case 'clear-night':
          bcClass = 'bc-night';
          break;
        case 'partly-cloudy-day':
          bcClass = 'bc-partly-cloudy-day';
          break;
        case 'partly-cloudy-night':
          bcClass = 'bc-partly-cloudy-night';
          break;
        case 'cloudy':
          bcClass = 'bc-cloudy';
          break;
        case 'fog':
          bcClass = 'bc-fog';
          break;
        case 'rain':
          bcClass = 'bc-rain';
          break;
        case 'sleet':
          bcClass = 'bc-sleet';
          break;
        case 'snow':
          bcClass = 'bc-snow';
          break;
        case 'wind':
          bcClass = 'bc-wind';
          break;
        default:
          bcClass = 'bc-light';
      }

      // Remove other background color classes first
      for (var i = 0; i < navbar.classList.length; i++) {
        if (navbar.classList[i].includes('bc')) {
          navbar.classList.remove(navbar.classList[i]);
        }
      }

      navbar.classList.add(bcClass);

      for (var i = 0; i < navCollapse.classList.length; i++) {
        if (navCollapse.classList[i].includes('bc')) {
          navCollapse.classList.remove(navCollapse.classList[i]);
        }
      }

      if (window.innerWidth >= 992) {
        navCollapse.classList.add(bcClass);
        navCollapse.classList.remove(whiteClass);
      } else {
        navCollapse.classList.add(whiteClass);
        navCollapse.classList.remove(bcClass);
      }

      // Change theme color to match navbar
      bcClassColor = window.getComputedStyle(navbar).getPropertyValue('background-color');
      document.getElementsByName('theme-color')[0].content = bcClassColor;
    },
  },

  watch: {
    currentIcon() {
      this.setBCFromIcon(this.currentIcon);
    },
  },

  mounted() {
    this.setBCFromIcon(this.currentIcon);
    window.addEventListener(
      'resize',
      () => this.setBCFromIcon(this.currentIcon)
    );
  }
};
</script>

<style scoped lang="sass">
  @import "../stylesheets/styles"

  nav
    padding: $s-s-6 0
    // Prevents thin white line between nav and main section
    padding-bottom: $s-l-1 + 1px

    @include media-large
      padding-top: 0
      padding-left: $s-s-6
      padding-right: $s-s-6

  .nav-wrapper
    width: 100%
    margin: 0

  .navbar-brand
    min-width: 75%
    margin: auto 0

    @include media-large
      min-width: 0

    h1
      display: inline-block

    .nav-logo
      max-width: $s-s-3
      position: relative
      bottom: 4px
      margin-right: 2px

      @include media-tablet
        margin: 0 $s-s-6

      @include media-large
        max-width: $s-s-2

  .navbar-collapse
    float: right

  .nav-item
    padding: $s-s-6
    margin-left: $s-s-4
    margin-top: auto
    margin-bottom: auto

  .nav-item:hover
    cursor: pointer

  .toggle-active
    text-decoration: underline

  .navbar-toggler
    padding-right: $s-s-2

  .icon-menu
    max-width: $s-s-3
</style>
