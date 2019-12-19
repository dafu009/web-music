<template lang="pug">
  .singer
    router-view
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class index extends Vue {
  @Prop() private show?: boolean
  mounted() {}
}
</script>
<style lang="scss" scoped></style>
