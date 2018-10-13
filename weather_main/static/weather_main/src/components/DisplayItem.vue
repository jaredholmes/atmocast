<template lang="html">
  <div class="row">
    <div class="col-12 display-main-section" id="display">
      <h1 class="fw-bold fs-xl display-temp">{{ Math.round(currentTemp) }}&deg;</h1>
      <h3 class="fs-moderate fw-reg">{{ currentSummary }}</h3>
      <br>
      <img class="main-icon" :src="$store.state.iconLocationPrefix + currentIcon + '-large.png'" :alt="currentIcon">
      <h2 class="fw-semi fs-large current-city">
        {{ currentCity }}
        <img @click="toggleFav()" class="fav-heart" :src="favHeartImg" alt="Favourite">
      </h2>
    </div>
  </div>
</template>

<script>
import localforage from 'localforage';

export default {
  name: "DisplayItem",

  data() {
    return {
      isFav: false,
    }
  },

  computed: {
    currentCity() {
      return this.$store.state.currentCity;
    },
    currentCoords() {
      return {
        lat: this.$store.getters.latitude,
        lon: this.$store.getters.longitude,
      };
    },
    favHeartImg() {
      if (this.isFav) {
        return this.$store.state.iconLocationPrefix + 'heart-filled.png';
      } else {
        return this.$store.state.iconLocationPrefix + 'heart-outline.png';
      }
    },
    hourlyWeather() {
      return this.$store.getters.hourlyWeather;
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
    checkIfLocationIsFav() {
      localforage.getItem('favCoords')
        .then(value => {
          this.isFav = false;
          if (value) {
            if (this.currentCoords.lat == value.lat &&
            this.currentCoords.lon == value.lon) {
              this.isFav = true;
            }
          }
        });
    },
    toggleFav() {
      if (this.isFav) {
        this.isFav = false;
        // Unset fav co-ordinates
        localforage.removeItem('favCoords');
        this.$store.commit('unsetFavCoords');
        // Unset fav location name
        localforage.removeItem('favLocationName');
        this.$store.commit('unsetFavLocationName');
        this.$showAlert('Unfavourited ' + this.currentCity);
      } else {
        this.isFav = true;
        // Set fav co-ordinates
        localforage.setItem('favCoords', {
          lat: this.currentCoords.lat,
          lon: this.currentCoords.lon,
        });

        this.$store.commit({
          type: 'setFavCoords',
          coords: this.currentCoords,
        });

        // Set fav location name
        localforage.setItem('favLocationName', this.currentCity);

        this.$store.commit({
          type: 'setFavLocationName',
          name: this.currentCity,
        });

        this.$showAlert('Favourited ' + this.currentCity);
      }
    },
    // Adds class to the element to give it the background color corresponsing with the currentIcon property
    setGradientFromIcon(icon) {
      const display = document.getElementById('display');
      let grClass;
      switch (icon) {
        case 'clear-day':
          grClass = 'gr-sunny';
          break;
        case 'clear-night':
          grClass = 'gr-night';
          break;
        case 'partly-cloudy-day':
          grClass = 'gr-partly-cloudy-day';
          break;
        case 'partly-cloudy-night':
          grClass = 'gr-partly-cloudy-night';
          break;
        case 'cloudy':
          grClass = 'gr-cloudy';
          break;
        case 'fog':
          grClass = 'gr-fog';
          break;
        case 'rain':
          grClass = 'gr-rain';
          break;
        case 'sleet':
          grClass = 'gr-sleet';
          break;
        case 'snow':
          grClass = 'gr-snow';
          break;
        case 'wind':
          grClass = 'gr-wind';
          break;
        default:
          grClass = 'bc-light';
      }

      for (var i = 0; i < display.classList.length; i++) {
        if (display.classList[i].includes('gr')) {
          display.classList.remove(display.classList[i]);
        }
      }

      display.classList.add(grClass);
    },
  },

  watch: {
    currentCoords() {
      this.checkIfLocationIsFav();
    },
    currentIcon() {
      this.setGradientFromIcon(this.currentIcon);
    },
  },

  mounted() {
    this.setGradientFromIcon(this.currentIcon);
    this.$adjustCurrentWeather(this.hourlyWeather);
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

    @include media-tablet
      padding-top: $s-l-2

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
