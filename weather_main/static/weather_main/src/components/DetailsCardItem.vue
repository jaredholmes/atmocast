<template lang="html">
  <div
    v-if="weatherDatum"
    @click="selectMoreDetails(datumIndex)"
    class="card details-inner-card"
    :class="{
      'inner-hourly': modeHourly,
      'inner-daily': !modeHourly,
    }"
    :id="detailsId"
  >
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
        <img :src="$store.state.iconLocationPrefix + 'custom/' + weatherDatum.icon + '-small.png'">
      </span>
      <span v-if="modeHourly" class="inner-time">
        {{ $momentOffsetTime(weatherDatum.time, offset) }}
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
    // Determines what index of the collapse (displayedCollapseHourly and displayedCollapseDaily are integers representing indexes)
    displayedCollapse() {
      return this.modeHourly ? this.$store.getters.displayedCollapseHourly : this.$store.getters.displayedCollapseDaily;
    },
    // Gets hourly or daily weather data
    weatherDatum() {
      return this.modeHourly ? this.$store.getters.hourlyWeather[this.datumIndex] : this.$store.getters.dailyWeather[this.datumIndex];
    },
    // Offset for timezone
    offset() {
      return this.$store.getters.currentOffset;
    },
    // Used for IDs in template
    detailsId() {
      return this.modeHourly ? 'details-hourly-' + this.datumIndex : 'details-daily-' + this.datumIndex;
    }
  },

  methods: {
    highlightCard() {
      const currentCard = document.getElementById(this.detailsId);
      currentCard.classList.add('bc-light-accent');
    },

    // Shows collapse and manipulates $store collapse indexes, which control what data is displayed in the collapse
    selectMoreDetails(index, isHourly) {
      let collapse;
      collapse = this.modeHourly ? document.getElementById('more-details-hourly') : document.getElementById('more-details-daily');

      if (!collapse.classList.contains('shown')) {
        collapse.classList.add('shown');
      }

      if (this.modeHourly) {
        this.$store.commit({
          type: 'setDisplayedCollapseHourly',
          index: this.datumIndex
        });
      } else {
        this.$store.commit({
          type: 'setDisplayedCollapseDaily',
          index: this.datumIndex
        });
      }
      
      this.$removeCardsColor(this.modeHourly);
      this.highlightCard();
    },
  },
};
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
