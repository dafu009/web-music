<template lang="pug">
.play-all
  span.iconfont(@click="playAll") &#xe636
</template>
<script lang="ts">
import { CONFIG } from '@/store/types'
import { Mutation, State, Action } from 'vuex-class'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { __setPlayLists, __pushList } from '../ts/common'
@Component({
  components: {}
})
export default class playAll extends Vue {
  @Prop() private allSongList?: any

  @State((state: CONFIG) => state.globalEvent.playing) GlobalPlaying!: boolean
  @Mutation('setCurrentIndex') setCurrentIndex!: Function
  @Action('setGlobalMessage') setGlobalMessage!: Function

  async playAll () {
    let list: any = []
    this.allSongList.forEach((item: any) => {
      list.push(__setPlayLists(item))
    })
    list.map((item: any) => {
      __pushList(item)
    })
    this.setGlobalMessage({ type: 'success', message: '添加成功' })
    if (this.GlobalPlaying) {
      return
    } else {
      this.setCurrentIndex(0)
    }
  }
}
</script>
<style lang="scss" scoped >
.play-all {
  flex: 1;
  .iconfont {
    cursor: pointer;
    font-size: 40px;
  }
}
</style>