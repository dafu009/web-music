<template lang="pug">
  .rank-item(:style="{ maxHeight: `${windowHeight}px` }")
    .item
      .name {{ CurrnetRank.name }}
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { CONFIG, Rank } from '../../../store/types'
@Component({
  components: {}
})
export default class RankItem extends Vue {
  @State((state: CONFIG) => state.rank) CurrnetRank!: Rank
  get route() {
    return this.$route.path
  }
  get windowHeight() {
    return window.innerHeight
  }
}
</script>
<style lang="scss" scoped>
.rank-item {
  margin-left: 20px;
  overflow: hidden;
  overflow-y: scroll;
  flex: 1;
  padding: 20px 50px;
  .name {
    font-size: 24px;
  }
}
.rank-item::-webkit-scrollbar {
  width: 8px;
  background-color: #fff;
}

.rank-item::-webkit-scrollbar-track {
  background-color: #fff;
}

.rank-item::-webkit-scrollbar-thumb {
  background: rgb(146, 181, 255);
  border-radius: 20px;
}
li {
  height: 100px;
  width: 100px;
  background-color: aqua;
}
</style>
