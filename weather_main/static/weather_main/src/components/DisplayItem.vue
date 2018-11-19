<template lang="html">
  <div class="row">
    <div class="col-12 display-main-section" id="display">
      <h1 class="fw-bold fs-xl display-temp animated fadeInUp">{{ Math.round(currentTemp) }}&deg;</h1>
      <h3 class="fs-moderate fw-reg animated fadeInUp">{{ currentSummary }}</h3>
      <br>
      <img
        class="main-icon animated fadeInUp" :src="$store.state.iconLocationPrefix + 'custom/' + currentIcon + '-large.png'"
        :alt="currentIcon"
      >
      <h2 class="fw-semi fs-large current-city">
        {{ currentCity }}
        <img
          @click="toggleFav()"
          class="fav-heart animated fadeInUp"
          :src="favHeartImg"
          alt="Favourite"
        >
      </h2>
    </div>
  </div>
</template>

<script>
import localforage from 'localforage';

export default {
  name: "DisplayItem",

  computed: {
    currentIsFav() {
      return this.$store.state.currentIsFav;
    },
    favLocation() {
      return this.$store.state.favLocation;
    },
    favLimit() {
      return this.$store.state.favLimit;
    },
    currentCity() {
      return this.$store.state.currentCity;
    },
    currentCoords() {
      return {
        lat: this.$store.getters.latitude,
        lon: this.$store.getters.longitude,
      };
    },
    // Heart image is filled or outlined based on whether the location is a favourite or not
    favHeartImg() {
      return this.currentIsFav ? this.$store.state.iconLocationPrefix + 'heart-filled.png' : this.$store.state.iconLocationPrefix + 'heart-outline.png';
    },
    currentTemp() {
      return this.$store.state.currentWeather.temperature;
    },
    currentSummary() {
      return this.$store.state.currentWeather.summary;
    },
    currentIcon() {
      return this.$store.state.currentWeather.icon;
    }
  },

  methods: {
    // Check if the current location name matches any names in the favourite locations
    checkIfLocationIsFav() {
      let isFav;

      for (var i = 0; i < this.favLocation.length; i++) {
        isFav = this.favLocation[i].name === this.currentCity;
        if (isFav) {
          break;
        }
      }

      this.$store.commit({
          type: 'setCurrentIsFav',
          bool: isFav,
        });
    },
    toggleFav() {
      if (this.currentIsFav === true) {
        this.$removeFavLocation(this.currentCity);
      } else {
        if (this.favLocation.length < this.favLimit) {
          this.$addFavLocation(this.currentCoords.lat, this.currentCoords.lon, this.currentCity);
        } else {
          this.$showAlert(
            this.$store.state.proUser ? 'You have reached the maximum number of favourite locations.' : 'You are limited to one favourite location. <a class="c-pro-red" href="/choose_plan">Upgrade to pro</a>'
          )
        }
      }
    },
    // Adds class to the element to give it the background color corresponsing with the currentIcon property
    setGradientFromIcon(icon) {
      const display = document.getElementById('display');
      const grClass = 'gr-' + icon;

      for (var i = 0; i < display.classList.length; i++) {
        if (display.classList[i].includes('gr-')) {
          display.classList.remove(display.classList[i]);
        }
      }

      display.classList.add(grClass);
    },
  },

  watch: {
    currentIcon() {
      this.setGradientFromIcon(this.currentIcon);
    },
    favLocation() {
      this.checkIfLocationIsFav();
    },
  },

  mounted() {
    this.setGradientFromIcon(this.currentIcon);
    this.checkIfLocationIsFav();
  },

  beforeUpdate() {
    this.checkIfLocationIsFav();
  },
};
</script>

<style scoped lang="sass">
  @import "../stylesheets/styles"

  .row
    position: relative
    // Prevents thin white line between nav and main section
    bottom: 1px

  .row *
    z-index: 0

  .display-main-section
    text-align: center
    padding: 0
    padding-top: $s-l-3
    padding-bottom: $s-l-1
    // Prevents thin white line between nav and main section
    position: relative
    bottom: 1px

    @include media-tablet
      padding-top: $s-l-3

    @include media-tiny
      padding-top: $s-l-1

  .display-temp
    margin-bottom: $s-s-5

  .main-icon
    max-width: $s-l-4
    margin: $s-s-2 auto $s auto
    display: block

  .current-city
    position: relative

  .fav-heart
    position: absolute
    margin: 3px
    max-width: 1em

  .fav-heart:hover
    cursor: pointer
</style>
