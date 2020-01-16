<template lang="pug">
  .card-form
    card
</template>
<script lang="ts">
import Card from './Card.vue'
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  components: {
    Card
  }
})
export default class loginRegister extends Vue {
  
}
</script>
<style lang="scss" scoped>
  .card-form {
    
  }
</style>
