<template lang="pug">
  .wrapper
    progress-bar(:percent="percent")
    audio(ref="audio" @timeupdate="timeupdate" :src="currentSong.url")
    button(@click="playOrPause") {{text}}
    p {{currentTime}} {{duration}}
</template>
<script lang="ts">
import ProgressBar from './components/progress-bar.vue'
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { Mutation, State } from 'vuex-class'
import api from '@/api'
@Component({
  components: {
    ProgressBar
  }
})
export default class index extends Vue {
  @State(state => state.globalEvent) globalEvent: any
  @Mutation('setPlaying') setPlaying: any

  @Ref() readonly audio!: HTMLAudioElement
  percent: number = 0
  currentTime: number = 0
  duration: number = 0
  currentSong: object = {}
  text: string = '播放'
  timeupdate(e: any) {
    this.duration = e.target.duration
    this.currentTime = e.target.currentTime
  }
  playOrPause() {
    if (!this.globalEvent.playing) {
      this.setPlaying({ playing: true })
      this.audio.play()
    } else {
      this.setPlaying({ playing: false })
      this.audio.pause()
    }
  }
  created() {
    api.song
      .getSongUrl({
        params: {
          id: 4875626
        }
      })
      .then(value => {
        this.currentSong = value.data[0]
      })
      .catch(() => {})
  }
  mounted() {}
}
</script>
<style lang="scss" scoped></style>
