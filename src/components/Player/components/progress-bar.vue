<template lang="pug">
  .progress-bar
    
</template>
<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import api from '@/api'

@Component
export default class progressBar extends Vue {
  @Prop(Number) readonly percent: number | undefined
  mounted() {
  }
}
</script>
<style lang="scss" scoped></style>
