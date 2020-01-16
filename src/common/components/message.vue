<template lang="pug">
transition(name="fade")
  .message(v-if="message.show" :class="message.type")
    .type
      span.iconfont(v-if="message.type === 'error'") &#xe8ac
      span.iconfont(v-if="message.type === 'success'") &#xe63e
      span.iconfont(v-if="message.type === 'warning'") &#xe620
    .text {{ message.message }}
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
import { CONFIG, Message } from '@/store/types'
@Component({
  components: {}
})
export default class message extends Vue {
  @State((state: CONFIG) => state.globalEvent.message) message!: Message
}
</script>
<style lang="scss" scoped>
.message {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  width: 160px;
  height: 160px;
  z-index: 999;
  border-radius: 10px;
  .type {
    text-align: center;
    height: 110px;
    line-height: 110px;
    span {
      font-size: 60px;
      color: #fff;
    }
  }
  .text {
    color: #fff;
    width: 100%;
    height: 50px;
    text-align: center;
    font-weight: 600;
    font-size: 18px;
  }
}
.success {
  background-color: rgba(66, 185, 131, 0.9);
}
.error {
  background-color: rgba(231, 98, 82, 0.9);
}
.warning {
  background-color: rgba(255, 142, 20, 0.8);
}
</style>
