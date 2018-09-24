<template lang="html">
  <div v-if="searchResults.length > 0" class="row">
    <ul class="list-group">
      <button @click="searchResults = []" class="btn close-search-results fw-semi"type="button" name="button">X</button>
      <li v-for="result in searchResults" @click="getD(result)" class="list-group-item">
        {{ result.display_name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NavbarLocationSearchResults',
  props: ['searchResults'],
  methods: {
    getD(result) {
      console.log(result);
    }
  },
}
</script>

<style scoped lang="sass">
  @import "../stylesheets/styles.sass"

  .row
    height: $s-l-6
    position: absolute

  .row *
    z-index: 1

  .list-group
    max-width: 100%
    height: auto
    overflow-y: scroll
    position: relative

    @include media-large
      max-width: $s-l-6

  .list-group-item
    overflow: visible

  .list-group-item:hover
    cursor: pointer

  .close-search-results
    border: none
    background-color: rgba(0, 0, 0, 0)
    position: sticky
    top: 1em
    text-align: right
    z-index: 2

</style>
