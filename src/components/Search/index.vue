<template lang="pug">
  .search
    transition(name="fade")
      router-view
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  components: {
  }
})
export default class index extends Vue {}
</script>
<style lang="scss" scoped>
.search {
  position: absolute;
  width: 100%;
}
</style>
