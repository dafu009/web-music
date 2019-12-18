<template lang="pug">
  .singer
    content-placeholders(:rounded="true")
      content-placeholders-heading(:img="true")
      content-placeholders-text(:lines="2")
      content-placeholders-heading(:img="true")
      content-placeholders-text(:lines="3")
      content-placeholders-heading(:img="true")
      content-placeholders-text(:lines="4")
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component({
    components: {
        
    }
})
export default class index extends Vue {

}
</script>
<style lang="scss" scoped >
.singer {
  width: 80%;
}
</style>