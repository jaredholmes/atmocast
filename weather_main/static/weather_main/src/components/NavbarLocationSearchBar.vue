<template lang="html">
  <li @blur="hideSearchBtn" id="nav-item-search" class="nav-item">
    <form @submit="preventDefaultSubmit" class="form-inline" id="location-search-form">
      <input v-model="searchQuery" @focus="showSearchBtn" class="form-control location-search-input" id="input-location-search" type="search" placeholder="Change location" aria-label="Change location">
      <button @click="getSearchResults" class="btn btn-location-search" id="btn-navbar-search" type="button" name="button">
        <img id="btn-search-icon" :src="$store.state.iconLocationPrefix + 'search.png'" alt="Search for a location">
        <div class="spinner" id="search-loading-spinner">

        </div>
      </button>
      <button @click="$getPosition(true)" class="btn btn-location-search" id="btn-navbar-location" type="button" name="button">
        <img id="btn-location-icon" :src="$store.state.iconLocationPrefix + 'location.png'" alt="Current location">
      </button>
      <button @click="scrollToFavList" class="btn btn-location-search" id="btn-navbar-fav" type="button" name="button">
        <img id="btn-fav-icon" :src="$store.state.iconLocationPrefix + 'heart-filled.png'" alt="Current location">
      </button>
    </form>
    <navbar-location-search-results :searchResults="searchResults"></navbar-location-search-results>
  </li>
</template>

<script>
import axios from 'axios';
import NavbarLocationSearchResults from './NavbarLocationSearchResults.vue';

export default {
  name: 'NavbarLocationSearchBar',

  components: { NavbarLocationSearchResults },

  data() {
    return {
      searchQuery: '',
      searchResults: [],
    }
  },

  methods: {
    // Prevent page from reloading when enter key is pressed, and instead search for locations
    preventDefaultSubmit() {
      event.preventDefault();
      if (this.searchQuery === '') {
        document.getElementById('input-location-search').blur();
      } else {
        this.getSearchResults();
      }
    },
    showSearchBtn() {
      if (navigator.onLine) {
        const searchBtn = document.getElementsByClassName('btn-location-search');
        const searchInput = document.getElementById('input-location-search');
        for (var i = 0; i < searchBtn.length; i++) {
          searchBtn[i].style.visibility = 'visible';
          searchBtn[i].style.opacity = '1';
        }
        searchInput.style.left = '0';
      } else {
        this.$showConnAlert();
      }
    },
    hideSearchBtn() {
      this.searchResults = [];
      if (this.searchQuery === '') {
        this.$hideNavbarSearchButton();
      }
    },
    getSearchResults() {
      if (this.searchQuery) {
        const searchIcon = document.getElementById('btn-search-icon');
        const searchSpinner = document.getElementById('search-loading-spinner');
        const searchResults = document.getElementById('search-results');
        searchIcon.style.visibility = 'hidden';
        searchSpinner.style.display = 'block';
        const requestUrl = 'https://atmocast.com/geocode/' + this.searchQuery + '/';
        axios.get(requestUrl)
          .then(response => {
            this.searchResults = response.data;
            searchSpinner.style.display = 'none';
            searchIcon.style.visibility = 'visible';
            if (searchResults) {
              searchResults.style.display = 'flex';
            }
          })
      }
    },
    scrollToFavList() {
      const favList = document.getElementById('fav-list');
      if (favList) {
        favList.scrollIntoView();

        window.setTimeout(
          () => favList.classList.add('highlighted'),
          150
        );

        window.setTimeout(
          () => favList.classList.remove('highlighted'),
          1000
        );
      } else {
        this.$showAlert("You don't have any favourite locations yet. Add one by clicking the heart next to the location name.");
      }
    },
  },
};
</script>

<style scoped lang="sass">
  @import "../stylesheets/styles"

  #nav-item-search

    @include media-large
      margin-left: 0

  .location-search-input
    background-color: rgba(0, 0, 0, 0)
    transition: background-color 300ms ease-in, left 250ms ease-in
    -webkit-transition: background-color 300ms ease-in, left 250ms ease-in
    -ms-transition: background-color 300ms ease-in, left 250ms ease-in
    border: none
    padding: 0
    position: relative
    max-width: 50%

    @include media-large
      left: 10em
      padding: $s-s-6
      max-width: 75%

  .location-search-input:hover
    cursor: pointer

  .location-search-input::placeholder
    color: $text-primary
    font-weight: 500
    text-align: left
    transition: left 0.25s
    -webkit-transition: left 0.25s
    -ms-transition: left 0.25s

    @include media-large
      text-align: left

  .location-search-input:focus
    background-color: $light
    box-shadow: none
    left: 0

  .location-search-input:focus:hover
    cursor: text

  .location-search-input:focus::placeholder
    color: $text-secondary
    font-weight: 300

  .btn-location-search
    max-width: 3em
    visibility: hidden
    opacity: 0
    transition: opacity 800ms
    -webkit-transition: opacity 800ms
    -ms-transition: opacity 800ms
    padding: $s-s-6
    position: relative
    border: none
    background-color: rgba(0, 0, 0, 0)

    img
      max-width: 1.5em

    img:hover
      opacity: 0.6

    #search-loading-spinner
      display: none

    #search-loading-spinner:before
      top: 8px
      left: 5px
      z-index: 50000
      width: $s-s-2
      height: $s-s-2
      margin: 0
</style>
