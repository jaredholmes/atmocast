<template lang="html">
  <div class="collapse multi-collapse more-details-collapse" :id="'more-details' + datumIndex">
    <div class="card card-body row more-details-card">
      <h3 class="fs-large fw-semi more-details-header">{{ $momentUnixHour(hourlyDatum.time, datumIndex) }}</h3>
      <div class="col-12 col-md-6">
        <b>Feels like:</b> {{ Math.round(hourlyDatum.apparentTemperature) }}&deg;
      </div>
      <div class="col-12 col-md-6">
        <b>Chance of rain:</b> {{ hourlyDatum.precipProbability * 100 }}%
      </div>
      <div class="col-12 col-md-6">
        <b>Wind speed:</b> {{ Math.round(hourlyDatum.windSpeed) }}mph
      </div>
      <div class="col-12 col-md-6">
        <b>Humidity:</b> {{ Math.round(hourlyDatum.humidity * 100) }}%
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MoreDetailsCollapse',
  props: ['datumIndex', 'hourlyDatum'],
}
</script>

<style scoped lang="sass">
  @import "../stylesheets/styles"

  .more-details-header
    margin-bottom: $s-s-5
</style>
