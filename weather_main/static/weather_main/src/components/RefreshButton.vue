<template lang="html">
  <span @click="$getMainData" id="refresher" class="ml-auto">
    <img class="refresh-icon" :src="$store.state.iconLocationPrefix + 'refresh.png'" alt="refresh">
  </span>
</template>

<script>
export default {
}
</script>

<style scoped lang="sass">
  @import "../stylesheets/styles"

  #refresher
    display: flex
    align-items: center
    padding: 0 $s-s-4

  #refresher.spinning
    animation: spinner 800ms infinite

  img.refresh-icon
    max-height: 1.6em
    max-width: 1.6em

  @keyframes spinner
    from
      transform: rotate(360deg)
</style>
