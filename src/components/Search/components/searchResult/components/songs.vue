<template lang="pug">
transition(name="fade")
  section.songs(v-if="currentName === 'songs'")
    template(v-for="(item, index) in songs")
      .item(:key="index") {{ item.name }}
</template>
<script lang="ts">
import { State } from 'vuex-class'
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class songs extends Vue {
  @Prop(String) private currentName!:string

  @State(state => state.search.songs.result) songs: any
}
</script>
<style lang="scss" scoped></style>
