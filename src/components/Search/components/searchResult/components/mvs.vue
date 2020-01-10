<template lang="pug">
transition(name="fade")
  section.songs(v-if="currentIndex === 3")
    template(v-for="(item, index) in mvs")
      .item(:key="item.id") {{ item.name }}
</template>
<script lang="ts">
import { State } from 'vuex-class'
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class mvs extends Vue {
  @Prop(Number) private currentIndex!:number

  @State(state => state.search.mvs.result) mvs: any
}
</script>
<style lang="scss" scoped></style>
