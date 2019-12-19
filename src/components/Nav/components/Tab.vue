<template lang="pug">
.tab
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
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class Content extends Vue {}
</script>
<style lang="scss" scoped>
.tab {
  .nav-item {
    text-align: center;
    padding: 15px 0;
    cursor: pointer;
  }
  .router-link-active {
    background-color: red;
  }
}
</style>
