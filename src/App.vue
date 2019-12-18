<template lang="pug">
  #app
    vue-drawer-layout(
      ref="drawer"
      :drawer-width="300"
      :drawable-distance="300"
      :enable="true"
      :animatable="true"
      :content-drawable="true"
      :backdrop="false"
      @slide-end="handleSlideEnd"
      toggle="true")
      .drawer-content(slot="drawer" ref="drawerContent")
        Nav
      .content(slot="content" :class="{'drawer_active': drawerShow}")
        keep-alive
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
  @Ref('drawer') readonly drawer!: any
  @Ref('drawerContent') readonly drawerContent!: any
  drawerShow: boolean = true

  mounted() {
    this.drawer.toggle()
  }
  handleSlideEnd(value: boolean) {
    this.drawerShow = value
  }
}
</script>
<style lang="scss">
#app {
  // img::selection {
  //   background: rgba(0, 0, 0, 0);
  // }
  user-select: none;
  .drawer-content {
    height: 100%;
  }
  .drawer_active {
    width: 70%;
  }
  .content-wrap {
    overflow-y: auto;
  }
  .content {
    padding: 60px;
  }
}
</style>
