<template lang="pug">
transition(name="fade")
  .mask(v-if="checkShow")
    .check-wrap(@click.stop)
      .close(@click="close")
        span.iconfont &#xe69f
      .check-content
        p.tip.tip-info-1 身份验证
        p.tip.tip-info-2 拖动滑块，使图片角度为正
        .faceboder
          img(v-lazy="randomImage" :style="{transform: randomRotate}" @error="imageError")
          .status(v-if="statusShow")
            .icon.success(v-if="checkSuccess")
              span.iconfont &#xe61c
            .icon.error(v-if="checkFail")
              span.iconfont &#xe69f
        .contorl(:class="{ failed: checkFail, successed: checkSuccess }")
          .button(ref="contorl" @mousedown="downEvent" :style="{ transform: translateX }")
            p.icon
              span.iconfont &#xe61a
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Mutation, State, Action } from 'vuex-class'
import { CONFIG, RandomImage } from '@/store/types'
@Component({
  components: {}
})
export default class check extends Vue {
  @State((state: CONFIG) => state.globalEvent.checkShow) checkShow!: boolean
  @State((state: CONFIG) => state.globalEvent.checkPass.success) checkSuccess!: boolean
  @State((state: CONFIG) => state.globalEvent.checkPass.fail) checkFail!: boolean
  @State((state: CONFIG) => state.globalEvent.randomImage) image!: RandomImage

  @Mutation('setCheckShow') setCheckShow!: Function

  @Action('getRandomImg') getRandomImg!: Function
  @Action('checkImagePass') checkImagePass!: Function
  @Action('resetCheckStatus') resetCheckStatus!: Function

  rotate: number = 0
  statusShow: boolean = false
  offsetX: number = 0

  created() {
    this.init()
  }

  get randomImage() {
    return this.image.path
  }
  get randomRotate() {
    return `rotate(${this.rotate}deg)`
  }
  get translateX() {
    return `translateX(${this.offsetX}px)`
  }

  @Watch('offsetX')
  resetRotate(a: number, b: number) {
    this.rotate = +(+this.rotate + ((a - b) * 12) / 7).toFixed(0)
  }

  async init() {
    await this.getRandomImg()
    await this.resetCheckStatus()
    this.rotate = this.image.rotate
    this.statusShow = false
    this.offsetX = 0
  }
  close() {
    this.setCheckShow(false)
  }
  imageError() {
    console.log('error')
    this.init()
  }
  downEvent(e: MouseEvent) {
    const startX = e.clientX
    if (this.checkFail) return
    document.onmousemove = e => {
      let move = e.clientX - startX
      if (move <= 0) {
        move = 0
      } else if (move >= 210) {
        move = 210
      }
      this.offsetX = move
    }
    document.onmouseup = e => {
      this.upEvent()
    }
  }
  async upEvent() {
    document.onmousemove = null
    document.onmouseup = null
    this.statusShow = true
    await this.checkImagePass(this.rotate)
    setTimeout(() => {
      if (this.checkSuccess) {
        this.close()
      }
      this.init()
    }, 1100)
  }
}
</script>
<style lang="scss" scoped>
@import url('../style/shake.css');
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1299;
  .check-wrap {
    position: relative;
    width: 310px;
    height: 400px;
    top: 50%;
    left: 50%;
    border-radius: 20px;
    background-color: #fff;
    transform: translate(-50%, -50%);

    .close {
      position: absolute;
      top: 20px;
      right: 10px;

      .iconfont {
        font-size: 24px;
        padding: 10px;
      }
    }

    .check-content {
      padding: 50px 20px 40px;

      .tip {
        margin: 0;
        color: #656565;
        padding-bottom: 10px;
        text-align: center;
        &-info-1 {
          font-size: 14px;
        }
      }

      .faceboder {
        position: relative;
        overflow: hidden;
        width: 170px;
        height: 170px;
        margin: 20px auto;
        border-radius: 50%;
        border: 1px solid #ddd;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        img::selection {
          background: rgba(0, 0, 0, 0);
        }

        .status {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.3);

          .icon {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            .iconfont {
              display: block;
              text-align: center;
              font-size: 120px;
              line-height: 170px;
              color: #fff;
            }
          }
        }
      }

      .contorl {
        position: relative;
        width: 260px;
        height: 50px;
        margin: 0 auto;
        background-color: #f7f7f7;
        border-radius: 30px;
        border: 1px solid #ddd;

        .button {
          position: absolute;
          width: 50px;
          height: 100%;
          border: 1px solid #ddd;
          background-color: #fff;
          border-radius: 50%;
          top: -1px;
          left: -1px;

          .icon {
            margin: 14px auto;
            line-height: 24px;
            text-align: center;
          }
        }

        .button:active {
          border: 1px solid #61bbfb;
          background-color: #61bbfb;

          .icon {
            color: #fff;
          }
        }
      }

      .failed {
        animation: shake 1s 0.1s;
        border: 1px solid #f98989;
        cursor: not-allowed;
        .button {
          background-color: #ff4545;
          border: 1px solid #ff4545;

          .icon {
            color: #fff;
          }
        }
      }

      .successed {
        border: 1px solid #81fd76;

        .button {
          background-color: #81fd76;
          border: 1px solid #81fd76;

          .icon {
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
