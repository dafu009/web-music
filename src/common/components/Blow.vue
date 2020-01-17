<template lang="pug">
.blow
  img(src="http://image-source-lsy.oss-cn-shenzhen.aliyuncs.com/static/images/blow.gif")
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component({
  components: {}
})
export default class Blow extends Vue {}
</script>
<style lang='scss' scoped >
.blow {
  position: absolute;

  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  img {
    border-radius: 50%;
    width: 100%;
  }
}
</style>