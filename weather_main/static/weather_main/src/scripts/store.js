import Vue from 'vue';
import Vuex from 'vuex';

// Vuex config
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    // For dev server
    // iconLocationPrefix: 'icons/',
    // For production in Django
    iconLocationPrefix: 'static/weather_main/dist/icons/',
    metric: true,
    weather: {},
    currentWeather: '',
    currentIcon: '',
    coords: {
      lat: '',
      lon: '',
    },
    navbarSearchResults: [],
    displayedCollapseHourly: 0,
    displayedCollapseDaily: 0,
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
    setCurrentWeather(state, index) {
      state.currentWeather = state.weather.hourly.data[index.index];
    },
    setCoords(state, coords) {
      state.coords = coords.coords;
    },
    setNavbarSearchResults(state, results) {
      state.navbarSearchResults = results.results;
    },
    setDisplayedCollapseHourly(state, index) {
      state.displayedCollapseHourly = index.index;
    },
    setDisplayedCollapseDaily(state, index) {
      state.displayedCollapseDaily = index.index;
    },
  },
  getters: {
    // currentWeather: state => {
    //   return state.weather.currently;
    // },
    // currentIcon: state => {
    //   return state.weather.currently.icon;
    // },
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
    displayedCollapseHourly: state => {
      return state.displayedCollapseHourly;
    },
    displayedCollapseDaily: state => {
      return state.displayedCollapseDaily;
    },
  },
});
