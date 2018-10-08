<template lang="html">
  <div>
    <navbar-item></navbar-item>
    <div v-if="weatherData"
    id="main-section"
    @click="hideCollapse();
    $hideNavbarSearchButton();"
    >
      <display-item :currentCity="currentCity"></display-item>
      <details-pane-item :modeHourly="true"></details-pane-item>
      <details-pane-item :modeHourly="false"></details-pane-item>
      <!-- Fix this -->
      <details-pane-item style="display: none;" :w="weatherData.daily.data[0]"></details-pane-item>
      <footer-item></footer-item>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import NavbarItem from './NavbarItem.vue';
import DisplayItem from './DisplayItem.vue';
import DetailsPaneItem from './DetailsPaneItem.vue';
import FooterItem from './FooterItem.vue';

export default {
  name: 'IndexPage',

  components: {
    NavbarItem,
    DisplayItem,
    DetailsPaneItem,
    FooterItem
  },

  data() {
    return {
      weatherData: {},
      currentCity: '',
    };
  },

  computed: {
    metric() {
      return this.$store.state.metric;
    },
    lat() {
      return this.$store.state.coords.lat;
    },
    lon() {
      return this.$store.state.coords.lon;
    },
  },

  methods: {
    // This method gets all the necessary weather and location data and interacts with the store where necessary
    getMainData() {
      // Show that content is loading
      const mainSection = document.getElementById('main-section');
      const loadingSection = document.getElementById('loading-section')
      if (mainSection) {
          mainSection.style.opacity = 0.1;
      }
      loadingSection.style.display = 'block';

      if (this.lat) {
        const darkSkyUrl = '/weather_data/' + this.lat.toFixed(8) + '/' + this.lon.toFixed(8) + '/';

        axios.get(darkSkyUrl)
          .then(response => {
            const locationIQUrl = '/reverse_geocode/' + this.lat.toFixed(8) + '/' + this.lon.toFixed(8) + '/'

            this.weatherData = response.data;
            if (this.metric) {
              this.convertAll(this.$fToC, this.$mToKm)
            } else {
              this.commitWeatherToStore();
            }

            this.$adjustCurrentWeather(this.$store.state.weather.hourly.data);
            this.$store.commit('setCurrentOffset');

            if (mainSection) {
              mainSection.style.opacity = 1;
            }
            loadingSection.style.display = 'none';

            axios.get(locationIQUrl)
              .then(response => {
                // LocationIQ displays strange and inaccurate suburb names for South Africa.
                // This checks if the location is within South Africa. If true, the suburb is omitted.
                // Hopefully this is a temporary fix.
                if (
                  -22.1250301 > this.lat
                  && this.lat > -47.1788335
                  && 38.2898954 > this.lon
                  && this.lon > 16.3335213
                ) {
                  this.currentCity = response.data.address.city
                  || response.data.address.region
                  || response.data.address.county
                  || response.data.address.state_district
                  || response.data.address.state
                  || response.data.address.country
                  || response.data.address;
                } else {
                  this.currentCity = response.data.address.neighbourhood
                  || response.data.address.suburb
                  || response.data.address.village
                  || response.data.address.town
                  || response.data.address.city_district
                  || response.data.address.city
                  || response.data.address.region
                  || response.data.address.county
                  || response.data.address.state_district
                  || response.data.address.state
                  || response.data.address.country
                  || response.data.address;
                }
              });
            // console.log(this.weatherData); // For debugging
          })
          // .catch((error) => console.log(error));
      } else {
        this.setDefaultLocation();
      }
    },
    getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.$store.commit({
              type: 'setCoords',
              coords: {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
              }
            });
          },
          () => this.setDefaultLocation()
        )
      } else {
        this.setDefaultLocation();
      }
    },
    setDefaultLocation() {
      // Default location to New York City
      this.$store.commit({
        type: 'setCoords',
        coords: {
          lat: 40.7900869,
          lon: -73.959829,
        }
      });
    },
    hideCollapse() {
      document.getElementById('nav-collapse').classList.remove('active');
    },
    commitWeatherToStore() {
      this.$store.commit({
        type: 'setWeather',
        weatherData: this.weatherData
      });
    },
    // Methods for manipulating weather data
    // Gets the keys from an object which contain substrings matching any of the items in the keyString argument, and excludes any of the strings matching the excludeString argument
    getKeysInObject(keyString, object, excludeString) {
      const keys = Object.keys(object);
      let matchingKeys = [];
      let matchingKeysExclude =[];

      for (var a = 0; a < keyString.length; a++) {
        for  (var b = 0; b < keys.length; b++) {
           if (keys[b].indexOf(keyString[a]) >= 0) {
             matchingKeys.push(keys[b]);
           }
        }
      }

      if (excludeString) {
        for (var c = 0; c < matchingKeys.length; c++) {
          for (var d= 0; d < excludeString.length; d++) {
            if (matchingKeys[c].indexOf(excludeString[d]) < 0) {
              matchingKeysExclude.push(matchingKeys[c]);
            }
          }
        }
        return matchingKeysExclude;
      } else {
        return matchingKeys;
      }
    },
    convertValuesInObject(keyArray, object, conversionFunction) {
      for (var i = 0; i < keyArray.length; i++) {
        object[keyArray[i]] = conversionFunction(object[keyArray[i]]);
      }
    },
    convertValuesByKey(keyString, object, conversionFunction, excludeString) {
      const keyArray = this.getKeysInObject(keyString, object, excludeString);
      this.convertValuesInObject(keyArray, object, conversionFunction);
    },
    convertAllTempsInObject(object, conversionFunction) {
      const keyString = ['temperature', 'Temperature',];
      const excludeString = ['Time'];
      this.convertValuesByKey(keyString, object, conversionFunction, excludeString);
    },
    convertAllDistanceInObject(object, conversionFunction) {
      const keyString = ['wind', 'visibility'];
      const excludeString = ['Bearing'];
      this.convertValuesByKey(keyString, object, conversionFunction, excludeString);
    },
    convertAll(tempConversion, distanceConversion) {
      for (var i = 0; i < this.weatherData.daily.data.length; i++) {
        this.convertAllTempsInObject(
          this.weatherData.daily.data[i],
          tempConversion
        );
        this.convertAllDistanceInObject(
          this.weatherData.daily.data[i],
          distanceConversion
        );
      }

      for (var i = 0; i < this.weatherData.hourly.data.length; i++) {
        this.convertAllTempsInObject(
          this.weatherData.hourly.data[i],
          tempConversion
        );
        this.convertAllDistanceInObject(
          this.weatherData.hourly.data[i],
          distanceConversion
        );
      }

      this.commitWeatherToStore();
    }
  },

  watch: {
    currentCity() {
      document.title = 'Weather in ' + this.currentCity + ' – Atmocast';
    },
    metric() {
      if (this.metric) {
        this.convertAll(this.$fToC, this.$mToKm);
      } else {
        this.convertAll(this.$cToF, this.$kmToM);
      }
    },
    weatherData() {
      this.commitWeatherToStore();
    },
    lat() {
      // lat changes when the location is set, which makes it a good time to fetch the main data
      this.getMainData();
    }
  },
  beforeCreate() {
    // For PWA, to ensure that data does not become too outdatedz
    // Check every second if the weather data may be outdated. If so, refresh the page.
    window.setInterval(
      () => {
        const weatherHour = this.$store.getters.hourlyWeather[0].time
        if (!this.$weatherHourMatchesCurrent(weatherHour)) {
          this.getCurrentLocation();
          this.getMainData();
        }
      },
      1000
    );
  },
  created() {
    this.getCurrentLocation();
  }
};
</script>
