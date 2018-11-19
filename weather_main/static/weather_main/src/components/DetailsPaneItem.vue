<template lang="html">
  <div class="card details-card animated fadeInUp">
    <h5 class="card-title fw-semi">{{ cardTitle }}</h5>
    <div class="card-body details-card-body">
      <div class="inner-card-container" :class="{'hourly-inner': modeHourly}">
        <details-card-item
          v-for="i, x in 24"
          :key="x"
          :datumIndex="x"
          :modeHourly="modeHourly"
        ></details-card-item>
      </div>
    </div>
    <more-details-collapse :modeHourly="modeHourly"></more-details-collapse>
  </div>
</template>

<script>
import DetailsCardItem from './DetailsCardItem.vue';
import MoreDetailsCollapse from './MoreDetailsCollapse.vue';

export default {
  name: 'DetailsPaneItem',

  components : {
    DetailsCardItem,
    MoreDetailsCollapse
  },

  props: ['modeHourly'],

  computed: {
    cardTitle() {
      return this.modeHourly ? 'Hourly' : 'Daily';
    }
  },
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

    ::-webkit-scrollbar
      height: 7px
      width: 9px
      background: $light

    ::-webkit-scrollbar-thumb
      background: $clear-day-blue
      -webkit-border-radius: 1em

    @include media-tablet
      max-width: 75%

    @include media-large
      max-width: 56%

    .details-card-body
      overflow-x: scroll
      margin: $s-s-6 0 $s-s-2 0

      .inner-card-container
        width: $s-l-4 * 8
        margin: auto
        display: flex
        align-items: stretch

      .hourly-inner
        width: $s-l-4 * 24
</style>
