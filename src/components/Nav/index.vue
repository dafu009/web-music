<template lang="pug">
  .nav(ref="nav")
    user-info.nav_userinfo
    Tab.nav_tab
    transition(name="fade")
      player.nav_player()
</template>
<script lang="ts">
import UserInfo from './components/UserInfo.vue'
import Tab from './components/Tab.vue'
import Player from './components/Player.vue'
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
@Component({
  components: {
    UserInfo,
    Tab,
    Player
  }
})
export default class index extends Vue {
  @Ref('') readonly nav!: HTMLDivElement
}
</script>
<style lang="scss" scoped>
.nav {
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
    flex-shrink: 0;
  }
}
</style>
