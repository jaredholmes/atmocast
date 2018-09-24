<template lang="html">
  <div>
    <navbar-item
    :metricUnits="metricUnits"
    :currentIcon="weatherData.currently.icon"
    ></navbar-item>
    <display-item :currentTemp="weatherData.currently.temperature"
    :currentSummary="weatherData.currently.summary"
    :currentCity="currentCity"
    :currentIcon="weatherData.currently.icon"
    ></display-item>
    <details-pane-item :weatherDetails="weatherData.hourly.data"
    :modeHourly="true"
    :metricUnits="metricUnits"
    ></details-pane-item>
    <details-pane-item :weatherDetails="weatherData.daily.data"
    :modeHourly="false"
    :metricUnits="metricUnits"
    ></details-pane-item>
    <footer-item></footer-item>
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
    };
  },
  watch: {
    metricUnits() {
      console.log('changed');
    }
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        console.log('Location: ' + navigator.geolocation.getCurrentPosition());
      } else {
        console.log('Unable to retrieve location.');
      }
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
    convertFToCInObject(object) {
      const keyString = ['emperature'];
      const excludeString = ['Time'];
      const conversion = this.$fToC;
      this.convertValuesByKey(keyString, object, conversion, excludeString);
    },
    convertMtoKmInObject(object) {
      const keyString = ['wind', 'visibility'];
      const excludeString = ['Bearing'];
      const conversion = this.$mToKm;
      this.convertValuesByKey(keyString, object, conversion, excludeString);
    },
    convertAllToMetric() {
      this.convertFToCInObject(this.weatherData.currently);
      this.convertMtoKmInObject(this.weatherData.currently);
      for (var i = 0; i < this.weatherData.daily.data.length; i++) {
        this.convertFToCInObject(this.weatherData.daily.data[i]);
        this.convertMtoKmInObject(this.weatherData.daily.data[i]);
      }
      for (var i = 0; i < this.weatherData.hourly.data.length; i++) {
        this.convertFToCInObject(this.weatherData.hourly.data[i]);
        this.convertMtoKmInObject(this.weatherData.hourly.data[i]);
      }
    }
  },
  watch: {
    latitude() {
      if (this.latitude) {
        // const requestUrl = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/c11e01133c18e01ad3d20c3aeb1a9218/'
        // + this.latitude.toFixed(6)
        // + ','
        // + this.longitude.toFixed(6);
        //
        // axios.get(requestUrl)
        //   .then(response => {
        //     this.weatherData = response.data;
        //     if (this.metricUnits) {
        //       this.convertAllToMetric();
        //     }
        //     axios.get('https://us1.locationiq.com/v1/reverse.php?key=834b5e16cebecd&lat='
        //     + this.latitude
        //     + '&lon='
        //     + this.longitude
        //     + '&format=json')
        //       .then(response => {
        //         this.currentCity = response.data.address.city;
        //       });
        //     console.log(this.weatherData);
        //   })
        //   .catch(() => console.log('error'));
      } else {
        alert('No location');
      }
    }
  },
  beforeCreate() {
    axios.get('/data.json')
      .then(response => {
        this.weatherData = response.data;
        if (this.metricUnits) {
          this.convertAllToMetric();
        }
        axios.get('/location.json')
          .then(response => {
            this.currentCity = response.data.address.city;
          });
        console.log(this.weatherData);
      })
      .catch(() => console.log('error'));
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
        }
      );
    } else {
      console.log('Unable to retrieve location.');
    }
  }
}

// Actual request instead of location.json request
// axios.get('https://us1.locationiq.com/v1/reverse.php?key=834b5e16cebecd&lat='
// + this.weatherData.latitude
// + '&lon='
// + this.weatherData.longitude
// + '&format=json')

</script>

<style lang="css">
</style>
