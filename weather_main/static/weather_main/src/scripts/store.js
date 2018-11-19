import Vue from 'vue';
import Vuex from 'vuex';
import localforage from 'localforage';

// Vuex config
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    androidApp: androidApp,
    paidUser: paidUser,
    proUser: proUser,
    userID: userID,
    csrf: csrf,
    favLimit: 1,
    alertMessage: 'An empty message.',
    showNavBrand: false,
    // For website
    iconLocationPrefix: window.location.origin + '/static/weather_main/www/static/weather_main/dist/icons/',
    metric: true,
    weather: {},
    currentWeather: '',
    currentIcon: '',
    currentOffset: '',
    currentCity: '',
    currentIsFav: false,
    coords: {
      lat: 0,
      lon: 0,
    },
    favLocationExists: false,
    favCoords: {},
    favLocationName: '',
    favLocation: [],
    navbarSearchResults: [],
    displayedCollapseHourly: 0,
    displayedCollapseDaily: 0,
  },
  mutations: {
    setFavLimit(state, limit) {
      this.state.favLimit = limit.limit;
    },
    setAlertMessage(state, message) {
      state.alertMessage = message.message;
    },
    setShowNavBrand(state, bool) {
      state.showNavBrand = bool.bool;
    },
    setIconLocationPrefix(state, prefix) {
      state.iconLocationPrefix = prefix.prefix;
    },
    setMetric(state, bool) {
      state.metric = bool.bool
      localforage.setItem('metric', bool.bool);
    },
    toggleMetric(state) {
      if (state.metric) {
        store.commit({
          type: 'setMetric',
          bool: false
        });
      } else {
        store.commit({
          type: 'setMetric',
          bool: true
        });
      }
    },
    setWeather(state, weatherData) {
      state.weather = weatherData.weatherData;
    },
    setCurrentWeather(state) {
      state.currentWeather = state.weather.currently;
    },
    setCurrentOffset(state) {
      state.currentOffset = state.weather.offset;
    },
    setCurrentCity(state, city) {
      state.currentCity = city.city;
    },
    setCurrentIsFav(state, bool) {
      state.currentIsFav = bool.bool;
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
    setFavLocation(state, lat, lon, name) {
      const favLocation = {
        lat: lat.lat,
        lon: lat.lon,
        name: lat.name,
      };

      state.favLocation.push(favLocation);
    },
    unsetFavLocation(state, locationName) {
      let favLocation = state.favLocation;

      for (var i = 0; i < favLocation.length; i++) {
        if (favLocation[i].name == locationName) {
          favLocation.splice(i, 1);
        }
      }

      state.favLocation = favLocation;
    },
    reOrderFavLocation(state, index) {
      const i = index.index;
      const item = state.favLocation.splice(i, 1)[0];
      state.favLocation.unshift(item);
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
      return state.weather.hourly ? state.weather.hourly.data : [];
    },
    dailyWeather: state => {
      return state.weather.daily ? state.weather.daily.data : [];
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
