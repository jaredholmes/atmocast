import Vue from 'vue';
import VueRouter from 'vue-router';
import moment from 'moment/min/moment.min';
import localforage from 'localforage';
import axios from 'axios';

import { store } from './store';
import IndexPage from '../components/IndexPage.vue';

// Service worker registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// Router config
Vue.use(VueRouter);

const routes = [
  { path: '', component: IndexPage },
  // For Cordova app
  { path: '*', component: IndexPage },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

if (store.state.isApp && StatusBar) {
  StatusBar.backgroundColorByName('black');
}

// TODO: make start loading and end loading methods

Vue.mixin ({
  methods: {
    // Set different location prefix for app, so that icons can be saved offline
    $setAppIconLocation() {
      if (this.$store.state.isApp) {
        this.$store.commit({
          type: 'setIconLocationPrefix',
          prefix: 'static/weather_main/dist/icons/',
        });
      }
    },
    // Gets all the necessary weather and location data and shows (and hides) loading screen
    // Basically a package of functions to set up the weather UI
    $getMainData() {
      const lat = this.$store.state.coords.lat;
      const lon = this.$store.state.coords.lon;
      const metric = this.$store.state.metric;
      const refresher = document.getElementById('refresher');
      // const mainSection = document.getElementById('main-section');
      const navCollapse  = document.getElementById('nav-collapse');
      const loadingSection = document.getElementById('loading-section');
      const alerts = document.getElementsByClassName('alert');
      const smallScreen = window.innerWidth <= 992 ? true : false;

      // Scroll to top
      window.scrollTo(0, 0);

      if (refresher) {
        refresher.classList.add('spinning');
      }

      // Show that content is loading
      // if (mainSection) {
      //     mainSection.style.opacity = 0.1;
      // }

      if (smallScreen) {
        if (navCollapse) {
          navCollapse.style.display = 'none';
        }
      }

      if (alerts) {
        for (var i = 0; i < alerts.length; i++) {
          alerts[i].style.display = 'none';
        }
      }

      // loadingSection.style.display = 'block';

      // Ensure validity of location. If invalid, set it to the default.
      if (!isNaN(lat) && !isNaN(lon)) {
        // Django URLs
        const darkSkyUrl = '/weather_data/' + lat.toFixed(8) + '/' + lon.toFixed(8) + '/';

        // const darkSkyUrl = '/static/weather_main/www/static/weather_main/dist/data.json';

        axios.get(darkSkyUrl)
          .then(response => {
            const locationIQUrl = '/reverse_geocode/' + lat.toFixed(8) + '/' + lon.toFixed(8) + '/';
            // const locationIQUrl = '/static/weather_main/www/static/weather_main/dist/location.json';

            // Data is in Farenheit by default.
            if (metric) {
              this.$convertAll(response.data, this.$fToC, this.$mToKm, this.$cmToIn);
            } else {
              this.$commitWeatherToStore(response.data);
            }

            // this.$adjustCurrentWeather(this.$store.state.weather.hourly.data);
            this.$adjustCurrentWeather();
            // Set offset to calculate correct time.
            this.$store.commit('setCurrentOffset');

            if (refresher) {
              refresher.classList.remove('spinning');
            }

            // Loading is finished. Hide loading elements and display main UI.
            // if (mainSection) {
            //   mainSection.style.opacity = 1;
            // }

            if (smallScreen) {
              if (navCollapse) {
                navCollapse.style.display = 'block';
                this.$hideCollapse();
              }
            }

            if (alerts) {
              for (var i = 0; i < alerts.length; i++) {
                alerts[i].style.display = 'block';
              }
            }

            loadingSection.style.display = 'none';

            axios.get(locationIQUrl)
              .then(response => {
                let city;
                // LocationIQ displays strange and inaccurate suburb names for South Africa.
                // This checks if the location is within South Africa. If true, the suburb is omitted.
                // Hopefully this is a temporary fix.
                if (
                  -22.1250301 > lat &&
                  lat > -47.1788335 &&
                  38.2898954 > lon &&
                  lon > 16.3335213
                ) {
                  city = response.data.address.city ||
                  response.data.address.region ||
                  response.data.address.county ||
                  response.data.address.state_district ||
                  response.data.address.state ||
                  response.data.address.country ||
                  response.data.address;
                } else {
                  city = response.data.address.neighbourhood ||
                  response.data.address.suburb ||
                  response.data.address.village ||
                  response.data.address.town ||
                  response.data.address.city_district ||
                  response.data.address.city ||
                  response.data.address.region ||
                  response.data.address.county ||
                  response.data.address.state_district ||
                  response.data.address.state ||
                  response.data.address.country ||
                  response.data.address;
                }

                this.$store.commit({
                  type: 'setCurrentCity',
                  city: city,
                });
              });
          });
          // .catch((error) => console.log(error));
      } else {
        this.$setDefaultLocation();
      }
    },
    // Gets the user's position, falls back on setting the default position.
    // if alertUser is true, the user will be notified if their position cannot be detected.
    $getPosition(alertUser, reload) {
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
          () => {
            this.$setLocationToFav(alertUser);
          }
        );
      }

      // Used on first load to circumvent bug with location request in app.
      // Without this, the app won't get the location the first time the user visits the app, if location permission is granted.
      // The downside is that it also reloads if the user denies, causing the app to ask twice for location access
      if (this.$store.state.isApp && reload) {
        location.reload()
      }
    },
    // If the user has visited the site, attempt to get their position.
    // This prevents a location request on the first page load of a user, which is likely to be blocked.
    $setLocation() {
      localforage.getItem('returnVisit')
        .then((value) => {
          // ||this.$store.state.isApp results in the app asking for location permission on the first load, different to the website.
          if (value || this.$store.state.isApp) {
            this.$getPosition();
          } else {
            this.$setLocationToFav();
          }
        });
    },
    // Either sets the location to a saved favourite or to the default.
    // Optional boolean argument can be passed to alert the user that their location cannot be retrieved
    $setLocationToFav(alertUser) {
      // if (this.$store.state.favLocationExists) {
      //   const favCoords = this.$store.state.favCoords;
      //   this.$setDefaultLocation(favCoords.lat, favCoords.lon);
      // } else {
      //   this.$setDefaultLocation();
      // }
      if (this.$store.state.favLocationExists) {
        const favLocation = this.$store.state.favLocation[0];
        this.$setDefaultLocation(favLocation.lat, favLocation.lon);
      } else {
        this.$setDefaultLocation();
      }

      if (alertUser === true) {
        if (this.$store.state.isApp) {
          this.$showAlert('Unable to get your location. Please restart the app or check location permissions.', 15000);
        } else {
          this.$showAlert('Unable to get your location. Please check the location settings of your device or browser.', 15000);
        }
      }
    },
    // Set location to specific or default location
    $setDefaultLocation(lat, lon) {
      // Default location to New York City
      if (!lat) {
        lat = 40.7900869;
      }

      if (!lon) {
        lon = -73.959829;
      }
      this.$store.commit({
        type: 'setCoords',
        coords: {
          lat: lat,
          lon: lon,
        }
      });
    },
    // Check IndexedDB for favourite co-ordinates and set favLocationExists accordingly.
    $checkFavLocation() {
      if (this.$store.state.proUser) {
        this.$getFavLocations();
      } else {
        let exists = false;
        localforage.getItem(
          'favLocation', (err, value) => {
            if (value) {
              if (value.length > 0) {
                exists = true;
                for (var i = 0; i < value.length; i++) {
                  this.$store.commit({
                    type: 'setFavLocation',
                    lat: value[i].lat,
                    lon: value[i].lon,
                    name: value[i].name,
                  });
                }
              }
            }

            this.$store.commit({
              type: 'setFavLocationExists',
              bool: exists,
            });

            this.$setLocation();
          }
        );
      }

    },
    $addFavLocation(lat, lon, locationName) {
      // Set fav co-ordinates
      if (navigator.onLine) {
        this.$store.commit({
          type: 'setFavLocation',
          lat: lat,
          lon: lon,
          name: locationName,
        });

        if (this.$store.state.proUser) {
          this.$showAlert('Favourited ' + locationName);
          this.$putFavLocations(this.$store.state.favLocation);
        } else {
          this.$showAlert('Favourited ' + locationName);
          localforage.setItem('favLocation', this.$store.state.favLocation);
        }

        this.$store.commit({
          type: 'setCurrentIsFav',
          bool: true,
        });
      } else {
        this.$showConnAlert();
      }
    },
    $removeFavLocation(locationName) {
      if (navigator.onLine) {
        // Unset fav co-ordinates
        this.$store.commit('unsetFavLocation', locationName);

        if (this.$store.state.proUser) {
          this.$showAlert('Unfavourited ' + locationName);
          this.$putFavLocations(this.$store.state.favLocation);
        } else {
          this.$showAlert('Unfavourited ' + locationName);
          localforage.setItem('favLocation', this.$store.state.favLocation);
        }

        this.$store.commit({
          type: 'setCurrentIsFav',
          bool: false,
        });
      } else {
        this.$showConnAlert();
      }
  },
  $checkMetric() {
    localforage.getItem('metric')
      .then((value) => {
        let bool;
        if (value === false) {
          bool = value;
        } else {
          bool = true;
        }

        this.$store.commit({
          type: 'setMetric',
          bool: bool,
        });
      });
    },
    $showLocationAlert() {
      const alert = document.getElementById('alert-location');
      if (alert) {
        alert.classList.add('shown');
        window.setTimeout(
          () => alert.classList.remove('shown'),
          8000);
      }
    },
    $showConnAlert() {
      this.$showAlert('Unable to connect to the internet. Please try again later.');
    },
    $hideCollapse() {
      document.getElementById('nav-collapse').classList.remove('active');
    },
    $focusLocationSearch() {
      document.getElementById('nav-menu-toggler').click();
      document.getElementById('input-location-search').focus();
    },
    $commitWeatherToStore(weatherObj) {
      if (weatherObj) {
        this.$store.commit({
          type: 'setWeather',
          weatherData: weatherObj
        });
      } else {
        throw 'No weather object given as argument';
      }
    },
    // Methods for manipulating weather data

    // Gets the keys from an object which contain substrings matching any of the items in the keyString argument, and excludes any of the strings matching the excludeString argument
    $getKeysInObject(keyString, object, excludeString) {
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
    $convertValuesInObject(keyArray, object, conversionFunction) {
      for (var i = 0; i < keyArray.length; i++) {
        object[keyArray[i]] = conversionFunction(object[keyArray[i]]);
      }
    },
    $convertValuesByKey(keyString, object, conversionFunction, excludeString) {
      const keyArray = this.$getKeysInObject(keyString, object, excludeString);
      this.$convertValuesInObject(keyArray, object, conversionFunction);
    },
    $convertAllTempsInObject(object, conversionFunction) {
      const keyString = ['temperature', 'Temperature', 'dewPoint'];
      const excludeString = ['Time'];
      this.$convertValuesByKey(keyString, object, conversionFunction, excludeString);
    },
    $convertAllLongDistanceInObject(object, conversionFunction) {
      const keyString = ['wind', 'visibility'];
      const excludeString = ['Bearing'];
      this.$convertValuesByKey(keyString, object, conversionFunction, excludeString);
    },
    $convertAllShortDistanceInObject(object, conversionFunction) {
      const keyString = ['precipIntensity'];
      const excludeString = [' '];
      this.$convertValuesByKey(keyString, object, conversionFunction, excludeString);
    },
    $convertAll(weatherObj, tempConversion, longDistanceConversion, shortDistanceConversion) {
      if (weatherObj) {
        for (var i = 0; i < weatherObj.daily.data.length; i++) {
          this.$convertAllTempsInObject(
            weatherObj.daily.data[i],
            tempConversion
          );
          this.$convertAllLongDistanceInObject(
            weatherObj.daily.data[i],
            longDistanceConversion
          );
          this.$convertAllShortDistanceInObject(
            weatherObj.daily.data[i],
            shortDistanceConversion
          );
        }

        for (var i = 0; i < weatherObj.hourly.data.length; i++) {
          this.$convertAllTempsInObject(
            weatherObj.hourly.data[i],
            tempConversion
          );
          this.$convertAllLongDistanceInObject(
            weatherObj.hourly.data[i],
            longDistanceConversion
          );
          this.$convertAllShortDistanceInObject(
            weatherObj.hourly.data[i],
            shortDistanceConversion
          );
        }


        this.$convertAllTempsInObject(
          weatherObj.currently,
          tempConversion
        );
        this.$convertAllLongDistanceInObject(
          weatherObj.currently,
          longDistanceConversion
        );
        this.$convertAllShortDistanceInObject(
          weatherObj.currently,
          shortDistanceConversion
        );

        this.$commitWeatherToStore(weatherObj);
      } else {
        throw 'No weather object given as argument';
      }
    },
    $showAlert(message, duration) {
      if (message) {
        const alert = document.getElementById('alert-main');

        this.$store.commit({
          type: 'setAlertMessage',
          message: message,
        });

        alert.classList.add('shown');

        window.setTimeout(
          this.$hideAlert,
          duration || 6000);
      } else {
        throw 'No alert message given';
      }
    },
    $hideAlert(id) {
      let alert;
      if (id) {
        alert = document.getElementById(id);
      } else {
        alert = document.getElementById('alert-main');
      }
      alert.classList.remove('shown');
    },
    $hideNavbarSearchButton() {
      const searchBtn = document.getElementsByClassName('btn-location-search');
      const searchInput = document.getElementById('input-location-search');
      for (var i = 0; i < searchBtn.length; i++) {
        searchBtn[i].style.opacity = '0';
        searchBtn[i].style.visibility = 'hidden';
      }
      if (window.innerWidth >= 992) {
        searchInput.style.left = '10em';
      }
    },
    $hideSearchResults() {
      const searchResults = document.getElementById('search-results');
      const input = document.getElementById('input-location-search');
      if (searchResults) {
        searchResults.style.display = 'none';
      }

      if (input) {
        input.value = '';
      }

      this.$hideNavbarSearchButton();
    },
    $removeCardsColor(isModeHourly) {
      let cardClass;
      const colorClass = 'bc-light-accent';

      if (isModeHourly) {
        cardClass = document.getElementsByClassName('inner-hourly ' + colorClass);
      } else {
        cardClass = document.getElementsByClassName('inner-daily ' + colorClass);
      }

      for (var i = 0; i < cardClass.length; i++) {
        cardClass[i].classList.remove(colorClass);
      }
    },
    $weatherHourMatchesCurrent(unixTime) {
      const currentHourDay = moment().format('H, D');
      moment.unix(unixTime);
      if (moment.unix(unixTime).format('H, D') === currentHourDay) {
        return true;
      } else {
        return false;
      }
    },
    // $adjustCurrentWeather(hourlyData) {
      // if (this.$weatherHourMatchesCurrent(hourlyData[0].time)) {
      //   this.$store.commit({
      //     type: 'setCurrentWeather',
      //     index: 0,
      //   });
      // }
    // },
    $adjustCurrentWeather() {
      this.$store.commit('setCurrentWeather');
    },
    $getFavLocations() {
      let exists = false;

      const getURL = '/rest/location-list/' + this.$store.state.userID + '/';
      axios.get(
        getURL,
        { headers: {
          // CSRF Token is set in script tag in template. It prevents 403 status code
          'X-CSRFToken': this.$store.state.csrf,
          }
        }
      )
      .then(response => {
        if (response.data) {
          const locations = response.data.locations;
          if (locations.length > 0) {
            exists = true;
            for (var i = 0; i < locations.length; i++) {
              this.$store.commit({
                type: 'setFavLocation',
                lat: locations[i].lat,
                lon: locations[i].lon,
                name: locations[i].name,
              });
            }
          }

          this.$store.commit({
            type: 'setFavLocationExists',
            bool: exists,
          });

          this.$setLocation();
        }
      });
    },
    $putFavLocations(locations) {
      const putURL = '/rest/location-list/' + this.$store.state.userID + '/';
      // const jsonLocations = JSON.stringify({'locations' : locations});
      axios.put(
        putURL,
        { params: {'locations': locations} },
        { headers: {
          // CSRF Token is set in script tag in template. It prevents 403 status code
          'X-CSRFToken': this.$store.state.csrf,
          }
        }
      );
    },
    $momentAddDays(days) {
      if (days <= 0) {
        return 'Today';
      } else if (days === 1) {
        return 'Tomorrow';
      } else {
        return moment().add(days, 'days').format('dddd');
      }
    },
    $momentOffsetTime(time ,offset) {
      const utc = moment.utc(moment.unix(time));
      const offsetTime = moment(utc).add(offset, 'h');
      return moment(offsetTime).format('HH:mm');
    },
    // Imperial to metric conversions
    $fToC(f) {
      return (f - 32) * 5/9;
    },
    $mToKm(m) {
      return m * 1.609344;
    },
    $inToCm(i) {
      return i * 2.54 ;
    },
    // Metric to imperial conversions
    $cToF(c) {
      return c * 9/5 + 32;
    },
    $kmToM(km) {
      return km / 1.609344;
    },
    $cmToIn(cm) {
      // return cm / 0.3937 ;
      return cm / 2.54 ;
    },
  }
});

new Vue({
  el: '#app',
  router,
  store,
}).$mount('#app');
