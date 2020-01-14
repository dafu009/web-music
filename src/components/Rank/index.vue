<template lang="pug">
  .rank
    rank-nav
    router-view
</template>
<script lang="ts">
import RankNav from './components/Nav.vue'
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  components: {
    RankNav
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
