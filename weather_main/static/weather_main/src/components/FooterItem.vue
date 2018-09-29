<template lang="html">
  <footer class="footer row bc-light-accent">
    <div class="col-12 footer-item">
      <a class="footer-link fs-small" href="https://darksky.net/poweredby/">Powered by Dark Sky</a>
    </div>
    <div class="col-12 footer-item">
      <a class="footer-link fs-small" href="https://icons8.com/">Icons by Icons8</a>
    </div>
    <div class="col-12 footer-item">
      <a class="footer-link fs-small" href="https://locationiq.com/">Search by LocationIQ.com</a>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterItem',
}
</script>

<style scoped lang="sass">
  @import "../stylesheets/styles"

  footer.row
    padding: $s-s-4
    margin-top: $s-l-4
    position: relative

    @include media-large
      padding: $s-s-1
</style>
