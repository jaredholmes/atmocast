<template lang="html">
  <footer class="footer bc-light-accent">
    <div class="footer-top-section row">
      <div class="col-6 row">
        <details class="col-12">
          <summary class="fs-small fw-semi">Attributions</summary>
          <a class="footer-link fs-small c-secondary" href="https://darksky.net/poweredby/">Powered by Dark Sky</a>
          <a class="footer-link fs-small c-secondary" href="https://locationiq.com/">Search by LocationIQ.com</a>
        </details>
        <details class="col-12">
          <summary class="fs-small fw-semi">Contact</summary>
          <a class="footer-link fs-small c-secondary" href="mailto:atmocastweather@gmail.com">Email: atmocastweather@gmail.com</a>
        </details>
        <a class="col-12 footer-link fw-semi fs-small" href="https://atmocast.com/terms-of-use/">Terms of Use</a>
      </div>

      <div class="col-6 footer-right row">
        <a v-if="!$store.state.androidApp" class="col-12 footer-link fs-small" href="/">Atmocast Weather</a>
        <a class="col-12 footer-link fs-small" href="https://atmocast.com/products/">Products</a>
        <a v-if="$store.state.paidUser" class="col-12 footer-link fs-small" href="https://atmocast.com/settings/">Account</a>
        <a v-else class="col-12 footer-link fs-small" href="https://atmocast.com/log-in/">Log In</a>
        <a class="col-12 footer-link fs-small" href="https://atmocast.com/choose-plan/">Upgrade</a>
      </div>
    </div>

    <div v-if="!$store.state.androidApp" class="footer-badges row">
      <a href='https://play.google.com/store/apps/details?id=com.atmocast.app&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img class="badge-img" alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png'/></a>
    </div>

  </footer>
</template>

<script>
export default {
  name: 'FooterItem',
}
</script>
