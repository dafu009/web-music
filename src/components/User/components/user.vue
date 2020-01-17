<template lang="pug">
  .user
    button(@click="quit") quir
    vue-core-image-upload.btn.btn-primary(
      :crop="'local'"
      @imageuploaded="imageuploaded"
      :max-file-size="5242880")
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Mutation, Action } from 'vuex-class'
import VueCoreImageUpload from 'vue-core-image-upload'
import api from '@/api'
@Component({
  components: {
    VueCoreImageUpload
  }
})
export default class user extends Vue {
  @Action('Logout') Logout!: Function

  quit() {
    this.Logout()
    this.$router.push('/recommend')
  }
  imageuploaded (res: any) {
    console.log(res)
    // api.oss.getAliOssOptions()
  }
}
</script>
<style lang="scss" scoped></style>
