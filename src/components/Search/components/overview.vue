<template lang="pug">
  .overview
    //- search(@searchEvent="isSearch")
    transition(name="fade")
      search-result(v-if="status")
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Search from './search.vue'
import SearchResult from './searchResult/index.vue'
import { Mutation, State } from 'vuex-class'
import { CONFIG } from '@/store/types'
@Component({
  components: {
    Search,
    SearchResult
  }
})
export default class overview extends Vue {
  @State((state: CONFIG) => state.search.status) status!: boolean
  private resultShow: boolean = false 
  isSearch (key: boolean) {
    this.resultShow = key
  }
}
</script>
<style lang="scss" scoped></style>
