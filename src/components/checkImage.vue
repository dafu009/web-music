<template lang="pug">
  transition(name="fade")
    div.mask(@mouseup="upEvent")
      div.check-wrap
        div.close(@click="close")
          i(class=["iconfont icon-guanbi"])
        div.content
          p(class=["tip tip-info-1"]) 身份验证
          p(class=["tip tip-info-2"]) 拖动滑块，使图片角度为正
          div.faceboder
            img( v-lazy="randomImage" :style="{transform: randomRotate}" @error="imageError")
            div.status(v-if="statusShow")
              div(class=["icon success"] v-if="checkSuccess")
                i(class=["iconfont icon-zhengque"])
              div(class=["icon error"] v-if="checkFail")
                i(class=["iconfont icon-guanbi"])
          div.contorl(:class="{ failed: checkFail, successed: checkSuccess }")
            div.button(ref="contorl" @mousedown="downEvent" :style="{ transform: translateX }")
              p.icon
                i(class=["iconfont icon-jiantouarrowheads3"])
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Mutation, State } from 'vuex-class'
@Component({
  components: {}
})
export default class check extends Vue {
  @State(state => state.globalEvent) globalEvent: any
  @Mutation('setGlobalEvent') setGlobalEvent: any

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
    return `https://picsum.photos/id/${this.randomImgId}/200/200`
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
    this.randomImgId = this.RandomNum(1, 1000)
    this.rotate = this.RandomNum(60, 300)
  }
  close() {
    this.setGlobalEvent({
      checkShow: false
    })
  }
  imageError() {
    this.randomImgId = this.RandomNum(1, 500)
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
  }
  upEvent() {
    document.onmouseup = e => {
      document.onmousemove = null
    }
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);

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
        padding: 10px;
      }
    }

    .content {
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
            transform: rotate(180deg);
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
