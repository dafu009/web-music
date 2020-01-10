<template lang="pug">
transition(name="fade")
  section.songs(v-if="currentIndex === 2")
    template(v-for="(item, index) in playLists")
      .item(:key="item.id") {{ item.name }}
</template>
<script lang="ts">
import { State } from 'vuex-class'
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class playLists extends Vue {
  @Prop(Number) private currentIndex!:number

  @State(state => state.search.playLists.result) playLists: any
}
</script>
<style lang="scss" scoped></style>
