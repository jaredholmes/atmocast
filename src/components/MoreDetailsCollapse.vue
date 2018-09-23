<template lang="html">
  <div class="collapse multi-collapse more-details-collapse bc-light-accent"
  :class="{
    'hourly-collapse': modeHourly,
    'daily-collapse': !modeHourly
  }"
  :id="collapseId">
    <div class="card card-body row more-details-card bc-light-accent">
      <h3 v-if="modeHourly" class="fs-large fw-semi more-details-header">{{ $momentUnixHour(weatherDatum.time, datumIndex) }}</h3>
      <h3 v-else class="fs-large fw-semi more-details-header">{{ $momentAddDays(datumIndex) }}</h3>
      <div v-if="modeHourly" class="col-12 col-md-6">
        <b>Feels like:</b> {{ Math.round(weatherDatum.apparentTemperature) }}&deg;
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
  props: ['datumIndex', 'weatherDatum', 'metricUnits', 'modeHourly'],
  computed: {
    speedUnit() {
      if (this.metricUnits) {
        return 'km/h'
      } else {
        return 'mph'
      }
    },
    collapseId() {
      if (this.modeHourly) {
        return 'more-details-hourly-' + this.datumIndex;
      } else {
        return 'more-details-daily-' + this.datumIndex;
      }
    },
  },
}
</script>

<style scoped lang="sass">
  @import "../stylesheets/styles"

  .more-details-header
    margin-bottom: $s-s-5

  .more-details-card
    border: none

    .col-12, .col-12 *
      color: $text-secondary
</style>
