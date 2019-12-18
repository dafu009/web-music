<template lang="pug">
  #app
    vue-drawer-layout(
      ref="drawer"
      :drawer-width="300"
      :enable="true"
      :animatable="true"
      :content-drawable="true"
      :backdrop="false"
      toggle="true")
      .drawer-content(slot="drawer")
        Nav
      .content(slot="content")
        router-view
</template>
<script lang="ts">
import Nav from '@/components/Nav/index.vue'
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
@Component({
  components: {
    Nav
  }
})
export default class App extends Vue {
  @Ref('drawer') readonly drawer!: HTMLDivElement
  drawerShow: number = 0
  mounted () {
    this.drawer.toggle()
  }
}
</script>
<style lang="scss">
#app .content-wrap {
  overflow-y: auto
}
</style>
