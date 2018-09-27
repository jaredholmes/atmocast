<template lang="html">
  <div v-if="this.searchResults.length > 0" class="row" id="search-results">
    <button @click="hideSearchResults" class="btn close-search-results fw-semi"type="button" name="button">
      <img src="/icons/close.png" alt="">
    </button>
    <ul class="list-group">
      <li v-for="result in searchResults"
      @click="$store.commit({
          type: 'setCoords',
          coords: {
            lat: parseFloat(result.lat),
            lon: parseFloat(result.lon)
          }
        });
        hideSearchResults();"
       class="list-group-item">
        {{ result.display_name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NavbarLocationSearchResults',
  props: ['searchResults'],
  // computed: {
  //   navbarSearchResults() {
  //     return this.$store.state.navbarSearchResults;
  //   },
  // },
  methods: {
    hideSearchResults() {
      document.getElementById('search-results').style.display = 'none';
      document.getElementById('input-location-search').value = '';
      this.$hideNavbarSearchButton();
    }
  },
  created() {
    console.log(this.searchResults)
  }
}
</script>

<style scoped lang="sass">
  @import "../stylesheets/styles.sass"

  .row
    height: $s-l-6
    position: absolute
    left: 0

    @include media-large
      right: 0
      left: auto

  .row *
    z-index: 1

  .list-group
    max-width: 100%
    height: auto
    overflow-y: scroll
    position: relative

    @include media-large
      max-width: $s-l-7

  .list-group-item
    overflow: visible

  .list-group-item:hover
    cursor: pointer
    background-color: $light-accent

  .list-group-item:active
    background-color: $light-accent-hover

  .close-search-results
    border: none
    background-color: rgba(0, 0, 0, 0)
    position: absolute
    top: 3px
    right: 10px
    padding: 0 0.5em
    text-align: left
    margin-left: auto
    z-index: 2

    img
      max-width: 1.5em

</style>
