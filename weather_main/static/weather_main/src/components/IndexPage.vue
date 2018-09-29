<template lang="html">
  <div>
    <navbar-item></navbar-item>
    <div v-if="$store.state.weather"
    class="main-section"
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
  components: { NavbarItem, DisplayItem, DetailsPaneItem, FooterItem },
  data() {
    return {
      latitude: '',
      longitude: '',
      weatherData: {},
      metricUnits: this.$root._data.$metricUnits,
      currentCity: '',
      loaded: false,
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
    }
  },
  methods: {
    getLocationFailed() {
      alert('Unable to get location. Please type one in the search bar.');
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
      document.getElementById('nav-collapse').classList.remove('show');
    },
    commitWeatherToStore() {
      this.$store.commit({
        type: 'setWeather',
        weatherData: this.weatherData
      });
    },

    // Methods for manipulating weather data
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
      const keyString = ['emperature'];
      const excludeString = ['Time'];
      this.convertValuesByKey(keyString, object, conversionFunction, excludeString);
    },
    convertAllDistanceInObject(object, conversionFunction) {
      const keyString = ['wind', 'visibility'];
      const excludeString = ['Bearing'];
      this.convertValuesByKey(keyString, object, conversionFunction, excludeString);
    },
    convertAll(tempConversion, distanceConversion) {
      // this.convertAllTempsInObject(
      //   this.weatherData.currently,
      //   tempConversion
      // );
      // this.convertAllDistanceInObject(
      //   this.weatherData.currently,
      //   distanceConversion
      // );
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
      if (this.lat) {
        const darkSkyUrl = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/c11e01133c18e01ad3d20c3aeb1a9218/'
        + this.lat.toFixed(6)
        + ','
        + this.lon.toFixed(6);
        const darkSkyParams = {
          'exclude': 'currently,minutely,alerts,flags',
        };

        axios.get(darkSkyUrl, { params: darkSkyParams })
          .then(response => {
            const locationIQUrl = 'https://us1.locationiq.com/v1/reverse.php';
            const locationIQParams = {
              'key': '834b5e16cebecd',
              'lat': this.lat,
              'lon': this.lon,
              'format': 'json',
              'zoom': '10',
            };

            this.weatherData = response.data;
            if (this.metric) {
              this.convertAll(this.$fToC, this.$mToKm);
            } else {
              this.commitWeatherToStore();
            }

            document.getElementById('loading-section').style.display = 'none';

            axios.get(locationIQUrl, { params: locationIQParams })
              .then(response => {
                this.currentCity = response.data.address.city
                || response.data.address.county
                || response.data.address.state_district
                || response.data.address.state
                || response.data.address.country
                || response.data.address;
              });
            // console.log(this.weatherData);
            this.loaded = true;
          })
          .catch((error) => console.log(error));
      } else {
        alert('No location');
      }
    }
  },
  beforeCreate() {
    // axios.get('/data.json')
    //   .then(response => {
    //     this.weatherData = response.data;
    //     if (this.metric) {
    //       this.convertAll(this.$fToC, this.$mToKm);
    //     } else {
    //       this.commitWeatherToStore();
    //     }
    //     axios.get('/location.json')
    //       .then(response => {
    //         this.currentCity = response.data.address.city;
    //       });
    //     console.log(this.weatherData);
    //   })
    //   .catch(() => console.log('error'));
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
        () => this.getLocationFailed()
      )
    } else {
      this.getLocationFailed();
    }
  },
}
</script>

<style lang="css">
</style>
