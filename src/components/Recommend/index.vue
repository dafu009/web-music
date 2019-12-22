<template lang="pug">
  .recommend
    banner.banner
    .recommend-content
      ul
        li
        li
        li
        li
        li
        li
        li
        li
        li
        li
        li
        li
        li
        li
        li
        li
        li
        li
        li
        li
        li
        li
        li
        li
        li
        
        
</template>
<script lang="ts">
import { Mutation, State, Action } from 'vuex-class'
import { Component, Vue, Prop } from 'vue-property-decorator'
import Banner from './components/banner.vue'
@Component({
  components: {
    Banner
  }
})
export default class index extends Vue {
  @Action('getBanner') getBanner: any
  async created() {
    await this.getBanner()
  }
}
</script>
<style lang="scss" scoped>
.recommend {
  .banner {
    margin-bottom: 30px;
  }
  .recommend-content::-webkit-scrollbar { width: 0 !important }
  .recommend-content {
    height: 500px;
    width: 100%;
    background-color: brown;
    overflow-y: scroll;
    li {
      width: 100px;
      height: 100px;
      background-color: #fff;
      margin: 10px;
    }
  }
}
</style>
