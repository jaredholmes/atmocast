<template lang="html">
  <div
    v-if="favLocation.length > 0"
    id="fav-list"
    class="fav-location-list"
  >
    <h3 class="fav-location-header fw-semi">Favourite locations</h3>
    <ul class="list-group-flush">
      <li v-for="i, x in favLocation" class="list-group-item">
        <img
          v-if="x == 0"
          class="default-fav-selected"
          :src="$store.state.iconLocationPrefix + 'star-filled.png'"
          alt="Set as defualt"
        >
        <img
          v-else
          @click="$reorderFavLocation(x, i.name)"
          class="default-fav"
          :src="$store.state.iconLocationPrefix + 'star-outline.png'"
          alt="Set as defualt"
        >
        <span @click="goToFav(x)" class="fav-location-name">
            {{ i.name }}
        </span>
        <img
          @click="$removeFavLocation(i.name)"
          class="delete-fav"
          :src="$store.state.iconLocationPrefix + 'delete.png'"
          alt="Delete item"
        >
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
    },
    favLocation() {
      return this.$store.state.favLocation;
    }
  },
  methods: {
    goToFav(index) {
      if (navigator.onLine) {
        this.$store.commit({
              type: 'setCoords',
              coords: {
                lat: this.favLocation[index].lat,
                lon: this.favLocation[index].lon,
              }
            })
      } else {
        this.$showConnAlert()
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

    .delete-fav, .default-fav, .default-fav-selected
      max-width: 1em

    .delete-fav:hover, .delete-fav:active, .default-fav:hover, .default-fav:active
      opacity: 0.6

    .default-fav-selected:hover, .default-fav-selected:active
      opacity: 1
      cursor: default

</style>
