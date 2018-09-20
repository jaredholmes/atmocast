<template lang="html">
  <div>
    <navbar-item></navbar-item>
    <display-item :currentTemp="weatherData.currently.temperature" :currentSummary="weatherData.currently.summary"></display-item>
    <details-pane-item :hourlyData="weatherData.hourly"></details-pane-item>
  </div>
</template>

<script>
import axios from 'axios';
import NavbarItem from './NavbarItem.vue';
import DisplayItem from './DisplayItem.vue';
import DetailsPaneItem from './DetailsPaneItem.vue';

export default {
  name: 'IndexPage',
  components: { NavbarItem, DisplayItem, DetailsPaneItem },
  data() {
    return {
      weatherData: {},
      metricUnits: false,
    };
  },
  methods: {
    getKeysInObject(keyString, object, excludeString) {
      let matchingKeys = [];
      if (!excludeString) {
        excludeString == '';
      }
      const keys = Object.keys(object);
      for (var i = 0; i < keys.length; i++) {
        if (keys[i].indexOf(keyString) >= 0) {
          if (!keys[i].indexOf(excludeString) >= 0) {
            matchingKeys.push(keys[i]);
          }
        }
      }
      return matchingKeys;
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
      const keyString = 'emperature';
      const excludeString = 'Time';
      const conversion = this.$fToC;
      this.convertValuesByKey(keyString, object, conversion, excludeString);
    }
  },
  beforeCreate() {
    axios.get('/data.json')
      .then(response => {
        this.weatherData = response.data;
        if (this.metricUnits) {
          this.convertFToCInObject(this.weatherData.currently);
          for (var i = 0; i < this.weatherData.daily.data.length; i++) {
            this.convertFToCInObject(this.weatherData.daily.data[i])
          }
          for (var i = 0; i < this.weatherData.hourly.data.length; i++) {
            this.convertFToCInObject(this.weatherData.hourly.data[i])
          }
        }
        // // TODO: Add conversions for km/h like what has been done for Celsius
        console.log(this.weatherData);
      })
  }
}
</script>

<style lang="css">
</style>
