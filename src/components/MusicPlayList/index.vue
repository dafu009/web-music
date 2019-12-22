<template lang="pug">
el-drawer(
  title="播放列表"
  :visible.sync="drawerShow"
  :with-header="false"
  :direction="'ltr'"
  :before-close="closeDrawer"
  size="500px")
  .play-list(v-if="drawerShow" @click.stop="")
    ul.list
      li.item(v-for="(item, index) in playList")
        .cover
          img(v-lazy="item.picUrl")
        .info
          span.singer {{ item.artist }}
          span.song {{ item.songName }}
          span.album(v-if="item.songName !== item.album") {{ item.album }}
        .operating
          .control
            transition(name="fade")
              blow.blow-position(v-if="GlobalPlaying && currentMusic.songId === item.songId")
            transition(name="fade")
              img(@click="playOrPause(index)" v-if="GlobalPlaying && currentMusic.songId === item.songId" src="@/assets/image/pause.png")
            transition(name="fade")
              img(@click="playOrPause(index)" v-if="!GlobalPlaying || currentMusic.songId !== item.songId" src="@/assets/image/play.png")
          img(@click="deleteSong(index)" src="@/assets/image/cancel.png")
</template>
<script lang="ts">
import { Mutation, State, Action } from 'vuex-class'
import { Component, Vue, Prop } from 'vue-property-decorator'
import Blow from '@/common/components/Blow.vue'
@Component({
  components: {
    Blow
  }
})
export default class index extends Vue {
  @State(state => state.globalEvent.playing) GlobalPlaying: any
  @State(state => state.globalEvent.playList) playList: any
  @State(state => state.globalEvent.drawerShow) drawerShow: any
  @State(state => state.globalEvent.currentMusic) currentMusic: any
  @State(state => state.globalEvent.currentIndex) currentIndex: any

  @Mutation('setPlaying') setPlaying: any
  @Mutation('setDrawer') setDrawer: any
  @Mutation('setPlayList') setPlayList: any
  @Mutation('setCurrentIndex') setCurrentIndex: any

  closeDrawer() {
    this.setDrawer(false)
  }
  async deleteSong(index: number) {
    let list = this.playList
    list.splice(index, 1)
    await this.setPlayList(list)
    if (this.playList.length === 0) {
      this.closeDrawer()
    }
  }
  async playOrPause(index: number) {
    if (index === this.currentIndex) {
      const palying = !this.GlobalPlaying
      await this.setPlaying(palying)
    } else {
      await this.setPlaying(false)
      await this.setCurrentIndex(index)
      await this.setPlaying(true)
    }
  }
}
</script>
<style lang="scss" scoped>
.play-list {
  padding: 0 30px;
  ul.list {
    margin: 0;
    padding: 0 10px 30px;
    li.item {
      list-style: none;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .cover {
        width: 80px;
        height: 80px;
        box-sizing: border-box;
        padding: 2px;
        border: 1px solid #ccc;
        text-align: center;
        margin-right: 20px;
        img {
          height: 100%;
        }
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #949494;
        max-width: 230px;
        font-size: 14px;
        .singer {
          color: #000;
          font-size: 16px;
          font-weight: 500;
        }
      }
      .operating {
        flex: 1;
        overflow: hidden;
        text-align: right;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
        }
        .control {
          position: relative;
          img {
            position: absolute;
            top: 0;
            right: 40px;
          }
          .blow-position {
            top: -5px;
            right: 35px;
          }
        }
      }
    }
  }
}
</style>
<style>
.el-drawer__body {
  overflow-y: auto;
}
</style>
