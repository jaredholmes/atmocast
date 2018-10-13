<template lang="html">
  <div v-if="favLocationName" id="fav-list" class="fav-location-list">
    <h3 class="fav-location-header fw-semi">Favourite locations</h3>
    <ul class="list-group-flush">
      <li @click="$store.commit({
            type: 'setCoords',
            coords: {
              lat: favCoords.lat,
              lon: favCoords.lon,
            }
          })"
        class="list-group-item">
        {{ this.favLocationName }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name : 'FavLocationList',

  computed: {
    favCoords() {
      return this.$store.state.favCoords;
    },
    favLocationName() {
      return this.$store.state.favLocationName;
    }
  }
}
</script>

<style scoped lang="sass">
  @import "../stylesheets/styles"

  .fav-location-list, .fav-location-list *
    transition: background-color 200ms linear

  .fav-location-list
    max-width: 90%
    margin: $s-l-3 auto $s auto

    @include media-tablet
      max-width: 56%

  .fav-location-list.highlighted, .fav-location-list.highlighted *
    background-color: $light-accent

  .fav-location-header
    margin-bottom: $s-s-2

  ul
    padding: 0

  .list-group-item:hover
    background-color: $light-accent-hover
    cursor: pointer

</style>
