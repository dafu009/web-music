<template lang="pug">
.edit
  back-to(:title="backTo" @back="goBack")
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import BackTo from '@/common/components/BackTo.vue'
@Component({
  components: {
    BackTo
  }
})
export default class index extends Vue {

  private backTo: string = '个人中心'

  goBack() {
    this.$router.go(-1)
  }
}
</script>
<style lang="scss" scoped></style>
