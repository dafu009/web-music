<template lang="pug">
.tab
  search
  router-link.nav-item(tag="div" to="/recommend")
    span.nav-link 发现音乐
  router-link.nav-item(tag="div" to="/singer")
    span.nav-link 歌手
  router-link.nav-item(tag="div" to="/rank" )
    span.nav-link 排行
</template>
<script lang="ts">
import Search from './search.vue'
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  components: {
    Search
  }
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
    background-image: linear-gradient(135deg, #fde1a2 10%, #6f9bf7 100%);
  }
  
}
</style>
