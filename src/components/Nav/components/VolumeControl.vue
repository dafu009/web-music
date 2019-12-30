<template lang="pug">
  .volume
    .control(@mousedown="focus" @mouseup="blur")
      span.iconfont &#xe6e3
      span.iconfont.mute(v-if="volume === 0") &#xe6e1
      transition(name="fade")
        .control-bar(ref="control" v-if="active")
          .progress-btn-wrap
            .progress-btn(ref="controlBtn")
</template>
<script lang="ts">
import { Component, Vue, Prop, Ref, Emit } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class VolumeControl extends Vue {
  @Ref('control') readonly control!: any
  @Ref('controlBtn') readonly controlBtn!: any

  private volume: number = 1
  private firstPosition: number = 0
  private movePosition: number = 0
  private lastPosition: number = 0
  private active: boolean = false

  @Emit('change')
  change(volume: number){
    return volume
  }

  focus (e: MouseEvent) {
    this.active = true
    this.firstPosition = e.clientY
    this.$nextTick(() => {
      this.control.addEventListener('mousemove', this.move)
    })
  }
  blur () {
    this.active = false
  }
  move (e: MouseEvent) {
    this.lastPosition = e.clientY
    this.movePosition = 100 - (this.firstPosition - this.lastPosition)
    if (this.movePosition < 0) {
      this.movePosition = 0
    } else if (this.movePosition > 100) {
      this.movePosition = 100
    }
    if (this.controlBtn) {
      this.controlBtn.style.top = `${this.movePosition}px`
    }
    this.volume = Number(((100 - this.movePosition) / 100).toFixed(1))
    this.change(this.volume)
  }
}
</script>
<style lang="scss" scoped>
.volume{
  margin: 0 8px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: relative;
  .control {
    cursor: pointer;
    position: relative;
    .iconfont {
      font-size: 40px;
      position: absolute;
      top: 0;
      right: 0;
      color: #515151;
    }
    .mute {
      right: 4px;
    }
    .control-bar {
      .progress-btn-wrap {
        position: absolute;
        width: 10px;
        height: 110px;
        top: -90px;
        right: 15px;
        border-radius: 5px;
        background-color: rgba(0,0,0,0.5);
        .progress-btn {
          position: absolute;
          right: -2px;
          top: 100px;
          margin: 0;
          width: 10px;
          height: 10px;
          border: 2px solid #fff;
          border-radius: 50%;
          background-color: #3677FF;
        }
      }
    } 
  }
}
    
</style>
