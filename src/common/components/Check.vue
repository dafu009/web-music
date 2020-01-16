<template lang="pug">
transition(name="fade")
  .mask(v-if="checkShow")
    .check-wrap(@click.stop)
      .close(@click="close")
        span.iconfont &#xe6dc
      .check-content
        p.tip.tip-info-1 身份验证
        p.tip.tip-info-2 拖动滑块，使图片角度为正
        .faceboder
          img(v-lazy="randomImage" :style="{transform: randomRotate}")
          .status(v-if="statusShow")
            .icon.success(v-if="checkSuccess")
              span.iconfont &#xe605
            .icon.error(v-if="checkFail")
              span.iconfont &#xe6dc
        .contorl(:class="{ failed: checkFail, successed: checkSuccess }")
          .button(ref="contorl" @mousedown="downEvent" :style="{ transform: translateX }")
            p.icon
              span.iconfont &#xeb09
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Mutation, State } from 'vuex-class'
import { CONFIG } from '../../store/types'
@Component({
  components: {}
})
export default class check extends Vue {
  @State((state: CONFIG) => state.globalEvent.checkShow) checkShow: any
  @Mutation('setCheckShow') setCheckShow: any

  randomImgId: number = 0
  rotate: number = 0
  statusShow: boolean = false
  offsetX: number = 0
  checkSuccess: boolean = false
  checkFail: boolean = false
  watchEvent: boolean = false

  created() {
    this.init()
  }

  get randomImage() {
    return `https://api.yimian.xyz/img?id=${this.randomImgId}&type=moe&size=200x200`
  }
  get randomRotate() {
    return `rotate(${this.rotate}deg)`
  }
  get translateX() {
    return `translateX(${this.offsetX}px)`
  }

  @Watch('offsetX')
  resetRotate(a: number, b: number) {
    if (a > 0) {
      this.watchEvent = true
    } else return
    this.rotate = +(+this.rotate + ((a - b) * 12) / 7).toFixed(0)
  }

  init() {
    this.watchEvent = false
    this.statusShow = false
    this.checkSuccess = false
    this.checkFail = false
    this.offsetX = 0
    this.rotate = this.RandomNum(60, 300)
    this.randomImgId = this.RandomNum(1, 1000)
  }
  close() {
    this.setCheckShow(false)
  }
  imageError() {
    this.init()
  }
  RandomNum(Min: number, Max: number) {
    let Range = Max - Min
    let Rand = Math.random()
    let num = Min + Math.round(Rand * Range)
    return num
  }
  downEvent(e: any) {
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
  upEvent() {
    document.onmousemove = null
    document.onmouseup = null
    if (this.watchEvent) {
      this.statusShow = true
      if (this.rotate >= 350 && this.rotate <= 370) {
        console.log('验证成功')
        this.checkSuccess = true
      } else {
        console.log('验证失败')
        this.checkFail = true
      }
      setTimeout(() => {
        if (this.checkSuccess) {
          this.close()
        }
        this.init()
      }, 1100)
    }
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
