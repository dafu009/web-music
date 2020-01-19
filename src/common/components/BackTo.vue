<template lang="pug">
  .back-to
    .back(@click="back")
      span.iconfont &#xe611
      .txt 返回
    .title {{ title }}
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class BackTo extends Vue {
  @Prop() private title!: string

  @Emit('back')
  back () {}
}
</script>
<style lang="scss" scoped >
.back-to {
  display: flex;
  line-height: 24px;
  align-items: center;
  .back {
    display: flex;
    align-items: center;
    cursor: pointer;
    .iconfont {
      font-size: 18px;
      margin-right: 10px;
      font-weight: 600;
    }
    .txt {
      font-size: 14px;
      font-weight: 500;
      position: relative;
      margin-right: 40px;
    }
    .txt::after {
      content: '';
      position: absolute;
      width: 1px;
      height: 16px;
      right: -20px;
      top: 50%;
      transform: translateY(-50%);
      background-color: #DCDFE6;
    }
  }
  .title {
    font-size: 18px;
    color: #303313;
  }
}
</style>
