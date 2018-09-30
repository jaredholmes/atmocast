<template lang="html">
  <div class="row">
    <div class="col-12 display-main-section" id="display">
      <h1 class="fw-bold fs-xl display-temp">{{ Math.round(currentTemp) }}&deg;</h1>
      <h3 class="fs-moderate fw-reg">{{ currentSummary }}</h3>
      <br>
      <img :src="$store.state.iconLocationPrefix + currentIcon + '-large.png'" :alt="currentIcon">
      <h2 class="fw-semi fs-large">{{ currentCity }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "DisplayItem",

  props: ['currentCity'],

  computed: {
    currentTemp() {
      return this.$store.getters.currentWeather.temperature;
    },
    currentSummary() {
      return this.$store.getters.currentWeather.summary;
    },
    currentIcon() {
      return this.$store.getters.currentIcon;
    }
  },

  methods: {
    // Adds class to the element to give it the background color corresponsing with the currentIcon property
    setGradientFromIcon(icon) {
      const display = document.getElementById('display');
      let grClass;
      switch (icon) {
        case 'clear-day':
          grClass = 'gr-sunny';
          break;
        case 'clear-night':
          grClass = 'gr-night';
          break;
        case 'partly-cloudy-day':
          grClass = 'gr-partly-cloudy-day';
          break;
        case 'partly-cloudy-night':
          grClass = 'gr-partly-cloudy-night';
          break;
        case 'cloudy':
          grClass = 'gr-cloudy';
          break;
        case 'fog':
          grClass = 'gr-fog';
          break;
        case 'rain':
          grClass = 'gr-rain';
          break;
        case 'sleet':
          grClass = 'gr-sleet';
          break;
        case 'snow':
          grClass = 'gr-snow';
          break;
        case 'wind':
          grClass = 'gr-wind';
          break;
        default:
          grClass = 'bc-light';
      }

      for (var i = 0; i < display.classList.length; i++) {
        if (display.classList[i].includes('gr')) {
          display.classList.remove(display.classList[i]);
        }
      }

      display.classList.add(grClass);
    },
  },

  watch: {
    currentIcon() {
      this.setGradientFromIcon(this.currentIcon);
    },
  },

  mounted() {
    this.setGradientFromIcon(this.currentIcon);
  },
};
</script>

<style scoped lang="sass">
  @import "../stylesheets/styles"

  .row
    position: relative
    // Prevents thin white line between nav and main section
    bottom: 1px

  .row *
    z-index: 0

  .display-main-section
    text-align: center
    padding: 0
    padding-top: $s-s-3
    padding-bottom: $s-s-1

  .display-temp
    margin-bottom: $s-s-5

  img
    max-width: $s-l-4
    margin: $s-s-2 auto $s auto
    display: block
</style>
