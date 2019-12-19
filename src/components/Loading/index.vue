<template lang="pug">
.loading
  transition(name="fade")
    .load-more(@click="loadMore" v-if="!loadingShow") 点击加载更多
  transition(name="fade")
    .wrapper(v-if="loadingShow")
      .loading-content
        div
        div
        div
        div
        div
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
@Component({
  components: {}
})
export default class index extends Vue {
  @State(state => state.globalEvent.loading) loadingShow: any
  @Mutation('setLoading') setLoading: any

  @Emit('loadMore')
  loadMore() {
    this.setLoading(true)
    return
  }
}
</script>
<style type="text/css" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@keyframes loading {
  0% {
    transform: translate(6px, 40px) scale(0);
  }
  25% {
    transform: translate(6px, 40px) scale(0);
  }
  50% {
    transform: translate(6px, 40px) scale(1);
  }
  75% {
    transform: translate(40px, 40px) scale(1);
  }
  100% {
    transform: translate(74px, 40px) scale(1);
  }
}
@keyframes loading-r {
  0% {
    transform: translate(74px, 40px) scale(1);
  }
  100% {
    transform: translate(74px, 40px) scale(0);
  }
}
@keyframes loading-c {
  0% {
    background: #e15b64;
  }
  25% {
    background: #abbd81;
  }
  50% {
    background: #f8b26a;
  }
  75% {
    background: #f47e60;
  }
  100% {
    background: #e15b64;
  }
}

.loading-content div {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  transform: translate(40px, 40px) scale(1);
  background: #e15b64;
  animation: loading 1s infinite cubic-bezier(0, 0.5, 0.5, 1);
}
.loading-content div:nth-child(1) {
  background: #f47e60;
  transform: translate(148px, 80px) scale(1);
  animation: loading-r 0.25s infinite cubic-bezier(0, 0.5, 0.5, 1),
    loading-c 1s infinite step-start;
}
.loading-content div:nth-child(2) {
  animation-delay: -0.25s;
  background: #e15b64;
}
.loading-content div:nth-child(3) {
  animation-delay: -0.5s;
  background: #f47e60;
}
.loading-content div:nth-child(4) {
  animation-delay: -0.75s;
  background: #f8b26a;
}
.loading-content div:nth-child(5) {
  animation-delay: -1s;
  background: #abbd81;
}
.loading {
  margin: 0 auto;
  text-align: center;
  position: relative;
}
.load-more {
  display: inline-block;
  height: 100px;
  line-height: 80px;
  padding: 0 200px;
  border-top: 1px solid #e3e3e3;
}
.wrapper {
  position: absolute;
  width: 100px;
  height: 100px;
  display: inline-block;
  overflow: hidden;
  background: #ffffff;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
}
.loading-content {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.loading-content div {
  box-sizing: content-box;
}
</style>
