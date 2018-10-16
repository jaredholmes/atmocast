<template lang="html">
  <footer class="footer row bc-light-accent">
    <details class="col-6">
      <summary class="fs-small fw-semi">Attributions</summary>
      <a class="footer-link fs-small c-secondary" href="https://darksky.net/poweredby/">Powered by Dark Sky</a>
      <a class="footer-link fs-small c-secondary" href="https://locationiq.com/">Search by LocationIQ.com</a>
    </details>
    <a class="col-6 fs-small fw-semi contact-link" href="mailto:jared@colgro.com">Contact the developer</a>
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

  summary
    margin-bottom: $s-s-5

  summary:focus
    outline: none

  .footer-link
    padding-left: $s-s-6
    display: block

  .contact-link
    text-align: right
</style>
