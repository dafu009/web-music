<template lang="pug">
  .overview
    search
    search-result
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Search from './search.vue'
import SearchResult from './search-result.vue'
import { Mutation } from 'vuex-class'
@Component({
  components: {
    Search,
    SearchResult
  }
})
export default class overview extends Vue {
}
</script>
<style lang="scss" scoped></style>
