<template lang="html">
  <div @click="selectMoreDetails(datumIndex)"
  class="card details-inner-card"
  :class="{
    'inner-hourly': modeHourly,
    'inner-daily': !modeHourly,
  }"
  :id="detailsId"
  data-toggle="collapse"
  :data-target="'#' + collapseTarget"
  aria-expanded="false"
  :aria-controls="collapseTarget">
    <div class="card-body">
      <span v-if="modeHourly" class="inner-temp inner-temp-hourly">
        {{ Math.round(weatherDatum.temperature) }}&deg;
      </span>
      <span v-else class="inner-temp inner-temp-daily">
        {{ Math.round(weatherDatum.temperatureMax) }}&deg; / {{ Math.round(weatherDatum.temperatureMin) }}&deg;
      </span>
      <span class="inner-rain">
        <span class="c-secondary fs-small" v-if="weatherDatum.precipProbability > 0">
          {{ Math.round(weatherDatum.precipProbability * 100) }}%
        </span>
      </span>
      <span class="inner-icon">
        <img :src="'/icons/' + weatherDatum.icon + '-small.png'">
      </span>
      <span v-if="modeHourly" class="inner-time">
        {{ $momentUnixHour(weatherDatum.time, datumIndex) }}
      </span>
      <span v-else class="inner-date">
        {{ $momentAddDays(datumIndex) }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailsCardItem',
  props: ['datumIndex', 'modeHourly'],
  computed: {
    weatherDatum() {
      if (this.modeHourly) {
        return this.$store.getters.hourlyWeather[this.datumIndex];
      } else {
        return this.$store.getters.dailyWeather[this.datumIndex];
      }
    },
    collapseTarget() {
      if (this.modeHourly) {
        return 'more-details-hourly-' + this.datumIndex;
      } else {
        return 'more-details-daily-' + this.datumIndex;
      }
    },
    detailsId() {
      if (this.modeHourly) {
        return 'details-hourly-' + this.datumIndex;
      } else {
        return 'details-daily-' + this.datumIndex;
      }
    }
  },
  methods: {
    unHighlightCards() {
      let typeClass;
      if (this.modeHourly) {
        typeClass = 'inner-hourly';
      } else {
        typeClass = 'inner-daily';
      }
      const highlightedCards = document.getElementsByClassName('details-inner-card bc-light-accent ' + typeClass);
      for (var i = 0; i < highlightedCards.length; i++) {
        highlightedCards[i].classList.remove('bc-light-accent');
      }
    },
    // Prevents details collapses from piling up when multiple details items
    // are clicked. Does not occur if details item with an open corresponding
    // collapse is clicked, since this prevents the collapse from closing.
    closeCollapse(index, isHourly) {
      let show;
      if (this.modeHourly) {
        show = document.getElementsByClassName('show hourly-collapse');
      } else {
        show = document.getElementsByClassName('show daily-collapse');
      }

      if (show) {
        for (var i = 0; i < show.length; i++) {
          const collapseId = show[i].id;
          if (collapseId.substr(collapseId.length - 1) != index) {
            show[i].classList.remove('show');
          } else {
            this.unHighlightCards();
          }
        }
      }
    },
    highlightCard(index, isHourly) {
      const currentCard = document.getElementById(this.detailsId);
      this.unHighlightCards();
      currentCard.classList.add('bc-light-accent');
    },
    selectMoreDetails(index, isHourly) {
      this.highlightCard(index, isHourly);
      this.closeCollapse(index, isHourly);
    },
  },
}
</script>

<style scoped lang="sass">
  @import "../stylesheets/styles"

  .details-inner-card:hover
    cursor: pointer
    background-color: $light-accent-hover

  .bc-light-accent:hover
    background-color: $light-accent

  .details-inner-card, .card-body
    width: $s-l-4

  .details-inner-card
    height: auto
    margin: $s-s-2 0
    display: inline-block
    border-radius: 0

    .card-body
      display: flex
      height: $s-l-3
      flex-wrap: wrap
      align-content: space-between
      border-left: 1px solid #cccccc
      padding: 0 $s-s-4
      overflow-x: hidden

      span
        flex-basis: auto

      .inner-temp, .inner-rain
        width: 50%

      .inner-rain
        text-align: right

      .inner-icon
        margin: auto
        position: relative
        bottom: 5px

        img
          max-width: 2em

      .inner-time, .inner-date
        width: 100%
        margin: auto
        text-align: center
</style>
