<template lang="pug">
  .user user
    button(@click="quit") quir
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Mutation, Action } from 'vuex-class';
@Component({
  components: {}
})
export default class user extends Vue {
  @Action('Logout') Logout!: Function
  
  quit() {
    this.Logout()
    this.$router.push('/recommend')
  }
}
</script>
<style lang="scss" scoped></style>
