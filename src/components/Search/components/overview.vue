<template lang="pug">
  .overview
    search(@searchEvent="isSearch")
    transition(name="fade")
      search-result(v-if="resultShow")
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Search from './search.vue'
import SearchResult from './searchResult/index.vue'
import { Mutation } from 'vuex-class'
@Component({
  components: {
    Search,
    SearchResult
  }
})
export default class overview extends Vue {
  private resultShow:boolean = false 
  isSearch (key: boolean) {
    this.resultShow = key
  }
}
</script>
<style lang="scss" scoped></style>
