<template lang="html">
  <div class="card details-card hourly-card">
    <h5 class="card-title fw-semi">Hourly</h5>
    <div class="card-body details-card-body">
      <div class="inner-card-container">
        <details-card-item v-for="i, x in hourlyData10"
        :key="x"
        :datumIndex="x"
        :hourlyDatum="hourlyData10[x]"
        ></details-card-item>
      </div>
    </div>
    <more-details-collapse v-for="i, x in hourlyData10"
      :key="x"
      :datumIndex="x"
      :hourlyDatum="hourlyData10[x]"
    ></more-details-collapse>
  </div>
</template>

<script>
import DetailsCardItem from './DetailsCardItem.vue';
import MoreDetailsCollapse from './MoreDetailsCollapse.vue';

export default {
  name: 'DetailsPaneItem',
  components : { DetailsCardItem, MoreDetailsCollapse },
  props: ['hourlyData'],
  data() {
    return {
      hourlyData10: [],
    }
  },
  mounted() {
    for (var i = 0; i < 10; i++) {
      this.hourlyData10.push(this.hourlyData.data[i]);
    }
    console.log(this.hourlyData10);
  }
}
</script>

<style scoped lang="sass">
  @import "../stylesheets/styles"

  .card, .card-body
    border: none
    padding: 0

  .details-card
    margin: $s-l-2 auto $s auto
    border-radius: 0
    height: auto
    max-width: 90%
    // border-left: none
    // border-right: none
    ::-webkit-scrollbar
      height: 7px
      width: 9px
      background: $light

    ::-webkit-scrollbar-thumb
      background: $sunny-blue
      -webkit-border-radius: 1ex
      // -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75)

    ::-webkit-scrollbar-corner
        background: #000

    @include media-tablet
      max-width: 56%

    .details-card-body
      overflow-x: scroll
      margin: $s-s-6 0 $s-s-2 0

      .inner-card-container
        width: $s-l-3 * 10
        margin: auto
        display: flex
        align-items: stretch
</style>
