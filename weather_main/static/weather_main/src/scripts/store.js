import Vue from 'vue';
import Vuex from 'vuex';

// Vuex config
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    // iconLocationPrefix: 'icons/',
    iconLocationPrefix: 'static/weather_main/dist/icons/',
    metric: true,
    weather: {},
    coords: {
      lat: '',
      lon: '',
    },
    navbarSearchResults: [],
  },
  mutations: {
    toggleMetric(state) {
      if (state.metric) {
        state.metric = false;
      } else {
        state.metric = true;
      }
    },
    setWeather(state, weatherData) {
      state.weather = weatherData.weatherData;
    },
    setCoords(state, coords) {
      state.coords = coords.coords;
    },
    setNavbarSearchResults(state, results) {
      state.navbarSearchResults = results.results;
    },
  },
  getters: {
    currentWeather: state => {
      return state.weather.currently;
    },
    currentIcon: state => {
      return state.weather.currently.icon;
    },
    hourlyWeather: state => {
      return state.weather.hourly.data;
    },
    dailyWeather: state => {
      return state.weather.daily.data;
    },
    latitude: state => {
      return state.coords.lat;
    },
    longitude: state => {
      return state.coords.lon;
    },
  },
});
