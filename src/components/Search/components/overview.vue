<template lang="pug">
  .overview
    //- search(@searchEvent="isSearch")
    transition(name="fade")
      search-result(v-if="status")
    recommend
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Search from './search.vue'
import SearchResult from './searchResult/index.vue'
import Recommend from './recommend.vue'
import { Mutation, State } from 'vuex-class'
@Component({
  components: {
    Search,
    Recommend,
    SearchResult
  }
})
export default class overview extends Vue {
  @State(state => state.search.status) status: any
  private resultShow:boolean = false 
  isSearch (key: boolean) {
    this.resultShow = key
  }
}
</script>
<style lang="scss" scoped></style>
