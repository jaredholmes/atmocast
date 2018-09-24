<template lang="html">
  <nav class="navbar navbar-expand-lg" id="navbar-main">
    <div class="nav-wrapper row">
      <a href="/" class="navbar-brand col-4 fw-semi fs-large">Simple Weather</a>
      <button class="ml-auto navbar-toggler col-1 offset-5" data-toggle="collapse" data-target="#nav-collapse" aria-controls="nav-collapse" aria-expanded="false" aria-label="Toggle navigation">
        <img class="icon icon-menu" src="/icons/menu.png" alt="">
      </button>
      <div id="nav-collapse" class="collapse navbar-collapse ml-auto">
        <ul class="navbar-nav ml-auto">
          <navbar-location-search-bar></navbar-location-search-bar>
          <!-- <li class="nav-item"><a href="#" class="nav-link fw-semi"
            @click="toggle">
            Units:
            <span id="metric-toggle">Metric</span>
            <img class="toggle-units" id="toggle-units-icon" src="/icons/switch-off.png" alt="Metric units">
            <span id="imperial-toggle">Imperial</span>
          </a></li> -->
          <!-- <li class="nav-item"><a href="#" class="nav-link c-pro-red  fw-semi">Go Pro</a></li> -->
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import NavbarLocationSearchBar from './NavbarLocationSearchBar.vue';

export default {
  name: 'NavbarItem',
  props: ['currentIcon'],
  components: { NavbarLocationSearchBar },
  methods: {
    setBCFromIcon(icon) {
      const navbar = document.getElementById('navbar-main');
      const navCollapse = document.getElementById('nav-collapse');
      const whiteClass = 'bc-light';
      let bcClass;
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
      navbar.classList.add(bcClass);
      if (window.innerWidth >= 992) {
        navCollapse.classList.add(bcClass);
        navCollapse.classList.remove(whiteClass);
      } else {
        navCollapse.classList.add(whiteClass);;
      }
    },
    toggle() {
      // TODO: Figure out how to globally manipulate metrcUnits variable/prop
      // Clean this code
      if (this.$root._data.metricUnits) {
        document.getElementById('toggle-units-icon').src = '/icons/switch-on.png';
        document.getElementById('imperial-toggle').classList.add('toggle-active');
        document.getElementById('metric-toggle').classList.remove('toggle-active');
        // this.$root._data.metricUnits = false;
        // console.log(this.$root._data.metricUnits);
      } else {
        document.getElementById('toggle-units-icon').src = '/icons/switch-off.png';
        document.getElementById('imperial-toggle').classList.remove('toggle-active');
        document.getElementById('metric-toggle').classList.add('toggle-active');
        // this.$root._data.metricUnits = true;
        // console.log(this.$root._data.metricUnits);
      }
    }
  },
  mounted() {
    this.setBCFromIcon(this.currentIcon);
  }
}
</script>

<style scoped lang="sass">
  @import "../stylesheets/styles"

  nav
    padding: 0
    // Prevents thin white line between nav and main section
    padding-bottom: $s-l-1 + 1px

  .nav-wrapper
    width: 100%
    margin: 0

  .navbar-brand
    min-width: 75%

    @include media-large
      min-width: 0

  .navbar-collapse
    float: right

  .nav-item
    padding: $s-s-6

  .toggle-active
    text-decoration: underline

  .navbar-toggler
    padding-right: $s-s-1

  .icon-menu
    max-width: $s-s-2
</style>
