<template lang="pug">
  .nav(ref="nav")
    .wrapper
      .nav_userinfo
        //- 用户信息
      .nav_content
        router-link.nav-item(tag="div" to="/recommend")
          span.nav-link 发现音乐
        router-link.nav-item(tag="div" to="/singer")
          span.nav-link 歌手
        router-link.nav-item(tag="div" to="/rank")
          span.nav-link 排行
        router-link.nav-item(tag="div" to="/search")
          span.nav-link 搜索
</template>
<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class index extends Vue {
  @Ref('') readonly nav!: HTMLDivElement
  trigger() {

  }
}
</script>
<style lang="scss" scoped>
</style>
