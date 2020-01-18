<template lang="pug">
  #app
    transition(name="fade")
      mv-player
    check
    message
    global-loading
    music-play-list
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
import MusicPlayList from '@/components/MusicPlayList/index.vue'
import GlobalLoading from '@/common/components/GlobalLoading.vue'
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import MvPlayer from '@/components/MvPlayer/index.vue'
import Message from '@/common/components/message.vue'
import Check from './common/components/Check.vue'
import { State, Mutation, Action } from 'vuex-class'
import { CONFIG, UserInfo } from './store/types'
import api from './api'
@Component({
  components: {
    Nav,
    Check,
    Message,
    MvPlayer,
    GlobalLoading,
    MusicPlayList
  }
})
export default class App extends Vue {
  @Ref('drawer') readonly drawer!: any
  @Ref('drawerContent') readonly drawerContent!: any
  @State((state: CONFIG) => state.userInfo) userInfo!: UserInfo

  @Mutation('setGlobalMessage') setGlobalMessage!: Function
  @Mutation('setGlobalMessageShow') setGlobalMessageShow!: Function

  @Action('getLoginStatus') getLoginStatus!: Function
  drawerShow: boolean = true

  async created () {
    await this.getLoginStatus()
      .then(({ isLogin, message }: any) => {
        if (!isLogin) {
          this.setGlobalMessage({
            type: 'warning',
            message
          })
          this.setGlobalMessageShow(true)
        }
      })
  }
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
    position: relative;
    min-height: 100%;
    box-sizing: border-box;
    padding: 60px;
  }
  .drawer_active {
    width: calc(100% - 300px);
  }
  .content-wrap {
    overflow-y: auto;
  }
  .content-wrap::-webkit-scrollbar {
    width: 8px;
    background-color: #fff
  }
  
  .content-wrap::-webkit-scrollbar:horizontal {
    height: 8px;
    background-color: #fff
  }
 
  .content-wrap::-webkit-scrollbar-track {
    background-color: #fff
  }

  .content-wrap::-webkit-scrollbar-thumb {
    background: rgb(146, 181, 255);
    border-radius: 20px;
  }
}
</style>
