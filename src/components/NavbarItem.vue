<template lang="html">
  <nav class="navbar navbar-expand-lg">
    <div class="nav-wrapper row">
      <a href="/" class="navbar-brand col-6 fw-semi fs-large">Simple Weather</a>
      <button class="ml-auto navbar-toggler col-1 offset-5" data-toggle="collapse" data-target="#nav-collapse" aria-controls="nav-collapse" aria-expanded="false" aria-label="Toggle navigation">
        <img class="icon icon-menu" src="/icons/menu.png" alt="">
      </button>
      <div id="nav-collapse" class="collapse navbar-collapse ml-auto">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item"><a href="#" class="nav-link fw-semi">Change Location</a></li>
          <li class="nav-item"><a href="#" class="nav-link fw-semi">Units</a></li>
          <li class="nav-item"><a href="#" class="nav-link fw-semi c-pro-red">Go Pro</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavbarItem',
}
</script>

<style scoped lang="sass">
  @import "../stylesheets/styles"

  nav
    padding: 0
    // max-height: $s
    background-color: $sunny-blue
    // Prevents thin white line between nav and main section
    padding-bottom: $s + 1px

  .nav-wrapper
    width: 100%
    margin: 0

  .navbar-brand
    min-width: 75%

  .navbar-collapse
    text-align: right
    background-color: $light
    // max-width: 67%
    float: right
    padding-right: $s-s-3

    @include media-large
      background-color: $sunny-blue

  .nav-link:hover
    text-decoration: underline

  .navbar-toggler
    padding-right: $s-s-1

  .icon-menu
    max-width: $s-s-2
</style>
