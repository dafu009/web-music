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
import { Mutation, Action, State } from 'vuex-class'
import VueCoreImageUpload from 'vue-core-image-upload'
import api from '@/api'
import { CONFIG } from '@/store/types'
@Component({
  components: {
    VueCoreImageUpload
  }
})
export default class user extends Vue {
  @Action('Logout') Logout!: Function
  @State((state: CONFIG) => state.globalEvent.isLogin) isLogin!: boolean
  beforeRouteEnter (to: any, from: any, next: Function) {
    next((vm: any) => {
      if (!vm.isLogin) {
        vm.$router.push('/user/login-register')
      }
    })
  }
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
