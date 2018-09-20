<template lang="html">
  <div @click="closeCollapse(datumIndex)" class="card details-inner-card" data-toggle="collapse" :data-target="'#more-details' + [datumIndex]" aria-expanded="false" :aria-controls="'more-details' + [datumIndex]">
    <div class="card-body">
      <span class="inner-icon"><img src="/icons/sun-50.png"></span>
      <span class="inner-temp">{{ Math.round(hourlyDatum.temperature) }}&deg;</span>
      <span class="inner-time">{{ $momentUnixHour(hourlyDatum.time, datumIndex) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailsCardItem',
  props: ['datumIndex', 'hourlyDatum'],
  methods: {
    // Prevents details collapses from piling up when multiple details items
    // are clicked. Does not occur if details item with an open corresponding
    // collapse is clicked, since this prevents the collapse from closing.
    closeCollapse(index) {
      const show = document.getElementsByClassName('show');
      if (show) {
        for (var i = 0; i < show.length; i++) {
          const collapseId = show[i].id;
          if (collapseId.substr(collapseId.length - 1) != index) {
            show[i].classList.remove('show');
          }
        }
      }
    },
  },
}
</script>

<style scoped lang="sass">
  @import "../stylesheets/styles"

  .details-inner-card:hover
    cursor: pointer

  .details-inner-card
    max-width: $s-l-3
    height: auto
    margin: $s-s-2 0
    display: inline-block

    .card-body
      display: flex
      max-width: $s-l-3
      height: $s-l-3
      flex-wrap: wrap
      align-content: space-between
      border-left: 1px solid #cccccc
      padding: 0 $s-s-4
      overflow-x: hidden

      span
        flex-basis: auto

        img
          max-width: 1.2em

      .inner-icon, .inner-temp
        width: 50%

      .inner-temp
        text-align: right

      .inner-time
        width: 100%
        text-align: center
</style>
