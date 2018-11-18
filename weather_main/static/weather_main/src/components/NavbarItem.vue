<template lang="html">
  <nav class="navbar navbar-expand-lg" id="navbar-main">
    <div class="nav-wrapper row">
      <a
        v-if="!androidApp || this.showNavBrand"
        @click="reload"
        class="animated navbar-brand col-4 col-lg-2"
        :class="{ fadeIn: this.showNavBrand }"
      >
        <img
          class="nav-logo"
          :src="$store.state.iconLocationPrefix + 'logo-small.png'"
          alt="Atmocast"
        >
        <h1 class="fw-semi fs-medium">Atmocast</h1>
      </a>
      <span v-else class="navbar-brand col-4 col-lg-2"></span>
      <span class="icons-container col-8">
        <refresh-button></refresh-button>
        <a
          @click="toggleMenu"
          id="nav-menu-toggler"
          class="navbar-toggler"
          data-toggle="collapse"
          data-target="#nav-collapse"
          aria-controls="nav-collapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <img
            class="icon icon-menu"
            :src="$store.state.iconLocationPrefix + 'menu.png'"
            alt="menu"
          >
        </a>
      </span>
      <div id="nav-collapse" class="collapse navbar-collapse ml-auto col-lg-10">
        <ul class="navbar-nav ml-auto">
          <navbar-location-search-bar></navbar-location-search-bar>
          <navbar-units-toggle-item></navbar-units-toggle-item>
          <li v-if="!$store.state.paidUser" class="nav-item">
            <a class="nav-link fw-semi" href="/products/">Products</a>
          </li>
          <li v-if="!$store.state.paidUser" class="nav-item">
            <a class="nav-link fw-semi" href="/log-in/">Log In</a>
          </li>
          <li v-else class="nav-item">
            <a class="nav-link fw-semi" href="/settings/">Account</a>
          </li>
          <li v-if="!$store.state.proUser" class="nav-item">
            <a class="nav-link fw-semi c-pro-red" href="/choose-plan/">Upgrade</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import NavbarLocationSearchBar from './NavbarLocationSearchBar.vue';
import NavbarUnitsToggleItem from './NavbarUnitsToggleItem.vue';
import RefreshButton from './RefreshButton.vue';

export default {
  name: 'NavbarItem',

  components: { NavbarLocationSearchBar, NavbarUnitsToggleItem, RefreshButton },

  data() {
    return {
      showBrand: false,
    };
  },

  computed: {
    showNavBrand() {
      return this.$store.state.showNavBrand;
    },
    currentIcon() {
      return this.$store.state.currentWeather.icon;
    },
    androidApp() {
      return this.$store.state.androidApp;
    },
  },

  methods: {
    reload() {
      if (navigator.onLine) {
        location.reload();
      } else {
        this.$showConnAlert();
      }
    },
    toggleMenu() {
      const navCollapse = document.getElementById('nav-collapse');
      navCollapse.classList.toggle('active');

      if (this.androidApp) {
        this.$store.commit({
          type: 'setShowNavBrand',
          bool: !this.showNavBrand,
        });
      }
    },
    setBCFromIcon(icon) {
      const navbar = document.getElementById('navbar-main');
      const navCollapse = document.getElementById('nav-collapse');
      const whiteClass = 'bc-light';
      const metaTheme =   document.getElementsByName('theme-color')[0];
      // let bcClass;
      const bcClass = 'bc-' + icon;
      let bcClassColor;

      // switch (icon) {
      //   case 'clear-day':
      //     bcClass = 'bc-clear-day';
      //     break;
      //   case 'clear-night':
      //     bcClass = 'bc-clear-night';
      //     break;
      //   case 'partly-cloudy-day':
      //     bcClass = 'bc-partly-cloudy-day';
      //     break;
      //   case 'partly-cloudy-night':
      //     bcClass = 'bc-partly-cloudy-night';
      //     break;
      //   case 'cloudy':
      //     bcClass = 'bc-cloudy';
      //     break;
      //   case 'fog':
      //     bcClass = 'bc-fog';
      //     break;
      //   case 'rain':
      //     bcClass = 'bc-rain';
      //     break;
      //   case 'sleet':
      //     bcClass = 'bc-sleet';
      //     break;
      //   case 'snow':
      //     bcClass = 'bc-snow';
      //     break;
      //   case 'wind':
      //     bcClass = 'bc-wind';
      //     break;
      //   default:
      //     bcClass = 'bc-light';
      // }

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
      if (metaTheme) {
        metaTheme.content = bcClassColor;
      }
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
    padding: 0

    @include media-large
      padding-top: 0
      padding-left: $s-s-6
      padding-right: $s-s-6

  .nav-wrapper
    width: 100%
    margin: 0

  .navbar-brand
    margin: auto 0
    display: flex
    align-items: center

    @include media-large
      min-width: 0

    h1
      display: inline-block
      line-height: 21px

    .nav-logo
      max-width: 21px * 4/3
      position: relative
      margin-right: 5px

      @include media-tablet
        margin-left: 5px

      @include media-large
        margin-left: 0

  .navbar-collapse
    float: right
    padding: 0
    max-height: 0
    display: block
    transition: max-height 180ms ease-in, padding 180ms ease-in
    -webkit-transition: max-height 180ms ease-in, padding 180ms ease-in
    -ms-transition: max-height 180ms ease-in, padding 180ms ease-in

    @include media-large
      height: auto
      // Max height higher than auto
      max-height: 5em
      padding: 0

  .navbar-collapse.active
    padding: $s-s-6 0
    // Max height higher than auto
    max-height: 30em

    img
      max-width: 1.2em

  .navbar-nav
    position: relative

  .nav-item
    padding: $s-s-6
    margin-left: $s-s-4
    margin-top: auto
    margin-bottom: auto

  .nav-item:hover
    cursor: pointer

  .toggle-active
    text-decoration: underline

  .icons-container
    display: flex
    align-items: center
    // Padding same as navbar brand
    padding: .3125rem 0

    @include media-large
      display: none

  .navbar-toggler
    display: flex
    align-items: center

    @include media-large
      display: none

  .icon-menu
    max-width: 1.2em

</style>
