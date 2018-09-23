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
          <li class="nav-item"><a href="#" class="nav-link fw-semi"
            @click="toggle">
            Units:
            <span id="metric-toggle">Metric</span>
            <img class="toggle-units" id="toggle-units-icon" src="/icons/switch-off.png" alt="Metric units">
            <span id="imperial-toggle">Imperial</span>
          </a></li>
          <!-- <li class="nav-item"><a href="#" class="nav-link c-pro-red  fw-semi">Go Pro</a></li> -->
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavbarItem',
  props: ['metricUnits'],
  data() {
    return {
      t: true,
    }
  },
  methods: {
    toggle() {
      // TODO: Figure out how to globally manipulate metrcUnits variable/prop
      // Clean this code
      if (this.metricUnits) {
        document.getElementById('toggle-units-icon').src = '/icons/switch-on.png';
        document.getElementById('imperial-toggle').classList.add('toggle-active');
        document.getElementById('metric-toggle').classList.remove('toggle-active');
        this.metricUnits = false;
      } else {
        document.getElementById('toggle-units-icon').src = '/icons/switch-off.png';
        document.getElementById('imperial-toggle').classList.remove('toggle-active');
        document.getElementById('metric-toggle').classList.add('toggle-active');
        this.metricUnits = true;
      }
    }
  }
}
</script>

<style scoped lang="sass">
  @import "../stylesheets/styles"

  nav
    padding: 0
    background-color: $sunny-blue
    // Prevents thin white line between nav and main section
    padding-bottom: $s + 1px

  .nav-wrapper
    width: 100%
    margin: 0

  .navbar-brand
    min-width: 75%

    @include media-large
      min-width: 0

  .navbar-collapse
    text-align: right
    background-color: $light
    float: right
    padding-right: $s-s-3

    @include media-large
      background-color: $sunny-blue

  .nav-item
    padding: $s-s-6

  .nav-link:hover
    // text-decoration: underline

  .toggle-active
    text-decoration: underline

  .navbar-toggler
    padding-right: $s-s-1

  .icon-menu
    max-width: $s-s-2
</style>
