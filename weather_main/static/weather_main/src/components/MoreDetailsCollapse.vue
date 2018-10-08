<template lang="html">
  <div class="collapse multi-collapse more-details-collapse bc-light-accent"
  :class="{
    'hourly-collapse': modeHourly,
    'daily-collapse': !modeHourly
  }"
  :id="collapseId">
    <div class="card card-body row more-details-card bc-light-accent">
      <h3 v-if="modeHourly" class="fs-large fw-bold more-details-header">
      {{ $momentConvertByTimeZone(weatherDatum.time, timeZone) }}</h3>
      <h3 v-else class="fs-large fw-bold more-details-header">{{ $momentAddDays(datumIndex) }}</h3>
      <button @click="$removeCardsColor(modeHourly);
        closeCollapse();"
      type="button"
      class="btn btn-close close-more-details"

      >
        <img :src="$store.state.iconLocationPrefix + 'close-light.png'" alt="Close more details">
      </button>
      <div v-if="modeHourly" class="col-12 col-md-6">
        <b>Feels like:</b> {{ Math.round(weatherDatum.apparentTemperature) }}&deg;
      </div>
      <div v-else class="col-12 daily-summary fw-semi">
        {{ weatherDatum.summary }}
      </div>
      <div class="col-12 col-md-6">
        <b>Chance of rain:</b> {{ weatherDatum.precipProbability * 100 }}%
      </div>
      <div class="col-12 col-md-6">
        <b>Wind speed:</b> {{ Math.round(weatherDatum.windSpeed) }}{{ speedUnit }}
      </div>
      <div class="col-12 col-md-6">
        <b>Humidity:</b> {{ Math.round(weatherDatum.humidity * 100) }}%
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MoreDetailsCollapse',

  props: ['modeHourly'],

  computed: {
    datumIndex() {
      if (this.modeHourly) {
        return this.$store.getters.displayedCollapseHourly;
      } else {
        return this.$store.getters.displayedCollapseDaily;
      }
    },
    weatherDatum() {
      if (this.modeHourly) {
        return this.$store.getters.hourlyWeather[this.datumIndex];
      } else {
        return this.$store.getters.dailyWeather[this.datumIndex];
      }
    },
    timeZone() {
      return this.$store.getters.currentTimeZone;
    },
    metric() {
      return this.$store.state.metric;
    },
    speedUnit() {
      if (this.metric) {
        return 'km/h'
      } else {
        return 'mph'
      }
    },
    collapseId() {
      if (this.modeHourly) {
        return 'more-details-hourly';
      } else {
        return 'more-details-daily';
      }
    },
  },

  methods: {
    closeCollapse() {
      document.getElementById(this.collapseId).classList.remove('shown');
    }
  }
};
</script>

<style scoped lang="sass">
  @import "../stylesheets/styles"

  .more-details-collapse
    position: relative
    display: none
    // max-height: 0
    // -webkit-transition: max-height 200ms ease-in

  // .more-details-collapse *
  //   display: none

  // 'shown' overrides Bootstrap's 'show', allowing for custom animations, etc.
  .more-details-collapse.shown
    // max-height: 200px
    display: block

  // .more-details-collapse.shown *
  //   display: inline-block

  .more-details-header
    margin-bottom: $s-s-5

  .more-details-card
    border: none
    padding: $s-s-4

    .col-12, .col-12 *
      color: $text-secondary

    .daily-summary
      padding-top: $s-s-6
      padding-bottom: $s-s-5
      font-style: italic

  .close-more-details
    right: 8px
    top: 3px
    padding: 0

</style>
