<template lang="pug">
  .progress
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import api from '@/api'
@Component({
  components: {}
})
export default class progressBar extends Vue {
  mounted() {
    api.song.getSongUrl({
      params: {
        id: 4875626
      }
    })
  }
}
</script>
<style lang="scss" scoped></style>
