<template lang="pug">
.player
  .player-wrap
    ProgressCircle(:percent="percent")
      .cover
        .image(:class="{playing: GlobalPlaying}")
          img(v-lazy="currentMusic.imgUrl")
    .info
      p.name {{ currentMusic.songName }}
      p.singer {{ currentMusic.artist }}
    .contorl
      p.play(@click="play") {{ playText }}
      p.next(@click="EndOrNext") 下一首
    audio(ref="audio" :src="currentMusic.songUrl" @timeupdate="updateTime" @ended="EndOrNext")
  //- progress-bar
  
</template>
<script lang="ts">
import { Mutation, State, Action } from 'vuex-class'
import { Component, Vue, Prop, Ref, Watch } from 'vue-property-decorator'
import ProgressBar from './ProgressBar.vue'
import ProgressCircle from '@/common/components/ProgressCircle.vue'
@Component({
  components: {
    ProgressBar,
    ProgressCircle
  }
})
export default class Player extends Vue {
  @State(state => state.globalEvent.playing) GlobalPlaying: any
  @State(state => state.globalEvent.currentMusic) currentMusic: any
  @State(state => state.globalEvent.playList) playList: any
  @State(state => state.globalEvent.currentIndex) currentIndex: any

  @Mutation('setPlaying') setPlaying: any
  @Mutation('setCurrentIndex') setCurrentIndex: any
  @Mutation('setCurrentSong') setCurrentSong: any

  @Ref() readonly audio!: HTMLAudioElement

  private playText: string = '播放'
  private currentTime: number = 0
  private duration: number = 0

  get percent () {
    return this.currentTime / this.duration || 0
  }

  @Watch('GlobalPlaying')
  PlayStatusChange(val: boolean) {
    if (val) {
      this.audio.play()
    }
  }
  updateTime (e: any) {
    this.duration = e.target.duration
    this.currentTime = e.target.currentTime
  }
  setIndex () {
    if (this.currentIndex === this.playList.length - 1) {
      this.setCurrentIndex(0)
    } else {
      this.setCurrentIndex(this.currentIndex + 1)
    }
  }
  async play() {
    if (this.GlobalPlaying) {
      this.playText = '播放'
      this.audio.pause()
      await this.setPlaying(false)
    } else {
      this.playText = '暂停'
      this.audio.play()
      await this.setPlaying(true)
    }
  }
  async EndOrNext () {
    this.setIndex()
    await this.setCurrentSong(this.playList[this.currentIndex])
    this.audio.play()
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
    justify-content: space-between;
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
      p {
        margin: 0;
      }
      .name {
        font-size: 20px;
      }
      .singer {
        font-size: 16px;
        color: #fff;
      }
    }
    .contorl {
      flex-shrink: 0;
      align-self: center;
      p {
        margin: 0;
      }
    }
  }
}
</style>
