<template lang="html">
  <li class="nav-item fw-semi"
    @click="$store.commit('toggleMetric'); toggleUnitIndicator()">
    Units: <span class="unitIndicator">{{ unitIndicator }}</span>
    <!-- <span id="metric-toggle">Metric</span>
    <img class="toggle-units" id="toggle-units-icon" src="/icons/switch-off.png" alt="Metric units">
    <span id="imperial-toggle">Imperial</span> -->
  </li>
</template>

<script>
export default {
  name: 'NavbarUnitsToggleItem',
  data() {
    return {
      unitIndicator: '',
    }
  },
  methods: {
    toggleUnitIndicator() {
      if (this.$store.state.metric) {
        this.unitIndicator = 'Metric';
      } else {
        this.unitIndicator = 'Imperial';
      }
    },
  },
  beforeMount() {
    this.toggleUnitIndicator();
  }
}
</script>

<style lang="sass">
</style>
