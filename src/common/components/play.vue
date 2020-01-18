<template lang="pug">
.play(@click.stop="play(song)")
  span.iconfont(v-if="GlobalPlaying && currentMusic.songId === song.id") &#xe69e
  span.iconfont(v-if="!GlobalPlaying || currentMusic.songId !== song.id") &#xe6a2
</template>
<script lang="ts">
import { CONFIG, CurrentMusic } from '@/store/types'
import { Mutation, State } from 'vuex-class'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { __setPlayLists, __pushList } from '../ts/common'
@Component({
  components: {}
})
export default class play extends Vue {
  @Prop() private song?: any
  
  @State((state: CONFIG) => state.globalEvent.playList) playList!: CurrentMusic[]
  @State((state: CONFIG) => state.globalEvent.playing) GlobalPlaying!: boolean
  @State((state: CONFIG) => state.globalEvent.currentMusic) currentMusic!: CurrentMusic

  @Mutation('setCurrentIndex') setCurrentIndex!: Function
  @Mutation('setPlaying') setPlaying!: Function

  async play (item: any) {
    if (this.currentMusic.songId === item.id) {
      this.setPlaying(!this.GlobalPlaying)
    } else {
      const CurrentMusic = __setPlayLists(item)
      await __pushList(CurrentMusic)
      await this.setCurrentIndex(this.playList.length - 1)
    }

  }
}
</script>
<style lang="scss" scoped>
.play {
  width: 50px;
  height: 50px;
  cursor: pointer;
  text-align: center;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .iconfont {
    top: 0;
    right: 0;
    position: absolute;
    font-size: 50px;
  }
}
</style>
