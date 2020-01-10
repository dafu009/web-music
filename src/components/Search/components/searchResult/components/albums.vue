<template lang="pug">
transition(name="fade")
  section.albums(v-if="currentName === 'albums'")
    template(v-for="(item, index) in albums")
      .item(:key="item.id") {{ item.name }}
</template>
<script lang="ts">
import { State } from 'vuex-class'
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class artists extends Vue {
  @Prop(String) private currentName!:string

  @State(state => state.search.albums.result) albums: any
}
</script>
<style lang="scss" scoped></style>
