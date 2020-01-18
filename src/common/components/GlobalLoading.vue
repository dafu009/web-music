<template lang="pug">
transition(name="fade")
  .global-loading(v-if="globalLoading")
    .global-loading_wrapper
      .loading-content
        .loading
          div
          div
</template>
<script lang="ts">
import { State, Mutation } from 'vuex-class'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { CONFIG } from '@/store/types'
@Component({
  components: {}
})
export default class GlobalLoading extends Vue {
  @State((state: CONFIG) => state.globalEvent.globalLoading) globalLoading!: boolean
  @Mutation('setGlobalLoading') setGlobalLoading!: Function
}
</script>
<style lang="scss" scoped>
.global-loading {
  position: fixed;
  z-index: 999;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.15);
  &_wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;
    text-align: center;
    margin: 0 auto;
    @keyframes loading {
      0% {
        transform: rotate(0deg);
      }
      50% {
        transform: rotate(180deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    .loading div {
      position: absolute;
      animation: loading 1s linear infinite;
      width: 160px;
      height: 160px;
      top: 20px;
      left: 20px;
      border-radius: 50%;
      box-shadow: 0 4px 0 0 #3677ff;
      transform-origin: 80px 82px;
    }
    .loading-content {
      width: 200px;
      height: 200px;
      display: inline-block;
      overflow: hidden;
      background: #ffffff;
    }
    .loading {
      width: 100%;
      height: 100%;
      position: relative;
      transform: translateZ(0) scale(1);
      backface-visibility: hidden;
      transform-origin: 0 0; /* see note above */
    }
    .loading div {
      box-sizing: content-box;
    }
  }
}
</style>
