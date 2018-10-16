import Vue from 'vue';
import Vuex from 'vuex';

// Vuex config
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    alertMessage: 'An empty message.',
    // For dev server
    // iconLocationPrefix: '/icons/',
    // For website
    iconLocationPrefix: 'static/weather_main/www/static/weather_main/dist/icons/',
    // Required for Cordova app
    // iconLocationPrefix: 'static/weather_main/dist/icons/',
    metric: true,
    weather: {},
    currentWeather: '',
    currentIcon: '',
    currentOffset: '',
    currentCity: '',
    coords: {
      lat: 0,
      lon: 0,
    },
    favLocationExists: false,
    favCoords: {},
    favLocationName: '',
    navbarSearchResults: [],
    displayedCollapseHourly: 0,
    displayedCollapseDaily: 0,
  },
  mutations: {
    setAlertMessage(state, message) {
      state.alertMessage = message.message;
    },
    setIconLocationPrefix(state, prefix) {
      state.iconLocationPrefix = prefix.prefix;
    },
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
    // setCurrentWeather(state, index) {
    //   state.currentWeather = state.weather.hourly.data[index.index];
    // },
    setCurrentWeather(state) {
      state.currentWeather = state.weather.currently;
    },
    setCurrentOffset(state) {
      state.currentOffset = state.weather.offset;
    },
    setCurrentCity(state, city) {
      state.currentCity = city.city;
    },
    setCoords(state, coords) {
      state.coords = coords.coords;
    },
    setFavLocationExists(state, bool) {
      state.favLocationExists = bool.bool;
    },
    setFavCoords(state, coords) {
      state.favCoords = coords.coords;
    },
    unsetFavCoords(state) {
      state.favCoords = {};
    },
    setFavLocationName(state, name) {
      state.favLocationName = name.name;
    },
    unsetFavLocationName(state) {
      state.favLocationName = '';
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
    hourlyWeather: state => {
      return state.weather.hourly.data;
    },
    dailyWeather: state => {
      return state.weather.daily.data;
    },
    currentOffset: state => {
      return state.currentOffset;
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
