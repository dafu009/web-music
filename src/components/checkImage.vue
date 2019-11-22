<template>
  <div class="mask" @mouseup="upEvent">
    <div class="check-wrap">
      <div class="close">
        <i class="iconfont icon-guanbi"></i>
      </div>
      <div class="content">
        <p class="tip tip-info-1">身份验证</p>
        <p class="tip tip-info-2">拖动滑块，使图片角度为正</p>
        <div class="faceboder">
          <img v-lazy="randomImage" alt="" :style="{ transform: randomRotate }" />
          <div class="status" v-if="statusShow">
            <div class="icon success" v-if="checkSuccess">
              <i class="iconfont icon-zhengque"></i>
            </div>
            <div class="icon error" v-if="checkFail">
              <i class="iconfont icon-guanbi"></i>
            </div>
          </div>
        </div>
        <div class="contorl" :class="{'failed': checkFail, 'successed': checkSuccess}">
          <div class="button" ref="contorl" @mousedown="downEvent"  :style="{transform: translateX}">
            <p class="icon">
              <i class="iconfont icon-jiantouarrowheads3"></i>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      randomImgId: 0,
      rotate: 0,
      statusShow: false,
      offsetX: 0,
      checkSuccess: false,
      checkFail: false
    }
  },
  created () {
    this.init()
  },
  computed: {
    randomImage () {
      return `https://picsum.photos/id/${this.randomImgId}/200/200`
    },
    randomRotate () {
      return `rotate(${this.rotate}deg)`
    },
    translateX () {
      return `translateX(${this.offsetX}px)`
    }
  },
  methods: {
    init () {
      this.statusShow = false
      this.checkSuccess = false
      this.checkFail = false
      this.offsetX = 0
      this.randomImgId = this.RandomNum(1, 500)
      this.rotate = this.RandomNum(60, 300)
    },
    RandomNum(Min, Max) {
      let Range = Max - Min
      let Rand = Math.random()
      let num = Min + Math.round(Rand * Range)
      return num
    },
    downEvent (e) {
      const startX = e.clientX
      document.onmousemove = (e) => {
        let move = e.clientX - startX
        if (move <= 0) {
          move = 0
        } else if (move >= 210) {
          move = 210
        }
        this.offsetX = move
      }
    },
    upEvent () {
      document.onmouseup = (e) => {
        document.onmousemove = null
      }
      this.statusShow = true
      console.log(this.rotate)
      if (this.rotate >= 350 && this.rotate <= 360) {
        console.log('验证成功')
        this.checkSuccess = true
      } else {
        console.log('验证失败')
        this.checkFail = true
      }
      setTimeout(()=>{
        this.init()
      }, 1100)
    }
  },
  watch: {
    offsetX (a, b) {
      this.rotate = +this.rotate + ((a - b) * 12 / 7)
    }
  }
}
</script>
<style lang="stylus">
@import url(../style/shake.css)
.mask
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background-color rgba(0, 0, 0, 0.5)
  .check-wrap
    position relative
    width 310px
    height 400px
    top 50%
    left 50%
    border-radius 20px
    background-color #fff
    transform translate(-50%, -50%)
    .close
      position absolute
      top 20px
      right 10px
      .iconfont
        padding 10px
    .content
      padding 50px 20px 40px
      .tip
        margin 0
        color #656565
        padding-bottom 10px
        &-info-1
          font-size 14px
      .faceboder
        position relative
        overflow hidden
        width 170px
        height 170px
        margin 20px auto
        border-radius 50%
        border 1px solid #ddd
        img{
          width 100%
        }
        img::selection
          background rgba(0,0,0,0)
        .status
          position absolute
          top 0
          left 0
          width 100%
          height 100%
          background-color rgba(0, 0, 0, .3)
          .icon
            position absolute
            top 0 
            left 0
            width 100%
            height 100%
            .iconfont
              display block
              font-size 120px
              line-height 170px
              color #fff
      .contorl
        position relative
        width 260px
        height 50px
        margin 0 auto
        background-color #f7f7f7
        border-radius 30px
        border 1px solid #ddd
        .button
          position absolute
          width 50px
          height 100%
          border 1px solid #ddd
          background-color #fff
          border-radius 50%
          top -1px
          left -1px
          .icon
            margin 16px auto
            transform rotate(180deg)
        .button:active
          border 1px solid #61bbfb
          background-color #61bbfb
          .icon
            color #fff
      .failed
        animation shake 1s .1s
        border 1px solid #f98989
        .button
          background-color #ff4545
          border 1px solid #ff4545
          .icon 
            color #fff
      .successed
        border 1px solid #81fd76
        .button
          background-color #81fd76
          border 1px solid #81fd76
          .icon 
            color #fff
      
        


</style>
<style>


</style>