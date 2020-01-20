<template lang="pug">
  .recommend
    banner.banner
    .recommend-content
      play-list
</template>
<script lang="ts">
import { Mutation, State, Action } from 'vuex-class'
import { Component, Vue, Prop } from 'vue-property-decorator'
import Banner from './banner.vue'
import PlayList from './playList.vue'
@Component({
  components: {
    Banner,
    PlayList
  }
})
export default class overview extends Vue {}
</script>
<style lang="scss" scoped>
.recommend {
  position: absolute;
  width: 100%;
  .banner {
    margin-bottom: 30px;
  }
  .recommend-content::-webkit-scrollbar {
    width: 0 !important;
  }
  .recommend-content {
    width: 100%;
    background-color: #f3f3f3;
    padding: 30px 0;
    border-radius: 10px;
  }
}
</style>
