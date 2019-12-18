<template lang="pug">
  progress-bar
</template>
<script lang="ts">
import ProgressBar from './components/progress-bar.vue'
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  components: {
    ProgressBar
  }
})
export default class Player extends Vue {}
</script>
<style lang="scss" scoped></style>
