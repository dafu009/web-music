<template lang="pug">
el-drawer(
  :visible.sync="drawerShow"
  :with-header="false"
  :direction="'ltr'"
  :show-close="false"
  :before-close="closeDrawer"
  size="500px")
  .play-list(v-if="drawerShow" @click.stop="")
    el-page-header(@back="closeDrawer" content="")
    ul.list
      li.item(v-for="(item, index) in playList") {{ item.album }}
</template>
<script lang="ts">
import { Mutation, State, Action } from 'vuex-class'
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class index extends Vue {
  @State(state => state.globalEvent.drawerShow) drawerShow: any
  @State(state => state.globalEvent.playList) playList: any
  @State(state => state.globalEvent.currentIndex) currentIndex: any
  @Mutation('setDrawer') setDrawer: any

  closeDrawer() {
    this.setDrawer(false)
  }
}
</script>
<style lang="scss" scoped>
.play-list{
  padding: 0 50px;
  ul.list {
    li.item {
      list-style: none;
    }
  }
}
</style>
