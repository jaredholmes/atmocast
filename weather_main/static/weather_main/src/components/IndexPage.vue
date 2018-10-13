<template lang="html">
  <div>
    <navbar-item></navbar-item>

    <div id="alert-location" class="alert alert-primary bc-light" role="alert">
    <span>For a better experience, allow Atmocast to get weather information for your location.</span>
    <span class="alert-buttons-container">
      <button @click="$getPosition(true)" id="btn-location-get" class="btn fw-semi" type="button" name="button">Get my location</button>
      <button @click="$focusLocationSearch(); $hideAlert('alert-location');" id="btn-location-search" class="btn fw-semi" type="button" name="button">Search location</button>
      <img @click="$hideAlert('alert-location')" :src="$store.state.iconLocationPrefix + 'close-light.png'" class="alert-close" alt="Close alert">
    </span>
    </div>

    <div
    id="main-section"
    @click="$hideCollapse();
    $hideNavbarSearchButton();
    $hideSearchResults();"
    >
      <div id="alert-main" class="alert alert-primary bc-light" role="alert">
        <span v-html="$store.state.alertMessage" class="alert-message"></span>
      <img @click="$hideAlert();" :src="$store.state.iconLocationPrefix + 'close-light.png'" class="alert-close" alt="Close alert">
    </div>

      <display-item></display-item>

      <details-pane-item :modeHourly="true"></details-pane-item>
      <details-pane-item :modeHourly="false"></details-pane-item>
      <!-- Fix this -->
      <details-pane-item style="display: none;" :w="$store.state.weather.daily.data[0]"></details-pane-item>

      <fav-location-list></fav-location-list>

      <footer-item></footer-item>
    </div>
  </div>
</template>

<script>
import localforage from 'localforage';
import NavbarItem from './NavbarItem.vue';
import DisplayItem from './DisplayItem.vue';
import DetailsPaneItem from './DetailsPaneItem.vue';
import FavLocationList from './FavLocationList.vue';
import FooterItem from './FooterItem.vue';

export default {
  name: 'IndexPage',

  components: {
    NavbarItem,
    DisplayItem,
    DetailsPaneItem,
    FavLocationList,
    FooterItem
  },

  computed: {
    metric() {
      return this.$store.state.metric;
    },
    lat() {
      return this.$store.state.coords.lat;
    },
    favLocationExists() {
      return this.$store.state.favLocationExists;
    },
    currentCity() {
      return this.$store.state.currentCity;
    },
  },
  watch: {
    currentCity() {
      document.title = 'Weather in ' + this.currentCity + ' – Atmocast';
    },
    metric() {
      if (this.metric) {
        this.$convertAll(this.$store.state.weather, this.$fToC, this.$mToKm);
      } else {
        this.$convertAll(this.$store.state.weather, this.$cToF, this.$kmToM);
      }
    },
    lat() {
      // lat changes when the location is set, which makes it a good time to fetch the main data
      this.$getMainData();
    }
  },
  created() {
    this.$checkFavLocation();
    this.$setLocation();
    
    localforage.getItem('favLocationName')
      .then((value) => {
        if (value) {
          this.$store.commit({
            type: 'setFavLocationName',
            name: value,
          });
        }
      });
  },
  beforeUpdate() {
    if (!this.favLocationExists) {
      localforage.getItem(
        'returnVisit',
        (err, value) => {
          if (!value) {
            this.$showLocationAlert();
            localforage.setItem('returnVisit', true);
          }
        }
      );
    }
  },
  updated() {
    window.setInterval(
      () => {
        if (this.$store.state.weather) {
          const weatherHour = this.$store.getters.hourlyWeather[0].time;
          if (!this.$weatherHourMatchesCurrent(weatherHour)) {
            this.$setLocation();
            this.$getMainData();
          }
        }
      },
      1000
    );
  },
};
</script>

<style scoped lang="sass">
  @import "../stylesheets/styles"

  .alert
    margin-bottom: 0
    max-height: 0
    padding: 0
    border: none
    text-align: center
    transition: max-height 100ms ease-in, padding 80ms ease-in
    align-items: center

    .alert-message, .alert-close
      display: none

    .alert-message
      max-width: 90%

    .alert-close
      max-width: 1em
      max-height: 1em
      position: absolute
      right: $s-s-6
      bottom: 50%
      top: 50%
      margin: auto

    .alert-close:hover
      cursor: pointer

  .alert.shown
    max-height: 20em
    height: auto
    padding: $s-s-5 $s-s-4

    .alert-message, .alert-close
      display: inline

  #alert-location

    span
      margin-bottom: $s-s-5

      @include media-large
        margin: 0 $s-s-5

    .btn
      margin: $s-s-5 $s-s-6 4px $s-s-6
      color: $light

      @include media-large
        margin-top: 0

    .btn:hover
      color: $text-primary

    #btn-location-get:hover
      background-color: #F87666

    #btn-location-get
      background-color: #ef412d

    #btn-location-search:hover
      background-color: #7EC4CF

    #btn-location-search
      background-color: #18a6bc

  #alert-location.shown

    .btn
      @include media-tiny
        display: block
        margin-left: auto
        margin-right: auto

</style>
