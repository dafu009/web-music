<template lang="pug">
  #app
    global-loading
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
        transition(name="fade")
          keep-alive
            router-view
</template>
<script lang="ts">
import Nav from '@/components/Nav/index.vue'
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import GlobalLoading from '@/common/components/GlobalLoading.vue';
@Component({
  components: {
    Nav,
    GlobalLoading
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
#app {
  user-select: none;
  .drawer-content {
    height: 100%;
  }
  .content {
    box-sizing: border-box;
    padding: 60px;
  }
  .drawer_active {
    width: calc(100% - 300px)
  }
  .content-wrap {
    overflow-y: auto;
  }
}
</style>
