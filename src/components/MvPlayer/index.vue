<template lang="pug">
  .video-wrapper(ref="videoWrapper" v-if="mvPlayerStatus")
    .header(ref="header" @mousedown="move")
      .close(@click.stop="close") X
    video-player(
      ref="videoPlayer"
      :playsinline="true"
      :options="playerOptions")
</template>
<script lang="ts">
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/lang/zh-CN.js'
import 'video.js/dist/video-js.css'
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
@Component({
  components: {
    videoPlayer
  }
})
export default class index extends Vue {
  @Ref('videoWrapper') readonly videoWrapper!: any

  @State(state => state.globalEvent.currentMv) currentMv: any
  @State(state => state.globalEvent.mvPlayerStatus) mvPlayerStatus: any
  @State(state => state.globalEvent.currentMusic) currentMusic: any

  @Mutation('setMvPlayerStatus') setMvPlayerStatus: any
  @Mutation('setPlaying') setMusicPlaying: any

  get playerOptions() {
    return {
      playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
      autoplay: true, //如果true,浏览器准备好时开始回放。
      muted: false, // 默认情况下将会消除任何音频。
      loop: true, // 导致视频一结束就重新开始。
      preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
      language: 'zh-CN',
      aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
      fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
      sources: [
        {
          src: this.currentMv.url, // 路径
          type: 'video/mp4' // 类型
        }
      ],
      poster: this.currentMv.cover, //你的封面地址
      // width: document.documentElement.clientWidth,
      notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
      controlBar: {
        timeDivider: true,
        durationDisplay: true,
        remainingTimeDisplay: true,
        fullscreenToggle: true //全屏按钮
      }
    }
  }

  close() {
    this.setMvPlayerStatus(false)
    console.log(this.currentMusic)
    if (this.currentMusic.songId) {
      this.setMusicPlaying(true)
    }
  }

  move(e: MouseEvent) {
    const target = e.target
    let disX = e.clientX - this.videoWrapper.offsetLeft
    let disY = e.clientY - this.videoWrapper.offsetTop
    document.onmousemove = (e:MouseEvent) => {
      let MIN = 0
      let MAX_TOP = window.innerHeight - 275
      let MAX_LEFT = window.innerWidth - 400
      let left = e.clientX - disX < 0 ? MIN : e.clientX - disX > MAX_LEFT ? MAX_LEFT : e.clientX - disX
      let top = e.clientY - disY < 0 ? MIN : e.clientY - disY > MAX_TOP ? MAX_TOP : e.clientY - disY
      this.videoWrapper.style.left = left + 'px'
      this.videoWrapper.style.top = top + 'px'
    }
    document.onmouseup = (e:MouseEvent) => {
      document.onmousemove = null
      document.onmouseup = null
    }
  }
}
</script>
<style lang="scss" scoped>
.video-wrapper {
  width: 400px;
  position: fixed;
  left: 20px;
  bottom: 20px;
  z-index: 999;
  .header {
    height: 50px;
    background-color: aquamarine;
    cursor: move;
    .close {
      width: 50px;
      cursor: pointer;
    }
  }
}
</style>
<style lang="scss">
.video-js .vjs-big-play-button {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
