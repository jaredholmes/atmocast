<template lang="html">
  <li class="nav-item fw-semi"
    @click="$store.commit('toggleMetric'); toggleUnitIndicator()">
    Units: <span class="unitIndicator fw-light">{{ unitIndicator }}</span>
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
