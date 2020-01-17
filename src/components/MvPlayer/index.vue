<template lang="pug">
  .video-wrapper(
    ref="videoWrapper"
    v-if="mvPlayerStatus"
    :class="{'shadow': moving}")
    transition(name="fade")
      .header(ref="header" @mousedown="move")
        .move
          span.iconfont &#xe786
        .close(@click.stop="close" title="关闭")
          span.iconfont &#xe6dc
    video.video(
      controls
      autoplay
      :muted="muted"
      ref="videoPlayer"
      :src="currentMv.url" 
      @play="onPlayerPlay")
</template>
<script lang="ts">
import { Component, Vue, Prop, Ref, Watch } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
@Component({
  components: {}
})
export default class index extends Vue {
  @Ref('videoWrapper') readonly videoWrapper!: any
  @Ref('videoPlayer') readonly video!: any

  @State(state => state.globalEvent.currentMv) currentMv: any
  @State(state => state.globalEvent.mvPlayerStatus) mvPlayerStatus: any
  @State(state => state.globalEvent.currentMusic) currentMusic: any
  @State(state => state.globalEvent.playing) MusicPlaying: any

  @Mutation('setMvPlayerStatus') setMvPlayerStatus: any
  @Mutation('setPlaying') setMusicPlaying: any

  private muted: boolean = true
  private moving: boolean = false
  private headerShow: boolean = false
  @Watch('MusicPlaying')
  PlayStatusChange (value: boolean) {
    if (value && this.video) this.video.pause()
  }
  mounted () {
    setTimeout(() => {
      this.muted = false
    }, 500)
  }
  
  onPlayerPlay () {
    this.setMusicPlaying(false)
  }
  close() {
    this.setMvPlayerStatus(false)
    if (this.currentMusic.songId) {
      this.setMusicPlaying(true)
    }
  }

  move(e: MouseEvent) {
    const target = e.target
    let disX = e.clientX - this.videoWrapper.offsetLeft
    let disY = e.clientY - this.videoWrapper.offsetTop
    document.onmousemove = (e:MouseEvent) => {
      let MIN_LEFT = 0
      let MIN_HEIGHT = 50
      let MAX_TOP = window.innerHeight - this.videoWrapper.offsetHeight
      let MAX_LEFT = window.innerWidth - this.videoWrapper.offsetWidth
      let left = e.clientX - disX < MIN_LEFT ? MIN_LEFT : e.clientX - disX > MAX_LEFT ? MAX_LEFT : e.clientX - disX
      let top = e.clientY - disY < MIN_HEIGHT ? MIN_HEIGHT : e.clientY - disY > MAX_TOP ? MAX_TOP : e.clientY - disY
      this.moving = true
      this.videoWrapper.style.left = left + 'px'
      this.videoWrapper.style.top = top + 'px'
    }
    document.onmouseup = (e:MouseEvent) => {
      this.moving = false
      document.onmousemove = null
      document.onmouseup = null
    }
  }
}
</script>
<style lang="scss" scoped>
.video-wrapper {
  width: 450px;
  height: 225px;
  position: fixed;
  left: 20px;
  bottom: 40px;
  z-index: 999;
  .header {
    height: 50px;
    background-color: #f9f9f9;
    display: flex;
    line-height: 50px;
    text-align: center;
    position: absolute;
    z-index: 1000;
    width: 100%;
    top: -50px;
    opacity: 0;
    transition: opacity .4s;
    .move {
      cursor: move;
      flex: 1;
      color: #444;
      .iconfont {
        font-size: 24px;
      }
    }
    .close {
      width: 50px;
      cursor: pointer;
      .iconfont {
        font-size: 30px;
      }
    }
    .close:hover {
      background-color: #ccc;
    }
  }
  .video {
    width: 100%;
    height: 100%;
    background-color: #f9f9f9;
  }
}
.video-wrapper:hover > .header{
  opacity: 1;
}
.video-wrapper::after, .video-wrapper::before {
  content: '';
  position: absolute;
  z-index: -1;
  top: 50%;
  bottom: 0;
  left: 10px;
  right: 10px;
  box-shadow: 0 0 20px rgba(0,0,0,.8);
  border-radius: 100px/10px;
}
.shadow {
  box-shadow: 0 20px 60px 0 rgba(14, 42, 90, 0.4);
}
</style>
<style lang="scss">
