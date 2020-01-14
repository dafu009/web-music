<template lang="pug">
el-drawer(
  title="播放列表"
  :visible.sync="drawerShow"
  :with-header="false"
  :direction="'ltr'"
  :before-close="closeDrawer"
  size="500px")
  .play-list(v-if="drawerShow")
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
              span.iconfont(@click="playOrPause(index)" v-if="GlobalPlaying && currentMusic.songId === item.songId") &#xe69e
            transition(name="fade")
              span.iconfont(@click="playOrPause(index)" v-if="!GlobalPlaying || currentMusic.songId !== item.songId") &#xe6a2
          span.iconfont(@click="deleteSong(index)") &#xe698
    .clear(@click="clear")
      p 清空播放列表
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
      await this.setPlaying(false)
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
  async clear () {
    this.setPlayList([])
    this.closeDrawer()
    await this.setPlaying(false)
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
          width: 100%;
          object-fit: contain;
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
        .iconfont{
          cursor: pointer;
          font-size: 40px;
        }
        .control {
          position: relative;
          .iconfont {
            font-size: 40px;
            position: absolute;
            top: 0;
            right: 40px;
          }
          .blow-position {
            top: -3px;
            right: 35px;
          }
        }
      }
    }
  }
  .clear {
    cursor: pointer;
    p {
      margin: 0 auto;
      width: 200px;
      text-align: center;
      padding: 10px 60px 30px;
      border-top: 1px solid #e6e6e6;
    }
  }
}
</style>
<style>
.el-drawer__body {
  overflow-y: auto;
}
.el-drawer__body::-webkit-scrollbar {
  width: 8px;
  background-color: #fff
}
  .el-drawer__body::-webkit-scrollbar-track {
  background-color: #fff
}

.el-drawer__body::-webkit-scrollbar-thumb {
  background: rgb(146, 181, 255);
  border-radius: 20px;
}
</style>
