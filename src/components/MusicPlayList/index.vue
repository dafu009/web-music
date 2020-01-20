<template lang="pug">
transition(name="fade")
  drawer(v-if="drawerShow" @close="closeDrawer")
    .play-list(v-if="drawerShow")
      ul.list
        template(v-for="(item, index) in Lists")
          li.item(:key="index")
            .cover
              img(v-lazy="item.picUrl")
            .info
              span.singer {{ item.artist }}
              span.song {{ item.songName }}
              span.album(v-if="item.songName !== item.album") {{ item.album }}
            .operating
              .control(v-if="!item.disable")
                transition(name="fade")
                  blow.blow-position(v-if="GlobalPlaying && currentMusic.songId === item.songId")
                transition(name="fade")
                  span.iconfont(@click="playOrPause(index)" v-if="GlobalPlaying && currentMusic.songId === item.songId") &#xe69e
                transition(name="fade")
                  span.iconfont(@click="playOrPause(index)" v-if="!GlobalPlaying || currentMusic.songId !== item.songId") &#xe6a2
              .tips(v-else) 暂无音源
              span.iconfont(@click="deleteSong(index)") &#xe698
      .clear(@click="clear")
        p 清空播放列表
</template>
<script lang="ts">
import { Mutation, State, Action } from 'vuex-class'
import { Component, Vue, Prop } from 'vue-property-decorator'
import Blow from '@/common/components/Blow.vue'
import Drawer from '@/common/components/Drawer.vue'
import { CONFIG, CurrentMusic } from '@/store/types'
import { Deduplication } from '@/common/ts/common'

@Component({
  components: {
    Blow,
    Drawer
  }
})
export default class index extends Vue {
  @State((state: CONFIG) => state.globalEvent.playing) GlobalPlaying!: boolean
  @State((state: CONFIG) => state.globalEvent.playList) playList!: CurrentMusic[]
  @State((state: CONFIG) => state.globalEvent.drawerShow) drawerShow!: boolean
  @State((state: CONFIG) => state.globalEvent.currentMusic) currentMusic!: CurrentMusic
  @State((state: CONFIG) => state.globalEvent.currentIndex) currentIndex!: number

  @Mutation('setPlaying') setPlaying!: Function
  @Mutation('setDrawer') setDrawer!: Function
  @Mutation('setPlayList') setPlayList!: Function
  @Mutation('setCurrentIndex') setCurrentIndex!: Function

  get Lists () {
    return Deduplication(this.playList)
  }

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
          vertical-align: middle;
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
        .tips {
          font-size: 14px;
          color: #545454;
          display: inline-block;
          vertical-align: middle;
          margin: 0 15px 5px 0;
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
