<template lang="pug">
  .rank
    rank-nav
    rank-item
</template>
<script lang="ts">
import RankNav from './components/Nav.vue'
import RankItem from './components/Rank-item.vue'
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  components: {
    RankNav,
    RankItem
  }
})
export default class index extends Vue {
  
}
</script>
<style lang="scss" scoped>
.rank {
  display: flex;
}
</style>
