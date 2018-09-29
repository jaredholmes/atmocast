<template lang="html">
  <li class="nav-item">
    <form @submit="preventDefaultSubmit" class="form-inline row" id="location-search-form">
      <input v-model="searchQuery" @focus="showSearchBtn" @blur="hideSearchBtn" class="col-6 col-md-3 col-lg-9 form-control location-search-input" id="input-location-search" type="search" placeholder="Change location" aria-label="Change location">
      <button @click="getSearchResults" class="col-2 col-lg-3 btn btn-location-search" id="btn-navbar-search" type="button" name="button">
        <img :src="$store.state.iconLocationPrefix + 'search.png'" alt="Search for a location">
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
      const searchInput = document.getElementById('input-location-search');
      const searchBtn = document.getElementById('btn-navbar-search');
      searchBtn.style.visibility = 'visible';
      searchBtn.style.opacity = '1';
      searchInput.style.left = '0';
    },
    hideSearchBtn() {
      this.searchResults = [];
      if (this.searchQuery === '') {
        this.$hideNavbarSearchButton();
      }
    },
    getSearchResults() {
      if (this.searchQuery) {
        const requestUrl = 'https://us1.locationiq.com/v1/search.php?key='
        + '834b5e16cebecd&q='
        + this.searchQuery
        + '&format=json'
        axios.get(requestUrl)
          .then(response => {
            this.searchResults = response.data;
          })
      }
    }
  },
};
</script>

<style scoped lang="sass">
  @import "../stylesheets/styles"

  .location-search-input
    background-color: rgba(0, 0, 0, 0)
    transition: background-color 300ms linear, left 250ms
    -webkit-transition: background-color 300ms linear, left 250ms
    -ms-transition: background-color 300ms linear, left 250ms
    border: none
    padding: 0
    position: relative

    @include media-large
      left: 4.5em
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
    padding: 0
    border: none
    background-color: rgba(0, 0, 0, 0)

    @include media-large
    img
      max-width: 1.5em

    img:hover
      opacity: 0.6
</style>
