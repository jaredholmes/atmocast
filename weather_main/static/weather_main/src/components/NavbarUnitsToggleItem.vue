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
      this.unitIndicator = this.$store.state.metric ? 'Metric' : 'Imperial';
    },
  },

  beforeMount() {
    this.toggleUnitIndicator();
  }
};
</script>
