<template lang="html">
  <div v-if="favLocationName" id="fav-list" class="fav-location-list">
    <h3 class="fav-location-header fw-semi">Favourite locations</h3>
    <ul class="list-group-flush">
      <li class="list-group-item">
        <span @click="goToFav"
            class="fav-location-name"
        >
            {{ favLocationName }}
        </span>
        <img @click="$removeFavLocation(favLocationName)"
        class="delete-fav"
        :src="$store.state.iconLocationPrefix + 'delete.png'"
        alt="Delete item">
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
  },
  methods: {
    goToFav() {
      if (navigator.onLine) {
        this.$store.commit({
              type: 'setCoords',
              coords: {
                lat: favCoords.lat,
                lon: favCoords.lon,
              }
            })
      } else {
        this.$showAlert('Unable to connect to the internet.')
      }
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

  .list-group-item
    display: flex
    align-items: center
    justify-content: space-between

    .fav-location-name
      min-width: 80%

    .delete-fav
      max-width: 1em

    .delete-fav:hover, .delete-fav:active
      opacity: 0.6

</style>
