<template lang="pug">
  .nav(ref="nav")
    user-info
    .nav_content
      router-link.nav-item(tag="div" to="/recommend")
        span.nav-link 发现音乐
      router-link.nav-item(tag="div" to="/singer")
        span.nav-link 歌手
      router-link.nav-item(tag="div" to="/rank" )
        span.nav-link 排行
      router-link.nav-item(tag="div" to="/search")
        span.nav-link 搜索
</template>
<script lang="ts">
import UserInfo from './components/UserInfo.vue'
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
@Component({
  components: {
    UserInfo
  }
})
export default class index extends Vue {
  @Ref('') readonly nav!: HTMLDivElement
  get queryRoute() {
    return this.$route.name
  }
  trigger() {}
  mounted () {
  }
}
</script>
<style lang="scss" scoped>
.nav {
  height: 100%;
  display: flex;
  background-color: #84959d;
  flex-direction: column;
  .nav_userinfo {
    height: 200px;
    padding: 50px;
  }
  .nav-item {
    text-align: center;
    padding: 15px 0;
    cursor: pointer;
  }
  .router-link-active {
    background-color: red
  }
}
</style>
