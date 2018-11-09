<template lang="html">
  <div class="collapse multi-collapse more-details-collapse bc-light-accent"
  :class="{
    'hourly-collapse': modeHourly,
    'daily-collapse': !modeHourly
  }"
  :id="collapseId">
    <div class="card card-body row more-details-card bc-light-accent">
      <h3 v-if="modeHourly" class="fs-large fw-bold more-details-header">
      {{ $momentOffsetTime(weatherDatum.time, offset) }}</h3>
      <h3 v-else class="fs-large fw-bold more-details-header">{{ $momentAddDays(datumIndex) }}</h3>
      <button @click="$removeCardsColor(modeHourly);
        closeCollapse();"
      type="button"
      class="btn btn-close close-more-details"

      >
        <img :src="$store.state.iconLocationPrefix + 'close-light.png'" alt="Close more details">
      </button>
      <div class="collapse-outer-container row">
        <div class="col-12 daily-summary fw-semi">
          {{ weatherDatum.summary }}
        </div>
        <div :class="{ innerWithBorder: proUser}" class="col-12 col-sm-6 row collapse-inner-container">
          <div v-if="modeHourly" class="col-12 col-md-12">
            <b>Feels like:</b> {{ Math.round(weatherDatum.apparentTemperature) }}&deg;
          </div>
          <div class="col-12 col-md-12">
            <b>Chance of rain:</b> {{ Math.round(weatherDatum.precipProbability * 100) }}%
          </div>
          <div v-if="proUser" class="col-12 col-md-12">
            <b v-if="modeHourly">Rainfall per hour:</b>
            <b v-else>Average rainfall per hour:</b> {{ +weatherDatum.precipIntensity.toFixed(2) }} {{ shortDistanceUnit }}
          </div>
          <div v-if="modeHourly" class="col-12 col-md-12">
            <b>Wind:</b> {{ Math.round(weatherDatum.windSpeed) }} {{ speedUnit }}<span v-if="proUser"> {{ windDirection }}</span>
          </div>
          <div class="col-12 col-md-12">
            <b>Humidity:</b> {{ Math.round(weatherDatum.humidity * 100) }}%
          </div>
          <div v-if="!modeHourly && proUser" class="col-12 col-md-12">
            <b>Warmest time:</b> {{ $momentOffsetTime(weatherDatum.temperatureHighTime, offset) }}
          </div>
          <div v-if="!modeHourly && proUser" class="col-12 col-md-12">
            <b>Coolest time:</b> {{ $momentOffsetTime(weatherDatum.temperatureLowTime, offset) }}
          </div>
          <div v-if="!modeHourly && proUser" class="col-12 col-md-12">
            <b>Moon phase:</b> {{ moonPhaseTerm }}
          </div>
        </div>

        <div class="col-12 col-sm-6 row collapse-inner-container">
          <div v-if="proUser" class="col-12 col-md-12">
            <b v-if="modeHourly">Cloud cover:</b>
            <b v-else>Average cloud cover:</b> {{ Math.round(weatherDatum.cloudCover * 100) }}%
          </div>
          <div v-if="proUser" class="col-12 col-md-12">
            <b>Pressure:</b>
            <span v-if="metric">{{ Math.round(weatherDatum.pressure/10) }} kPa</span>
            <span v-else>{{ Math.round(weatherDatum.pressure) }} mbar</span>
          </div>
          <div v-if="proUser" class="col-12 col-md-12">
            <b>UV index:</b> {{ weatherDatum.uvIndex }}
          </div>
          <div v-if="modeHourly && proUser" class="col-12 col-md-12">
            <b>Dew point:</b> {{ Math.round(weatherDatum.dewPoint) }}&deg;
          </div>
          <div v-if="!modeHourly && proUser" class="col-12 col-md-12">
            <b>Sunrise:</b> {{ $momentOffsetTime(weatherDatum.sunriseTime, offset) }}
          </div>
          <div v-if="proUser" class="col-12 col-md-12">
            <div v-if="!modeHourly">
              <b>Sunset:</b> {{ $momentOffsetTime(weatherDatum.sunsetTime, offset) }}
            </div>
            <div v-else>
              <b>Visibility:</b> {{ Math.round(weatherDatum.visibility) }} {{ longDistanceUnit }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MoreDetailsCollapse',

  props: ['modeHourly'],

  computed: {
    proUser() {
      return this.$store.state.proUser;
    },
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
    offset() {
      return this.$store.getters.currentOffset;
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
    longDistanceUnit() {
      if (this.metric) {
        return 'km'
      } else {
        return 'mi'
      }
    },
    shortDistanceUnit() {
      if (this.metric) {
        return 'cm'
      } else {
        return 'in'
      }
    },
    collapseId() {
      if (this.modeHourly) {
        return 'more-details-hourly';
      } else {
        return 'more-details-daily';
      }
    },
    moonPhaseTerm() {
      if (this.proUser) {
        const moonPhase = this.weatherDatum.moonPhase * 100;
        let term;

        switch(true) {
          case 98 < moonPhase:
            term = 'New moon';
            break;
          case moonPhase <= 1:
            term = 'New moon';
            break;
          case moonPhase <= 17:
            term = 'Waxing crescent';
            break;
          case moonPhase <= 33:
            term = 'First quarter';
            break;
          case moonPhase <= 48:
            term = 'Waxing gibbous';
            break;
          case moonPhase <= 51:
            term = 'Full moon';
            break;
          case moonPhase <= 67:
            term = 'Waning gibbous';
            break;
          case moonPhase <= 83:
            term = 'Third quarter';
            break;
          case moonPhase <= 98:
            term = 'Waning crescent';
            break;
          default:
            term = '';
        }

        return term;
      }
    },
    windDirection() {
      if (this.proUser) {
        const bearing = this.weatherDatum.windBearing;
        let direction;

        switch (true) {
          case bearing < 23:
            direction = 'N';
            break;
          case bearing < 46:
            direction = 'NNE';
            break;
          case bearing < 68:
            direction = 'ENE';
            break;
          case bearing < 91:
            direction = 'E';
            break;
          case bearing < 113:
            direction = 'ESE';
            break;
          case bearing < 136:
            direction = 'SE';
            break;
          case bearing < 158:
            direction = 'SSE';
            break;
          case bearing < 180:
            direction = 'S';
            break;
          case bearing < 203:
            direction = 'SSW';
            break;
          case bearing < 226:
            direction = 'SW';
            break;
          case bearing < 248:
            direction = 'WSW';
            break;
          case bearing < 271:
            direction = 'W';
            break;
          case bearing < 293:
            direction = 'WNW';
            break;
          case bearing < 316:
            direction = 'NW';
            break;
          case bearing < 338:
            direction = 'NNW';
            break;
          default:
            direction = '';
        }

        return direction;
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
    z-index: -1
    position: absolute
    display: block
    max-height: 0
    // transition: max-height 180ms ease-in, opacity 100ms linear
    // -webkit-transition: max-height 180ms ease-in, opacity 100ms linear
    // -ms-transition: max-height 180ms ease-in, opacity 100ms linear

  .more-details-collapse *
    opacity: 0
    // transition: opacity 150ms linear
    // -webkit-transition: opacity 150ms linear
    // -ms-transition: opacity 150ms linear

  // 'shown' overrides Bootstrap's 'show', allowing for custom animations, etc.
  .more-details-collapse.shown
    z-index: 0
    position: relative
    max-height: 400px
    display: block

  .more-details-collapse.shown *
    opacity: 1

  .more-details-header
    margin-bottom: $s-s-5

  .more-details-card
    border: none
    padding: $s-s-4

    .collapse-inner-container
      padding: 0.5em 0
      align-content: flex-start

      @include media-tablet
        padding: 0

    .innerWithBorder
      border: none
      border-bottom: 1px solid #cccccc

      @include media-tablet
        border: none
        border-right: 1px solid #cccccc

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
