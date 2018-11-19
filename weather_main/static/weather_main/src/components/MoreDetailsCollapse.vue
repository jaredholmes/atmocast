<template lang="html">
  <div
    class="collapse multi-collapse more-details-collapse bc-light-accent"
    :class="{
      'hourly-collapse': modeHourly,
      'daily-collapse': !modeHourly
    }"
    :id="collapseId"
  >
    <div class="card card-body row more-details-card bc-light-accent">
      <h3 v-if="modeHourly" class="fs-large fw-bold more-details-header">
      {{ $momentOffsetTime(weatherDatum.time, offset) }}</h3>
      <h3 v-else class="fs-large fw-bold more-details-header">{{ $momentAddDays(datumIndex) }}</h3>
      <button
        @click="
          $removeCardsColor(modeHourly);
          closeCollapse();
        "
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
          <div v-if="modeHourly" class="col-12 col-md-12 collapse-wind">
            <b>Wind:</b>&nbsp;{{ Math.round(weatherDatum.windSpeed) }} {{ speedUnit }}<img v-if="proUser"
            class="wind-arrow"
            :style="{ transform: 'rotate(' + weatherDatum.windBearing + 'deg)' }"
            :src="$store.state.iconLocationPrefix + 'arrow.png'" alt="arrow">
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
          <div v-if="!modeHourly && proUser" class="collapse-moon col-12 col-md-12">
            <b>Moon phase:</b>&nbsp;{{ moonPhaseTerm }}
            <img
              class="moon-img"
              :src="$store.state.iconLocationPrefix + moonImgName + '.png'"
              :alt="moonPhaseTerm"
            >
          </div>
        </div>

        <div class="col-12 col-sm-6 row collapse-inner-container">
          <div v-if="proUser" class="col-12 col-md-12">
            <b v-if="modeHourly">Cloud cover:</b>
            <b v-else>Average cloud cover:</b> {{ Math.round(weatherDatum.cloudCover * 100) }}%
            <div class="cc-container">
              <div class="cc-indicator" :style="{ width: weatherDatum.cloudCover * 100 + '%' }">

              </div>
            </div>
          </div>
          <div v-if="proUser" class="col-12 col-md-12">
            <b>Pressure:</b>
            <span v-if="metric">{{ Math.round(weatherDatum.pressure/10) }} kPa</span>
            <span v-else>{{ Math.round(weatherDatum.pressure) }} mbar</span>
          </div>
          <div v-if="proUser" class="col-12 col-md-12">
            <b>UV index:</b> {{ weatherDatum.uvIndex }} <span v-if="UVIndicator">({{ UVIndicator }})</span>
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
    // Index of the data array used to display relevant data in the collapse
    datumIndex() {
      return this.modeHourly ? this.$store.getters.displayedCollapseHourly : this.$store.getters.displayedCollapseDaily;
    },
    weatherDatum() {
      return this.modeHourly ? this.$store.getters.hourlyWeather[this.datumIndex] : this.$store.getters.dailyWeather[this.datumIndex];
    },
    offset() {
      return this.$store.getters.currentOffset;
    },
    metric() {
      return this.$store.state.metric;
    },
    speedUnit() {
      return this.metric ? 'km/h' : 'mph';
    },
    longDistanceUnit() {
      return this.metric ? 'km' : 'mi';
    },
    shortDistanceUnit() {
      return this.metric ? 'cm' : 'in';
    },
    collapseId() {
      return this.modeHourly ? 'more-details-hourly' : 'more-details-daily';
    },
    // Set a text indication of UV index intensity
    UVIndicator() {
      if (this.proUser) {
        const index = this.weatherDatum.uvIndex;
        let indicator;
        switch(true) {
          case index == 0:
            indicator = '';
            break;
          case index <= 2:
            indicator = 'Low';
            break;
          case index <= 5:
            indicator = 'Moderate';
            break;
          case index <= 7:
            indicator = 'High';
            break;
          case index <= 10:
            indicator = 'Very high';
            break;
          case index > 10:
            indicator = 'Extreme';
            break;
          default:
            indicator = '';
        }

        return indicator;
      }
    },
    // Set a text indication of the moon phase
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
    // Set the moon phase image src
    moonImgName() {
      if (this.proUser) {
        const moonPhase = this.weatherDatum.moonPhase * 100;
        let name;

        switch(true) {
          case 98 < moonPhase:
            name = 'moon-new';
            break;
          case moonPhase <= 1:
            name = 'moon-new';
            break;
          case moonPhase <= 17:
            name = 'moon-wax-c';
            break;
          case moonPhase <= 33:
            name = 'moon-fq';
            break;
          case moonPhase <= 48:
            name = 'moon-wax-g';
            break;
          case moonPhase <= 51:
            name = 'moon-full';
            break;
          case moonPhase <= 67:
            name = 'moon-wan-g';
            break;
          case moonPhase <= 83:
            name = 'moon-lq';
            break;
          case moonPhase <= 98:
            name = 'moon-wan-c';
            break;
          default:
            name = '';
        }

        return name;
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

  .more-details-collapse *
    opacity: 0

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

  .moon-img
    max-width: 1em
    margin-left: $s-s-5

  .cc-container
    height: $s-s-6
    width: $s-s-1
    display: inline-block
    border: 1px solid $text-secondary
    border-radius: 5px
    vertical-align: middle
    margin-bottom: 3px
    margin-left: $s-s-5

  .cc-indicator
    height: 100%
    background-color: $text-secondary

  .collapse-wind, .collapse-moon
    display: flex
    align-items: center

  .wind-arrow
    max-height: 1em
    padding: 0 $s-s-6

</style>
