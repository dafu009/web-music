<template lang="pug">
transition(name="fade")
  section.songs(v-if="currentIndex === 0")
    template(v-for="(item, index) in songs")
      .item(:key="item.id") {{ item.name }}
</template>
<script lang="ts">
import { State } from 'vuex-class'
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class songs extends Vue {
  @Prop(Number) private currentIndex!:number

  @State(state => state.search.songs.result) songs: any
}
</script>
<style lang="scss" scoped></style>
