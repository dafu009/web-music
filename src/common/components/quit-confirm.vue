<template lang="pug">
transition(name="fade")
  .confirm-wrap(v-if="confirmShow")
    .confirm
      .close(@click.stop="close")
        span.iconfont &#xe69f
      .title 是否确认退出?
      .options
        .item.cancel(@click.stop="close") 取消
        .item.right(@click.stop="confirm") 确认
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { State, Mutation, Action } from 'vuex-class'
import { CONFIG } from '@/store/types'
@Component({
  components: {}
})
export default class confitm extends Vue {
  @State((state: CONFIG) => state.globalEvent.confirmShow) confirmShow!: boolean
  @Mutation('setConfirmShow') setConfirmShow!: Function
  @Action('Logout') Logout!: Function

  close () {
    this.setConfirmShow(false)
  }
  confirm () {
    this.Logout()
    this.close()
    this.$router.push('/recommend')
  }
}
</script>
<style lang="scss" scoped>
.confirm-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1499;
  .confirm {
    position: absolute;
    width: 300px;
    height: 200px;
    background-color: #fff;
    border-radius: 20px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    .close {
      cursor: pointer;
      text-align: right;
      height: 35px;
      padding: 10px 10px 0 10px;
      .iconfont {
        font-size: 32px;
      }
    }
    .title {
      height: 100px;
      line-height: 90px;
      text-align: center;
      font-size: 20px;
    }
    .options{
      width: 100%;
      height:55px;
      display: flex;
      .item {
        flex: 1;
        cursor: pointer;
        text-align: center;
        line-height:55px;
        color: #fff;
        font-weight: 600;
        font-size: 16px;
        position: relative;
      }
      .cancel {
        background-color: rgba(66, 185, 131, 0.7);
      }
      .right {
        background-color: rgba(231, 98, 82, 0.7);
      }
      .item::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        transition: 0.3s;
        opacity: 0.7;
        background: rgba(#fff, 0.2);
        transform-origin: left;
        transform: scaleX(0);
      }
      .item:hover::after {
        transform: scaleX(1);
      }
    }
  }
}
</style>
