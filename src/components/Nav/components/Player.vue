<template lang="pug">
transition(name="fade")
  .player(v-if="playList.length > 0")
    .player-wrap
      ProgressCircle(:percent="percent")
        .cover
          .image(:class="{playing: GlobalPlaying}")
            img(v-lazy="currentMusic.picUrl")
      .info
        p.name.animate {{ currentMusic.songName }}
        p.singer {{ currentMusic.artist }}
    .contorl
      p.prev(@click.stop="prev")
        span.iconfont &#xe69f
      p.play(@click.stop="play")
        transition(name="fade")
          span.iconfont(v-if="GlobalPlaying") &#xe69e
        transition(name="fade")
          span.iconfont(v-if="!GlobalPlaying") &#xe6a4
      p.next(@click.stop="next")
        span.iconfont &#xe69d
      p.musiclist(@click.stop="toList")
        span.iconfont &#xe69c
      volume-control(@change="volumeChange")
      audio(
        ref="audio"
        :src="currentMusic.songUrl"
        @timeupdate="updateTime"
        @ended="end"
      )
</template>
<script lang="ts">
import Lyric from 'lyric-parser'
import { Mutation, State, Action } from 'vuex-class'
import { Component, Vue, Prop, Ref, Watch } from 'vue-property-decorator'
import ProgressCircle from '@/common/components/ProgressCircle.vue'
import VolumeControl from './VolumeControl.vue';
@Component({
  components: {
    ProgressCircle,
    VolumeControl
  }
})
export default class Player extends Vue {
  @State(state => state.globalEvent.playing) GlobalPlaying: any
  @State(state => state.globalEvent.currentMusic) currentMusic: any
  @State(state => state.globalEvent.playList) playList: any
  @State(state => state.globalEvent.currentIndex) currentIndex: any

  @Mutation('setDrawer') setDrawer: any
  @Mutation('setPlaying') setPlaying: any
  @Mutation('setCurrentIndex') setCurrentIndex: any
  @Mutation('setCurrentSong') setCurrentSong: any

  @Action('GetCurrentMusic') GetCurrentMusic: any

  @Ref() readonly audio!: HTMLAudioElement

  private currentTime: number = 0
  private currentLyric: string = ''
  private duration: number = 0

  get percent() {
    return this.currentTime / this.duration || 0
  }
  @Watch('currentIndex')
  async setCurrentPlay(index: number) {
    document.title = `
      ${this.currentMusic.songName} - ${this.currentMusic.artist}
    `
    this.setPlaying(false)
    await this.GetCurrentMusic(this.playList[index].songId)
      .then((data: any) => {
        if (!data.songUrl) {
          this.$message({
            type: 'warning',
            message: '没有音源'
          })
          return
        }
        const current = { ...data, ...this.playList[index] }
        this.setCurrentSong(current)
      })
      .catch(() => {
        this.$message({
          type: 'error',
          message: '播放失败'
        })
      })
    this.setPlaying(true)
  }
  @Watch('GlobalPlaying')
  PlayStatusChange(val: boolean) {
    if (val) {
      document.title = `
        ${this.currentMusic.songName} - ${this.currentMusic.artist}
      `
      setTimeout(() => {
        this.audio.play()
      }, 1000)
    } else {
      document.title = 'web-music'
      this.audio.pause()
      this.setPlaying(false)
    }
  }
  updateTime(e: any) {
    this.duration = e.target.duration
    this.currentTime = e.target.currentTime
  }
  async setCurrentSongIndex(type: boolean) {
    if (this.playList.length === 1) {
      this.audio.play()
      return
    }
    const lastIndex = this.playList.length === 0 ? 0 : this.playList.length - 1
    if (type) {
      if (this.currentIndex === lastIndex) {
        await this.setCurrentIndex(0)
      } else {
        await this.setCurrentIndex(this.currentIndex + 1)
      }
    } else {
      if (this.currentIndex === 0) {
        await this.setCurrentIndex(lastIndex)
      } else {
        await this.setCurrentIndex(this.currentIndex - 1)
      }
    }
  }
  async play() {
    if (this.currentIndex === -1) {
      await this.setCurrentIndex(0)
    }
    if (this.GlobalPlaying) {
      this.audio.pause()
      await this.setPlaying(false)
    } else {
      this.audio.play()
      await this.setPlaying(true)
    }
  }
  async end() {
    await this.setCurrentSongIndex(true)
  }
  async next() {
    await this.setCurrentSongIndex(true)
  }
  async prev() {
    await this.setCurrentSongIndex(false)
  }
  async toList() {
    await this.setDrawer(true)
  }

  volumeChange (volume: number) {
    this.audio.volume = volume
  }
}
</script>
<style lang="scss" scoped>
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes wordsLoop {
  0% {
    transform: translateX(0px);
    -webkit-transform: translateX(0px);
  }
  100% {
    transform: translateX(-100%);
    -webkit-transform: translateX(-100%);
  }
}
.playing {
  animation: rotate 10s linear infinite;
}
.player {
  box-sizing: border-box;
  height: 200px;
  width: 100%;
  padding: 20px;
  .player-wrap {
    display: flex;
    justify-content: space-around;
    .cover {
      box-sizing: border-box;
      flex-shrink: 0;
      width: 85px;
      height: 85px;
      border-radius: 50%;
      position: absolute;
      top: 0;
      left: 0;
      padding: 5px;
      .image {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        overflow: hidden;
        text-align: center;
        background-color: #fbe6cc;
        img {
          height: 100%;
        }
      }
    }
    .info {
      flex-shrink: 1;
      align-self: center;
      max-width: 140px;
      overflow: hidden;
      p {
        margin: 0;
      }
      .name {
        padding-left: 140px;
        display: inline-block;
        white-space: nowrap;
        font-size: 18px;
      }
      .animate {
        animation: 10s wordsLoop linear infinite normal;
      }
      .singer {
        text-align: center;
        font-size: 16px;
        color: #fff;
      }
    }
  }
  .contorl {
    display: flex;
    justify-content: center;
    p {
      cursor: pointer;
      margin: 0 8px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      .iconfont {
        font-size: 40px;
        color: #515151;
      }
    }
  }
}
</style>
