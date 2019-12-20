<template lang="pug">
  .play-list
    el-page-header(@back="backToRecommend" content="推荐")
    .wrapper
      p 12312312123123
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class index extends Vue {

  backToRecommend () {
    this.$router.push('/recommend')
  }
}
</script>
<style lang="scss" scoped></style>
