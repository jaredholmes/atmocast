<template lang="html">
  <div class="row">
    <div class="col-12 display-main-section">
      <h1 class="fw-semi fs-xl display-temp">{{ Math.round(currentTemp) }}&deg;</h1>
      <h3 class="fs-moderate">{{ currentSummary }}</h3>
      <br>
      <img :src="'/icons/' + currentIcon + '-small.png'" alt="sunny">
      <h2 class="fw-reg fs-large">{{ currentCity }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "DisplayItem",
  props: ['currentTemp', 'currentSummary', 'currentCity', 'currentIcon'],
}
</script>

<style scoped lang="sass">
  @import "../stylesheets/styles"

  .row
    position: relative
    // Prevents thin white line between nav and main section
    bottom: 1px

  .display-main-section
    text-align: center
    padding: 0
    background: $sunny-blue
    background: -moz-linear-gradient(180deg, $sunny-blue 0%, $light 100%)
    background: -webkit-linear-gradient(180deg, $sunny-blue 0%, $light 100%)
    background: linear-gradient(180deg, $sunny-blue 0%, $light 100%)
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=$sunny-blue,endColorstr=$light,GradientType=1)

  .display-temp
    margin-bottom: $s-s-5

  img
    max-width: $s-l-5
    margin: $s-s-2 auto $s auto
    display: block
</style>
