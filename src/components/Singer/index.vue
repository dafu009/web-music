<template lang="pug">
  .singer
    transition(name="fade")
      router-view
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class index extends Vue {
  mounted() {}
}
</script>
<style lang="scss" scoped>
.singer {
  position: absolute;
  width: 100%;
}
</style>
