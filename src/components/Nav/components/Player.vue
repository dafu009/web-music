<template lang="pug">
.player
  .player-wrap
    .cover
      img(v-lazy="currentMusic.imgUrl")
    .info
      p.name {{ currentMusic.songName }}
      p.singer {{ currentMusic.artist }}
    .contorl
      p.play(@click="play") 播放
      p.next 下一首
    audio(ref="audio" :src="currentMusic.songUrl")
  progress-bar
  
</template>
<script lang="ts">
import { Mutation, State, Action } from 'vuex-class'
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import ProgressBar from './ProgressBar.vue'
@Component({
  components: {
    ProgressBar
  }
})
export default class Player extends Vue {
  @State(state => state.globalEvent.currentMusic) currentMusic: any
  @Ref() readonly audio!: HTMLAudioElement

  play () {
    this.audio.play()
  }

}
</script>
<style lang="scss" scoped>
.player {
  box-sizing: border-box;
  height: 200px;
  width: 100%;
  padding: 20px;
  .player-wrap {
    display: flex;
    justify-content: space-between;
    .cover {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      border: 1px solid #ccc;
      margin-right: 20px;
      img {
        height: 100%;
      }
    }
  }
  .info {
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
    align-self: center;
    p {
      margin: 0;

    }
  }
}
</style>
