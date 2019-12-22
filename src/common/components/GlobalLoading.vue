<template lang="pug">
transition(name="fade")
  .global-loading(v-if="globalLoading")
    .global-loading_wrapper
      img(src="@/assets/image/GlobalLoading.gif")
</template>
<script lang="ts">
import { State, Mutation } from 'vuex-class'
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class GlobalLoading extends Vue {
  @State(state => state.globalEvent.globalLoading) globalLoading: any
  @Mutation('setGlobalLoading') setGlobalLoading: any
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
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
}
</style>
