<template lang="pug">
transition(name="fade")
  .player(v-if="playList.length > 0")
    .wrap
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
            span.iconfont(v-if="!GlobalPlaying") &#xe6a2
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
import VolumeControl from './VolumeControl.vue'
import { CONFIG, CurrentMusic } from '@/store/types'
@Component({
  components: {
    ProgressCircle,
    VolumeControl
  }
})
export default class Player extends Vue {
  @State((state: CONFIG) => state.globalEvent.isLogin) isLogin!: boolean
  @State((state: CONFIG) => state.globalEvent.playing) GlobalPlaying!: boolean
  @State((state: CONFIG) => state.globalEvent.currentMusic) currentMusic!: CurrentMusic
  @State((state: CONFIG) => state.globalEvent.playList) playList!: CurrentMusic[]
  @State((state: CONFIG) => state.globalEvent.currentIndex) currentIndex!: number

  @Mutation('setDrawer') setDrawer!: Function
  @Mutation('setPlaying') setPlaying!: Function
  @Mutation('setCurrentIndex') setCurrentIndex!: Function
  @Mutation('setCurrentSong') setCurrentSong!: Function
  @Action('setGlobalMessage') setGlobalMessage!: Function

  
  @Action('GetCurrentMusic') GetCurrentMusic!: Function

  @Ref() readonly audio!: HTMLAudioElement

  private currentTime: number = 0
  private currentLyric: string = ''
  private duration: number = 0
  private exposureOnce: boolean = true


  get percent() {
    return this.currentTime / this.duration || 0
  }
  @Watch('percent')
  watchPercent (value: number) {
    if (value > 0.3 && this.exposureOnce) {
      if (!this.isLogin) {
        this.exposureOnce = false
        this.setGlobalMessage({
          type: 'warning',
          message: '请前往登录畅想音乐'
        })
        this.setPlaying(false)
        this.$router.push('/user')
      }
    } 
  }
  @Watch('currentIndex')
  async setCurrentPlay(index: number) {
    document.title = `
      ${this.currentMusic.songName} - ${this.currentMusic.artist}
    `
    this.setPlaying(false)
    await this.GetCurrentMusic({item: this.playList[index], index: this.currentIndex})
  }
  @Watch('GlobalPlaying')
  PlayStatusChange(val: boolean) {
    if (val) {
      document.title = `
        ${this.currentMusic.songName} - ${this.currentMusic.artist}
      `
      this.exposureOnce = true
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
      await this.setCurrentIndex(1)
      await this.setCurrentIndex(0)
      this.setPlaying(true)
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
      await this.setPlaying(false)
    } else {
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
  padding: 20px 0;
  position: relative;
  .wrap {
    position: absolute;
    width: 100%;
    box-sizing: border-box;
    bottom: 0;
    padding: 0 20px 10px;
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
          background-color: #3a3a3a;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
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
}
</style>
