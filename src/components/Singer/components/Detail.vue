<template lang="pug">
  .detail

</template>
<script lang='ts'>
import { Mutation, State, Action } from 'vuex-class'
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
    components: {
        
    }
})
export default class Overview extends Vue {
  @State(state => state.singer.detail) singerDetail: any
  created () {
    if (!this.singerDetail.id) {
      this.$router.push('/singer')
      return
    }
  }
}
</script>
<style lang='scss' scoped >

</style>