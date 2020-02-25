<template lang="pug">
  .nav(ref="nav")
    user-info.nav_userinfo
    Tab.nav_tab
    player.nav_player
    .controler(@click="toggle" :class="{hide: hide}")
      span.iconfont &#xe61a
</template>
<script lang="ts">
import UserInfo from './components/UserInfo.vue'
import Tab from './components/Tab.vue'
import Player from './components/Player.vue'
import { Component, Vue, Prop, Ref, Emit, Watch } from 'vue-property-decorator'
@Component({
  components: {
    UserInfo,
    Tab,
    Player
  }
})
export default class index extends Vue {
  @Prop() private drawerShow!: boolean
  private hide: boolean = true

  @Watch('drawerShow')
  drawer (value: boolean) {
    this.hide = value
  }

  @Emit('toggle')
  toggle () {
    return true
  }
}
</script>
<style lang="scss" scoped>
.nav {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-image: linear-gradient( 135deg, #FFD26F 10%, #3677FF 100%);
  .nav_userinfo {
    flex-shrink: 0;
    padding: 60px 0 10px
  }
  .nav_tab {
    flex-shrink: 1;
    padding: 20px 0;
  }
  .nav_player {
    flex: 1;
  }
  .controler{
    cursor: pointer;
    position: absolute;
    width: 50px;
    height: 50px;
    padding: 5px;
    line-height: 50px;
    text-align: center;
    top: 5px;
    right: -35px;
    background-color: #fff;
    border-radius: 50%;
    transition: 0.5s;
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
    .iconfont {
      font-size: 28px;
      color: #595959;
    }
  }
  .hide {
    transform: rotate(180deg)
  }
}
</style>
