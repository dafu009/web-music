<template lang="pug">
  .volume
    .control(@mousedown="focus" @mouseup="blur")
      span.iconfont &#xe6e3
      span.iconfont.mute &#xe6e1
      transition(name="fade")
        .control-bar(v-if="active")
          .progress
          .progress-btn-wrap
            .progress-btn
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class VolumeControl extends Vue {
  private active: boolean = false
  focus () {
    this.active = true
  }
  blur () {
    this.active = false
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
      .progress {
        position: absolute;
        width: 10px;
        height: 100px;
        top: -80px;
        right: 15px;
        border-radius: 5px;
        background-color: aquamarine;
      }
      .progress-btn-wrap {
        position: absolute;
        width: 10px;
        height: 100px;
        top: -80px;
        right: 15px;
        border-radius: 5px;
        background-color: #515151;
        .progress-btn {
          position: absolute;
          right: -2px;
          margin: 0;
          width: 10px;
          height: 10px;
          border: 2px solid #fff;
          border-radius: 50%;
          background-color: blueviolet;
        }
      }
    } 
  }
}
    
</style>
