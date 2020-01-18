<template lang="pug">
.drawer
  .mask(@click.stop="close")
  transition(name="slide")
    .maincontent(v-if="drawerShow")
      .header
        span.title 播放列表
        span.iconfont.close(@click.stop="close" title="关闭") &#xe6dc
      .content-wrap
        slot
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
import { CONFIG } from '@/store/types'
@Component({
  components: {}
})
export default class Drawer extends Vue {
  @State((state:CONFIG) => state.globalEvent.drawerShow) drawerShow: any
  @Emit('close')
  close () {}
}
</script>
<style lang="scss" scoped >
.slide-leave-active,
.slide-enter-active {
  transition: 1s;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}
.drawer {
  z-index: 1099;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0,0,0,0.5);
  .mask {
    z-index: 1088;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 500px;
  }
  .maincontent {
    position: relative;
    top: 0;
    right: 0;
    width: 500px;
    height: 100%;
    background-color: #fff;
    .header{
      display: flex;
      margin-bottom: 25px;
      padding: 20px 20px 0;
      color: #72767b;
      .title{
        flex: 1;
        font-size: 18px;
      }
      .close {
        font-size: 30px;
        cursor: pointer;
      }
    }
    .content-wrap {
      overflow-y: scroll;
      height: calc(100% - 90px);
    }
  }
}
</style>