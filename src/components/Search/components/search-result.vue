<template lang="pug">
  .search-result
    .item(v-for="(item, index) in songs" :key="item.id") {{item.name}}
    .item(v-for="(item, index) in artists" :key="item.id") {{item.name}}
    .item(v-for="(item, index) in playLists" :key="item.id") {{item.name}}
    .item(v-for="(item, index) in mvs" :key="item.id") {{item.name}}

</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { State } from 'vuex-class'
@Component({
  components: {}
})
export default class searchResult extends Vue {
  @State(state => state.search.songs.result) songs: any
  @State(state => state.search.artists.result) artists: any
  @State(state => state.search.playLists.result) playLists: any
  @State(state => state.search.mvs.result) mvs: any

  mounted () {
  }
}
</script>
<style lang="scss" scoped></style>
